var AddFolderView = Backbone.View.extend({

	tagName: 'div',


	events: {
		"keydown #addFolderInput": "addFolderInputKeydown",
		"click #addProjectSubmitButton": "addProjectSubmitButton",
		"click #clearCompletedButton": "clearCompletedButton",
	},


	initialize: function() {
		app.addFolderView = this;
		$('#addFolderViewContainer').html(this.render().el);
	},


	render: function() {
		this.$el.html( $(ich.addFolderViewTemplate( )) );
		return this;
	},


	clearCompletedButton: function(e) {
		app.allTasks.clearCompleted();
	},


	addProjectSubmitButton: function(e) {
		if ($('#addFolderInput').val() == '') {
			$('#addFolderInput').val('Enter project name here');
			$('#addFolderInput').focus();
		} else {
			var folder = new FolderModel({
				name: $('#addFolderInput').val()
			});
			app.folders.add(folder, {at:0});
			folder.save();
			$('#foldersContainer').prepend(folder.containerView.el);
			
			$('#addFolderInput').val('');
			folder.addTask(0);
		}
	},


	addFolderInputKeydown: function(e) {
		// enter
		if(e.keyCode == 13) { 
			if ($('#addFolderInput').val() != '') {
				var folder = new FolderModel({
					name: $('#addFolderInput').val()
				});
				app.folders.add(folder, {at:0});
				folder.save();
				$('#foldersContainer').prepend(folder.containerView.el);
				
				$('#addFolderInput').val('');
				folder.addTask(0);
			}
			e.stopPropagation();
			e.preventDefault();
		}

		if (e.keyCode === 40) {
			app.folders.at(0).selectModel();
		}
	}

});