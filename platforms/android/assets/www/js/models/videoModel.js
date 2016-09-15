//window.Video = Backbone.Model.extend({
//});
//
//window.Videos = Backbone.Collection.extend({
//  model: Video,
window.Videos ={
  collection: [
        {id: '0', name: 'Acoustic Neuroma', youTubeId:'P5XmWOycxIE'},
        {id: '1', name: 'Arteriovenous Malformation (AVM)', youTubeId:'CpsR5tyo2iY'},
        {id: '2', name: 'Brain Aneurysm', youTubeId:'3Xu28oe7WSc'},
        {id: '3', name: 'Cavernous Meningioma', youTubeId:'-sGaoQvp-tM'},
        {id: '4', name: 'Falciform Meningioma', youTubeId:'WO2BJgRWswU'},
        {id: '5', name: 'Pituitary Tumor', youTubeId:'2SGRg4ZfH5c'},
        {id: '6', name: 'Spine Fracture', youTubeId:'YIaXrYMr_Xg'},
      ],
  getVideos: function () {
    return this.collection;
  },
  getVideo: function(id){
    return this.collection[id];
  }
};