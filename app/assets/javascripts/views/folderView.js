var FolderView = Backbone.View.extend({

	className: "folder",

// 	events: {
// 		"click .deleteButton": "deleteFolder",
// 		"click .addButton": "addTask",
// 		"click .openFolderButton" : "openFolder",
// 		"keyup textarea.folderInput" : "onKeyUp"
// 	},

	initialize: function() {console.log('new folder nvew')
		//_.bindAll(this, 'onKeyUp');
		this.model.folderView = this;
		this.$el.html( $(ich.folderViewTemplate( this.model.toJSON() )) );
		//_.delay(this.onKeyUp, 0);		// expand textareas
	},

	render: function() {
		return this;
	},

// 	onKeyUp: function() {
// 		// auto expand textarea
// 		var input = this.$('textarea');
// 		input.attr('rows', '1');
// 		while (input.height() < input[0].scrollHeight) {
// 			input.css('overflow-y', 'scroll');
// 			input.attr('rows', input[0].rows + 1);
// 			input.css('overflow-y', 'hidden');
// 		}

// 		if (input.val() != this.model.get('name')) {
// 			this.model.set({name: input.val()});
// 		}
// 	},

// 	deleteFolder: function(e){
// 		var answer = confirm('Delete project?');
// 		if (answer) {
// 			v = this;
// 			$(this.model.folderContainerView.el).slideUp(200, function() {
// 				v.model.destroy();
// 				trackEvent('folder', 'deleteFolder');
// 			});
// 		}
// 		e.stopPropagation();
// 		//e.preventDefault();
// 	},

// 	addTask: function(e) {
// 		this.model.addTask(0);
// 		e.stopPropagation();
// 		e.preventDefault();
// 		trackEvent('folder', 'addTask');
// 	},

// 	openFolder: function(e) {
// 		if (this.model.get('openFolder')) {
// 			this.model.set({openFolder:false});
// 		} else {
// 			this.model.set({openFolder:true});
// 		}
// 		trackEvent('folder', 'openFolder');
// 		e.stopPropagation();
// 	}
	
});