var AllTasksCollection = Backbone.Collection.extend({

	model: TaskModel,

	clearCompleted: function() {
		_.each(this.models, function(m) {
			if (m.get('checked')) {
				m.set({hideTask:true});
			}
		})
	}

});