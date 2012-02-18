var FoldersCollection = BaseCollection.extend({

  model: FolderModel,

  initialize: function() {
    this.bind('reset', this.addViewsToDom);
    //this.bind('add', this.setOrderFromIndex);
  },

  addViewsToDom: function() {
    var els = [];
    _.each(this.models, function(m) {
      els.push(m.folderContainerView.render().el);
    });
    $('#foldersContainer').append(els);
  }
  
});