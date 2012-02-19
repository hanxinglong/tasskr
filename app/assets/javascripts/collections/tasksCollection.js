var TasksCollection = BaseCollection.extend({

	model: TaskModel,

	initialize: function() {
		this.bind('add', this.setOrderFromIndex);
		//this.bind('add', this.addViewToDom);
	},

	// addViewToDom: function(model, collection) {
	// 	var index = _.indexOf(this.models, model);
	// 	if (index == 0) {
	// 		if (!_.isUndefined(this.parentTask)) {
	// 			$(this.parentTask.view.el).children('ul.tasks').prepend(model.containerView.render().el);
	// 		} else {
	// 			$(this.parentFolder.containerView.el).children('ul.tasks').prepend(model.containerView.render().el);
	// 		}
	// 	} else {
	// 		$(this.at(index-1).view.el).after(model.containerView.render().el);
	// 		}
	// 	}
	
});