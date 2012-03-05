var FolderView = BaseView.extend({

	className: "folder",

	events: {
		"click": "clickedOn",
		"blur .nameFieldEdit": "blurTextArea",
		"click .trashIcon": "deleteModel",
		"click .plusIcon": "addTask",
		"click .openFolderIcon" : "toggleOpenFolder",
		"click .closedFolderIcon" : "toggleOpenFolder",
		"keydown .nameFieldEdit": "onKeyDown",
		"keyup .nameFieldEdit" : "onKeyUp",
	},

	initialize: function() {
		_.bindAll(this, 'onKeyUp');
		this.model.view = this;
	},

	render: function() {
		this.$el.html( $(ich.folderViewTemplate( this.model.toJSON() )) );
		return this;
	},
	
});