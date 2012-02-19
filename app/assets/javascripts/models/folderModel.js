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
		new FolderContainerView({ model:this });
		this.bind("change:name",this.onChangeName);
		this.bind("change:openFolder",this.onChangeOpenFolder);
		this.lazySave = _.debounce(this.save, 400);
	},

	addFolder: function() {},

	makeEditable: function() {
		if (this.folderView.$('.folderName').is(':visible')) {
			this.folderView.$('.folderName').hide();
			this.folderView.$('.folderNameEdit').show();
			this.folderView.onKeyUp();		// resize textarea
			this.folderView.$('.folderNameEdit').find('textarea').caretToEnd();
		}
	},

	makeNonEditable: function() {
		if (this.folderView.$('.folderNameEdit').is(':visible')) {
			this.folderView.$('.folderNameEdit').hide();
			this.folderView.$('.folderName').show();
		}
	},

	onChangeName: function() {
		this.lazySave();
		this.folderView.$('.folderName').html(this.get('name'));
	},

	onChangeOpenFolder: function() {
		this.lazySave();
		if (this.get('openFolder')) {
			this.folderContainerView.$('.tasks').slideDown(200);
		} else {
			this.folderContainerView.$('.tasks').slideUp(200);
		}
		this.folderView.render();
	}


});