var TaskModel = BaseModel.extend({

	defaults: {
		name: 'undefined',
		order: 0,
		checked: false,
		createdInDb: false,
		selected: false,
		hideTask: false,
		parentTaskId: null,
		openFolder: true,
		modelType: 'task',
	},

	url: function() {
		var base = 'tasks';
		if (this.isNew()) return base;
		return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
	},
	
	initialize: function() {
		this.lazySave = _.debounce(this.save, 400);
		this.bind("change:name", this.onChangeName);
		this.bind("change:openFolder",this.onChangeOpenFolder);
		this.bind("change:notes", this.onChangeNotes);
		this.bind("change:parentTaskId", this.lazySave);
		this.bind("change:folder_id", this.lazySave);
		this.bind("change:checked", this.onChangeChecked);
		this.bind("change:createdInDb", this.onCreatedInDb);
		this.bind("change:displayStartDateFromNow", this.onDisplayStartDateFromNow);
		this.bind("change:hideTask", this.onHideTask);
		this.bind("destroy", this.onDestroy);
		this.bind("error", this.saveError);
		this.bind("success", this.saveSuccess);
		this.bind("change:startDate", this.onChangeStartDate);
		new TaskView({ model:this});
		new ContainerView({ model:this });

		// collection for child tasks
		this.tasks = new TasksCollection;		
		this.tasks.parentTask = this;
		this.tasks.parentModel = this;
		_.each(this.get('childtasks'), function(t) {
				var task = new TaskModel(t);
				this.tasks.add(task, {silent:true});
				app.allTasks.add(task);
		}, this);
		this.unset('childtasks', {silent:true});
	},

	addTask: function(at) {
		// if this model doesn't have an id yet then wait until it does
		if (this.isNew()) {
			var tempAddFunction = _.bind(this.addTask, this);
			_.delay(tempAddFunction, 100, at);
			return false;
		}

		// make sure model is not minimized
		if (this.get('openFolder') == false) {
			this.set({openFolder:true});
		}
		
		var task = new TaskModel({
			name: '',
			parentTaskId: this.id,
			folder_id: this.get('folder_id')
		});
		this.tasks.add(task, {at:at});
		task.save();
		task.selectModel();
		_.delay(doCharts, 100);	// this should maybe be 1000? it was in tasskr4
	},

	selectModel: function() {
		if (!_.isUndefined(app.selectedModel)) { app.selectedModel.deselectModel(); }
		app.selectedModel = this;
		this.makeEditable();
		new TaskEditView({ model:this});
		app.tabMenuView.selectTaskTab();
		this.view.$el.addClass('selected');
	},

	deselectModel: function() {
		if (this.taskEditView) {
			this.taskEditView.remove();
		}
		app.tabMenuView.$('#taskTab').hide();
		app.tabMenuView.selectScheduleTab();
		this.makeNonEditable();
		delete app.selectedModel;
		this.view.$el.removeClass('selected');
	},


	onCreatedInDb: function() {
		if (!_.isUndefined(this.taskEditView)) {
			this.taskEditView.render();
		}
	},


	onChangeNotes: function() {
		this.lazySave();
	},


	onHideTask: function() {
		this.lazySave();
		this.deselectModel();
		var t = this;
		this.containerView.$el.slideUp(200, function() {
			t.view.remove();
			t.containerView.remove();
			_.delay(doCharts, 1000);	// this should maybe be 1000? it was in tasskr4
		});
	},


	onChangeChecked: function() {
		if (this.get('checked')) {
			this.view.$el.addClass('checked');
			this.set({ completedDate: new Date() });
			this.view.$('input[type=checkbox]').attr("checked", true);
		} else {
			this.view.$el.removeClass('checked');
			this.view.$('input[type=checkbox]').attr("checked", false);
		}
		this.lazySave();
		_.delay(doCharts, 1000);	// this should maybe be 1000? it was in tasskr4
	},
	
});