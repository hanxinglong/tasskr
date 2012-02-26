var AddFolderView = Backbone.View.extend({

	tagName: 'div',

	events: {
		"keydown #addFolderInput": "addFolderInputKeydown",
	},

	initialize: function() {
		app.addFolderView = this;
		$('#addFolderViewContainer').html(this.render().el);
	},

	render: function() {
		this.$el.html( $(ich.addFolderViewTemplate( )) );
		return this;
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
			//trackEvent('app', 'addFolder');
		}
	}

});