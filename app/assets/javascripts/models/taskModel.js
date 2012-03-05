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
		this.bind("destroy", this.onDestroy);
		//this.bind("change:checked", this.onChangeChecked);
		//this.bind("change:startDate", this.onChangeStartDate);
		new TaskView({ model:this});
		new ContainerView({ model:this });
		//new ScheduleRowView({ model:this });
		//this.trigger("change:startDate");   // fill in schedule

		// collection for child tasks
		this.tasks = new TasksCollection;		
		this.tasks.parentTask = this;
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
		this.taskEditView.remove();
		app.tabMenuView.$('#taskTab').hide();
		app.tabMenuView.selectScheduleTab();
		this.makeNonEditable();
		delete app.selectedModel;
		this.view.$el.removeClass('selected');
	},


	onChangeNotes: function() {
		this.lazySave();
	},


	onChangeChecked: function() {
		if (this.get('checked')) {
			this.view.$el.addClass('checked');
			//this.set({ completedDate: new Date() });
		} else {
			this.view.$el.removeClass('checked');
		}
		this.lazySave();
	},

	// onChangeChecked: function() {
	//   if (this.get('checked')) {
	//     $(this.view.el).addClass('checked');
	//     this.set({ completedDate: new Date() });
	//   } else {
	//     $(this.view.el).removeClass('checked');
	//   }
	//   this.lazySave();
	// },

	// parseName: function(name) {
	//   var dateString = '';
	//   var onDatePart = false;
	//   var words = name.split(' ');
	//   var skipTheseWords = ['from', 'todd', 'the', 'say', 'mom', 'day', 'tod'];
	//   for (var i = words.length - 1; i >= 0; i--) {
	//     if (Date.parse(words[i] + dateString) &&  _.indexOf(skipTheseWords, words[i]) == -1) {
	//       dateString = words[i] + ' ' + dateString;
	//       onDatePart = true;
	//     } else {
	//       if (dateString != '') { i = 0; }
	//       onDatePart = false;
	//     }
	//   }
	//   this.set({startDate: ''});
	//   if (dateString != '') {
	//     if (dateString.length > 3) {    // why is this 3 and not for?? 'sat' = 4 characters
	//       if (date = Date.parse(dateString)) {
	//         if ( moment(date).format('YYYY') > 1980 ) {   // things break if time is before 1969
	//           this.set({startDateString: dateString.trim(), startDate: moment(date).format('MMMM Do YYYY, h:mm:ss a')});
	//         }
	//       }
	//     }
	//   }
	// },

	// onChangeStartDate: function() {
	//   //$(this.view.el).find('.startDateFromNow').html('');   // clear right side of task
	//   if (date = Date.parse(this.get('startDate'))) {
	//     //$(this.view.el).find('.startDateFromNow').html(moment(date).fromNow());     // right side of task
	//     $('#schedule_' + moment(date).format("YYYY-MM-DD")).append( this.scheduleRowView.render().el );   // schedule
	//     this.scheduleRowView.delegateEvents();
	//   } else {
	//     this.scheduleRowView.remove();
	//   }
	//   this.lazySave();
	// },
	
});