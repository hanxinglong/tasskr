var TasksCollection = BaseCollection.extend({


	model: TaskModel,


	initialize: function() {
		this.bind('add', this.setOrderFromIndex);
		this.bind('add', this.setParentId);
		this.bind('add', this.addViewToDom);
		this.bind('add', this.addToAllTasksCollection);
		this.bind('remove', this.removeFromAllTasksCollection);
		this.bind('remove', this.removeModel);
		//this.bind('add', this.addModel);
	},


	addModel: function(model, collection) {
		if (_.isUndefined(this.parentFolder)) {
			// parent is not a folder
			collection.parentTask.containerView.render();
		} else {
			// parent is a folder
			app.folders.get(model.get('folder_id')).containerView.render();
		}
	},


	setParentId: function(model,collection) {
		if (_.isUndefined(this.parentFolder)) {
			// parent is not a folder
			model.set({parentTaskId: collection.parentTask.id});
		} else {
			// parent is a folder
			model.set({parentTaskId:null});
		}
	},


	addViewToDom: function(model, collection) {
		var index = _.indexOf(this.models, model);
		if (index == 0) {
			if (!_.isUndefined(this.parentTask)) {
				$(this.parentTask.containerView.el).children('ul.tasks').prepend(model.containerView.render().el);
			} else {
				$(this.parentFolder.containerView.el).children('ul.tasks').prepend(model.containerView.render().el);
			}
		} else {
			$(this.at(index-1).view.el).after(model.containerView.render().el);
		}
		model.view.delegateEvents();
	},


	addToAllTasksCollection: function(model, collection) {
		app.allTasks.add(model);
	},


	removeFromAllTasksCollection: function(model, collection) {
		app.allTasks.remove(model);
	},
	
});