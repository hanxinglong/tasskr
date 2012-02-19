var FolderView = Backbone.View.extend({

	className: "folder",

	events: {
		"click": "clickOn",
		"blur .folderNameEdit": "blurTextArea",
		"click .trashIcon": "deleteFolder",
		// "click .addButton": "addTask",
		"click .openFolderIcon" : "toggleOpenFolder",
		"click .closedFolderIcon" : "toggleOpenFolder",
		"keyup .folderNameEdit" : "onKeyUp"
	},

	initialize: function() {
		//_.bindAll(this, 'onKeyUp');
		this.model.folderView = this;
		//_.delay(this.onKeyUp, 0);		// expand textareas
	},

	render: function() {
		this.$el.html( $(ich.folderViewTemplate( this.model.toJSON() )) );
		return this;
	},

	clickOn: function(e) {
		if (this.$('.folderName').is(':visible')) {
			this.model.makeEditable();
		}
		e.stopPropagation();
	},

	blurTextArea: function() {
		this.model.makeNonEditable();
	},

	onKeyUp: function() {
		// auto expand textarea
		var input = this.$('textarea');
		input.attr('rows', '1');
		while (input.height() < input[0].scrollHeight) {
			input.css('overflow-y', 'scroll');
			input.attr('rows', input[0].rows + 1);
			input.css('overflow-y', 'hidden');
		}

		if (input.val() != this.model.get('name')) {
			this.model.set({name: input.val()});
		}
	},

	deleteFolder: function(e){
		var answer = confirm('Delete project?');
		if (answer) {
			v = this;
			$(this.model.folderContainerView.el).slideUp(200, function() {
				v.model.destroy();
			});
		}
		e.stopPropagation();
	},

// 	addTask: function(e) {
// 		this.model.addTask(0);
// 		e.stopPropagation();
// 		e.preventDefault();
// 		trackEvent('folder', 'addTask');
// 	},

	toggleOpenFolder: function(e) {
		if (this.model.get('openFolder')) {
			this.model.set({openFolder:false});
		} else {
			this.model.set({openFolder:true});
		}
		e.stopPropagation();
	}
	
});