var FolderModel = BaseModel.extend({

	defaults: {
		name: 'undefined',
		order: 0,
		openFolder: false,
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
		new FolderContainerView({ model:this });
	},

	addFolder: function() {}


});