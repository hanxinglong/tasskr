var FoldersCollection = BaseCollection.extend({

  model: FolderModel,

  initialize: function() {
    this.bind('reset', this.addViewsToDom);
    this.bind('add', this.setOrderFromIndex);
    this.bind('add', this.addViewToDom);
    this.bind('remove', this.removeModel);

    this.bind('add', this.renderOutline);
    this.bind('remove', this.renderOutline);
    this.bind('reset', this.renderOutline);

    this.bind('add', this.addToAllFoldersCollection);
    this.bind('remove', this.removeFromAllFoldersCollection);
  },


  addViewsToDom: function() {
    _.each(this.models, function(m) {
      $('#foldersContainer').append(m.containerView.render().el);
    });
  },


  addViewToDom: function(model, collection) {
    var index = _.indexOf(this.models, model);
    if (index == 0) {
      $('#foldersContainer').prepend(model.containerView.render().el);
    } else {
      $(this.at(index-1).containerView.el).after(model.containerView.render().el);
    }
  },


  renderOutline: function() {
    _.each(this.models, function(model) {
      model.outlineRowView.render();
    })
  },


  // addModel: function(model, collection) {
  //  model.containerView.render();
  // },


  addToAllFoldersCollection: function(model, collection) {
    app.allFolders.add(model);
  },


  removeFromAllFoldersCollection: function(model, collection) {
    app.allFolders.remove(model);
  },
  
});