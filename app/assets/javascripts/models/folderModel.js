var FolderModel = BaseModel.extend({

	defaults: {
		name: 'undefined',
		order: 0,
		openFolder: true,
		createdInDb: false,
		selected: false,
	},

	url: function() {
		var base = 'folders';
		if (this.isNew()) return base;
		return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
	},

	initialize: function() {
		new FolderView({ model:this });
		new ContainerView({ model:this });
		this.bind("change:name",this.onChangeName);
		this.bind("change:openFolder",this.onChangeOpenFolder);
		this.lazySave = _.debounce(this.save, 400);

		// collection for child tasks
		this.tasks = new TasksCollection;		
		this.tasks.parentFolder = this;
		_.each(this.get('childtasks'), function(t) {
				var task = new TaskModel(t);
				this.tasks.add(task, {silent:true});
		}, this);
		this.unset('childtasks', {silent:true});
	},


	addTask: function(at) {
		if (this.get('openFolder') == false) {
			this.set({openFolder:true});
		}
		var task = new TaskModel({
			name: '',
			folder_id: this.id
		});
		this.tasks.add(task, {at:at});
		task.save();
		task.makeEditable();
	},


	selectModel: function() {
		if (!_.isUndefined(app.selectedModel)) { app.selectedModel.deselectModel(); }
		app.selectedModel = this;
		this.makeEditable();
		this.view.$el.addClass('selected');
	},


	deselectModel: function() {
		this.makeNonEditable();
		delete app.selectedModel;
		this.view.$el.removeClass('selected');
	},


});