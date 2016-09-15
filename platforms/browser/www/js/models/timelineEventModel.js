window.TimelineEvent = Backbone.Model.extend({
  urlRoot: 'https://localhost:8443/api/timelines/1/events.json',
  defaults: {
    'id': 0,
    'timeline_id': 0,
    'time': 0,
    'title': '',
    'content_html': '',
    'updated_at': null
  }

});

window.TimelineEvents = Backbone.Collection.extend({
  model: TimelineEvent,
  localStorage: new Backbone.LocalStorage('timeline-events-collection'),
  getCollection: function (timeline_id) {
    var collection;

    collection = LocalStorageAdapter.getCollection('timeline-' + timeline_id + '-events-collection');
    return new TimelineEvents(collection);
  },
  getTimelineEvent: function (timeline_id, id) {
    var timelineEvent;

    timelineEvent = LocalStorageAdapter.getJSON('timeline-' + timeline_id + '-events-collection-' + id);
    return new TimelineEvent(timelineEvent);
  }

});