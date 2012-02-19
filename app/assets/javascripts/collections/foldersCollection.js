var FoldersCollection = BaseCollection.extend({

  model: FolderModel,

  initialize: function() {
    this.bind('reset', this.addViewsToDom);
    this.bind('add', this.setOrderFromIndex);
  },

  addViewsToDom: function() {
    _.each(this.models, function(m) {
      $('#foldersContainer').append(m.folderContainerView.render().el);
      m.folderView.delegateEvents();
    });
    
  }
  
});