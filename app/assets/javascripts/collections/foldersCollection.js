var FoldersCollection = BaseCollection.extend({

  model: FolderModel,

  initialize: function() {
    this.bind('reset', this.addViewsToDom);
    this.bind('add', this.setOrderFromIndex);
    this.bind('add', this.addViewToDom);
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
      $(this.at(index-1).view.el).after(model.containerView.render().el);
    }
  }
  
});