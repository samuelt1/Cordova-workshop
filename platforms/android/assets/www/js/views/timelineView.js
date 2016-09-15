window.TimelineView = Backbone.View.extend({
  initialize: function (attrs) {
    this.model = attrs.model || {};
    this.collection = attrs.collection || [];
    this.results = new TimelineEvents();
    this.listenTo(this.collection, 'reset', this.render);
    if (NetworkAdapter.isConnected() === true) {
      this.checkServer();
    } else {
      if (this.collection.toJSON().length === 0) {
        DialogAdapter.showMessage('No network connection detected. Contents cannot be downloaded.');
      }
    }
  },
  serializeData: function () {
    var data = {},
            surgeryDate,
            sortedList,
            rangePreOp,
            rangeSurgery,
            rangePostOp,
            currentIndex,
            surgeryIndex,
            i;

    data.title = 'Surgery Timeline';

    data.current = new Date();
    data.current.setHours(0, 0, 0);


    sortedList = _.sortBy(this.collection.toJSON(), 'day');
    pluckedList = _.pluck(sortedList, 'id');

    surgeryDate = _.find(sortedList, {'day': 0});
    surgeryId = typeof (surgeryDate) !== 'undefined' ? surgeryDate.id : sortedList.length - 1;
    surgeryIndex = _.indexOf(pluckedList, surgeryId);

    data.surgeryIndex = surgeryIndex;
    data.timelineEvents = sortedList;
    data.emptyText = 'Please personalize surgery to see timeline.';

    if (typeof (this.model) !== 'undefined' && $.isEmptyObject(this.model) === false) {
      currentIndex = this.getCurrentIndex(_.pluck(sortedList, 'day'), this.model.date);

      data.info = this.model;
      data.currentIndex = currentIndex;
      data.isPersonalized = true;
      data.personalizeText = "EDIT";
    } else {
      data.currentIndex = surgeryIndex;
      data.isPersonalized = false;
      data.personalizeText = "PERSONALIZE";
    }

    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  events: {
    'click .timeline-header': 'select',
    'click .personalize-button': 'personalize'
  },
  checkServer: function () {
    var current,
            collection,
            messageShown;


    current = LocalStorageAdapter.getCollectionEtagInfo('timelines-collection');
    collection = this.collection;
    updated = typeof (current) !== 'undefined' ? new Date(current.updated_at) : new Date();
    elapsed = new Date(updated.getTime() + Config.UPDATE_CHECK.HOURS * 60 * 60 * 1000);
    now = new Date();

    if (typeof (current) === 'undefined') {
      console.log('initializing timeline events.');
      SpinAdapter.show();

      ServiceAdapter.getTimelines(function (data, etag) {
        LocalStorageAdapter.clearCollection('timelines-collection');
        LocalStorageAdapter.setCollection('timelines-collection', data, etag);
        for (i = 0; i < data.length; i++) {
          timeline_info = data[i];
          ServiceAdapter.getTimelineEvents(timeline_info, function (t_id, te_data, te_tag) {
            LocalStorageAdapter.clearCollection('timeline-' + t_id + '-events-collection');
            LocalStorageAdapter.setCollection('timeline-' + t_id + '-events-collection', te_data, te_tag);
            if (t_id === 1) {
              collection.reset(te_data);
            }
          });
        }
        SpinAdapter.hide();
      });

    } else if (elapsed.getTime() < now.getTime()) {
      console.log('checking for timeline events updates.');
      SpinAdapter.show();
      messageShown = false;

      ServiceAdapter.getTimelines(function (data, etag) {
        LocalStorageAdapter.clearCollection('timelines-collection');
        LocalStorageAdapter.setCollection('timelines-collection', data, etag);
        for (i = 0; i < data.length; i++) {
          timeline_info = data[i];
          ServiceAdapter.getTimelineEvents(timeline_info, function (t_id, te_data, te_tag) {
            current_events = LocalStorageAdapter.getCollectionEtagInfo('timeline-' + t_id + '-events-collection');
            if (current_events.etag !== te_tag) {
              if (!messageShown) {
                DialogAdapter.showMessage('Timeline Events list has been updated.');
                messageShown = true;
              }
              LocalStorageAdapter.clearCollection('timeline-' + t_id + '-events-collection-');
              LocalStorageAdapter.setCollection('timeline-' + t_id + '-events-collection', te_data, te_tag);
              Backbone.history.loadUrl(Backbone.history.fragment);
            } else {
              console.log('timeline Events already updated.');
            }
            SpinAdapter.hide();
          });
        }
        if (data.length === 0) {
          SpinAdapter.hide();
        }
      });

    } else {
      console.log('timeline Events recently updated.');
    }
  },
  select: function (e) {
    e.preventDefault();
    id = $(e.currentTarget).data('id');
    this.clear();
    $('#selected-event-' + id).addClass('active');
    $('#selected-title-' + id).removeClass('hide');
    $('#selected-content-' + id).removeClass('hide');
  },
  getCurrentIndex: function (timelineEventsList, surgeryDate) {
    var currentIndex,
            dateToday,
            dateSurgery,
            timeDiff,
            timeDay,
            dayDiff,
            i;

    dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);

    dateSurgery = new Date(surgeryDate);
    dateSurgery.setHours(0, 0, 0, 0);

    timeDay = 24 * 60 * 60 * 1000;
    timeDiff = Math.round((dateToday.getTime() - dateSurgery.getTime()) / timeDay);

    currentIndex = 0;

    for (i = 0; i < timelineEventsList.length; i++) {
      if (timeDiff >= timelineEventsList[i]) {
        currentIndex = i;
      }
    }

    return currentIndex;
  },
  clear: function () {
    $('.timeline-header').removeClass('active');
    $('.timeline-event').addClass('hide');
  },
  personalize: function () {
    var goToPersonalize,
            surgeryInfo,
            settings,
            termsAgreementInfo,
            isAgreed,
            agreementView;

    goToPersonalize = this.goToPersonalize;
    termsAgreementInfo = new TermsAgreementInfo();
    isAgreed = termsAgreementInfo.getTermsAgreementInfo().is_agree;
    if (isAgreed === false) {
      agreementView = new AgreementView();
      agreementView.show();
    } else {
      goToPersonalize();
    }
  },
  goToPersonalize: function () {



    router.navigate('personalize', {trigger: true});
  }

});