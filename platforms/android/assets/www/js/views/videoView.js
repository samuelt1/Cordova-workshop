window.VideoView = Backbone.View.extend({
  initialize: function (attrs) {
    this.video = attrs.video;
  },
  serializeData: function () {
    var data = {};
    data.isConnected = window.NetworkAdapter.isConnected();
    data.title = this.video.name;
    data.youTubeId = this.video.youTubeId;
    data.emptyText = 'No Video found.';
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    this.fullScreenHandler();
    this.refreshOnline();
    return this;
  },
  refreshOnline: function () {
    if (!window.NetworkAdapter.isConnected()) {
      document.addEventListener("online", function () {
        if (Backbone.history.getFragment().indexOf("virtual-reality/") >= 0) {
          window.router.videoView.render()
        }
      }, false);
    }
  },
  fullScreenHandler: function () {
    var FShandler = function () {
      if (document.fullscreenElement ||
              document.fullscreenElement ||
              document.webkitFullscreenElement ||
              document.MSFullscreenElement) {
        screen.unlockOrientation();
        console.log("unlocked Orientation");
      } else {
        screen.lockOrientation("portrait");
        console.log("Locked Orientation");
      }
    }

    document.addEventListener("fullscreenchange", FShandler);
    document.addEventListener("webkitfullscreenchange", FShandler);
    document.addEventListener("mozfullscreenchange", FShandler);
    document.addEventListener("MSFullscreenChange", FShandler);
  },
  getVideoHeight: function () {
    var contentHeight = $("#content").height();
    var subHeadderHeight = 56;
    var navBorderWidth = 2.8;

    return contentHeight - navBorderWidth - subHeadderHeight;
  },
  loadVideo: function () {


    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        height: this.getVideoHeight(),
        width: '100%',
        videoId: this.video.videoId
      });
    }
  }
});