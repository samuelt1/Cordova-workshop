window.SocialMediaView = Backbone.View.extend({
  initialize: function () {},
  events: {
    'click .social-media': 'openSocialMedia'
  },
  serializeData: function () {
    var data = {},
            socialMedia;

    socialMedia = [
      {id: 'neuro-web', label: 'Neurosurgery', src: 'img/icons/internet.png'},
      {id: 'health-web', label: 'UCLA Health', src: 'img/icons/internet.png'},
      {id: 'neuro-facebook', label: 'Neurosurgery', src: 'img/icons/facebook.png'},
      {id: 'health-facebook', label: 'UCLA Health', src: 'img/icons/facebook.png'},
      {id: 'health-twitter', label: 'UCLA Health', src: 'img/icons/twitter.png'},
      {id: 'neuro-brochure', label: 'Into the Brain and Beyond', src: 'img/icons/internet.png'}
    ];

    data.title = 'Social Media';
    data.emptyText = 'No social media found.';
    data.socialMedia = socialMedia;

    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  openSocialMedia: function (e) {
    var id,
            neuro,
            health;

    neuro = Config.SOCIAL_MEDIA.NEUROSURGERY;
    health = Config.SOCIAL_MEDIA.HEALTH;

    e.preventDefault();
    id = $(e.currentTarget).data('id');

    switch (id) {
      case 'neuro-facebook':
        AppLaunchAdapter.launchSocialMedia(neuro.FACEBOOK, Config.FACEBOOK);
        break;
      case 'neuro-web':
        AppLaunchAdapter.launchExternalApp(neuro.WEB);
        break;
      case 'neuro-brochure':
        AppLaunchAdapter.launchExternalApp(neuro.BROCHURE);
        break;
      case 'health-facebook':
        AppLaunchAdapter.launchSocialMedia(health.FACEBOOK, Config.FACEBOOK);
        break;
      case 'health-twitter':
        AppLaunchAdapter.launchSocialMedia(health.TWITTER, Config.TWITTER);
        break;
      case 'health-web':
        AppLaunchAdapter.launchExternalApp(health.WEB);
        break;
    }
  }

});