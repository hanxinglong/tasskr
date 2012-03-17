var BaseModel = Backbone.Model.extend({

	save: function(attributes) {

		var m = this;
		if (this.isNew()) {
			if (this.get('createdInDb')) {
				// clearTimeout(this.get('saveTimerId'));
				// var t = setTimeout(m.save(), 100);
				var saveFunction = _.bind(m.save, m);
				_.delay(saveFunction, 100);
				//this.set({saveTimerId: t}, {silent: true});
			} else {
				Backbone.Model.prototype.save.call(this, attributes, {
					silent:true,
					error: function(){m.trigger("error")},
					success: function(){m.trigger("success")},
				});
				this.set({createdInDb:true}, {silent:true});
			}
		} else {
			Backbone.Model.prototype.save.call(this, attributes, {
				error: function(){m.trigger("error")},
				success: function(){m.trigger("success")},
			});
		}
	},


	saveError: function() {
		$('#errorMsg').show();
	},


	saveSuccess: function() {
		$('#errorMsg').hide();
	},


	makeEditable: function() {
		if (this.view.$('.nameField').is(':visible')) {
			this.view.$('.nameField').hide();
			this.view.$('.nameFieldEdit').show();
			this.view.onKeyUp();		// resize textarea
			this.view.$('.nameFieldEdit').find('textarea').caretToEnd();
		}
	},


	makeNonEditable: function() {
		if (this.view.$('.nameFieldEdit').is(':visible')) {
			this.view.$('.nameFieldEdit').hide();
			this.view.$('.nameField').show();
		}
	},


	onChangeName: function() {
		this.lazySave();
		this.view.$('.nameField').html(this.get('name'));
	},


	onChangeOpenFolder: function() {
		this.lazySave();
		if (this.get('openFolder')) {
			this.containerView.$('.tasks').slideDown(200);
		} else {
			this.containerView.$('.tasks').slideUp(200);
		}
		this.view.render();
	},


	onDestroy: function() {
		this.deselectModel();
		this.view.remove();
		this.containerView.remove();
	},


	hasChildren: function() {
		return this.tasks.length > 0;
	},


	modelAbove: function() {
		var index = this.collection.indexOf(this);

		if (this.prevSibling()) {			// if has sibling above
			if (this.prevSibling().isParentFolderOpen()) {
				if (this.prevSibling().hasChildren()) {			// if model above has children
					return this.prevSibling().leaf();			// select leaf of model above
				} else {
					return this.prevSibling();
				}
			} else {
				return app.folders.get(this.prevSibling().get('folder_id'));
			}
		} else {
			return this.collection.parentModel;
		}
		return false;
	},


	modelBelow: function() {
		var index = this.collection.indexOf(this);

		if (this.hasChildren()) {
			return this.tasks.at(0);			// return first child
		} else {
			if (this.nextSibling()) {	// has a next sibling
				return this.nextSibling();			// return next sibling
			} else {
				return this.nextAboveBranch();			// return next task on above branch
			}
		}
	},


	isParentFolderOpen: function() {
		if (this.isFolder()) {
			return this.get('openFolder');
		} else {
			return this.parentFolder().get('openFolder');
		}
	},


	isParentAFolder: function() {
		return _.isNull(this.get('parentTaskId'));
	},


	parentTaskOrFolder: function() {
		return this.collection.parentModel;
	},


	parentTask: function() {
		if (_.isUndefined(this.collection.parentTask)) {
			console.log('ERROR')
		} else {
			return this.collection.parentTask;
		}
	},


	parentFolder: function() {
		if (this.isFolder()) {
			return this;
		} else {
			if (this.isParentAFolder()) {
				return this.collection.parentModel;
			} else {
				return this.collection.parentModel.parentFolder();
			}
		}
	},


	nextSibling: function() {
		var index = this.collection.indexOf(this);
		if (this.collection.at(index + 1)) {
			return this.collection.at(index + 1);
		} else {
			return false;
		}
	},


	prevSibling: function() {
		var index = this.collection.indexOf(this);
		if (this.collection.at(index - 1)) {
			return (this.collection.at(index - 1));
		} else {
			return false;
		}
	},


	nextAboveBranch: function() {
		// does my parent have a next sibling, if not then check it's parent
		if (this.isParentAFolder()) {
			if (this.parentFolder().nextSibling()) {
				return this.parentFolder().nextSibling();
			} else {
				return false;
			}
		} else {
			if (this.parentTask().nextSibling()) {	// parent has a next sibling
				return this.parentTask().nextSibling();
			} else {
				return this.parentTask().nextAboveBranch();
			}
		}
	},


	leaf: function() {
		if (this.hasChildren()) {			// if has children
			if (this.tasks.at(this.tasks.length-1).hasChildren()) {// last child has children
				return this.tasks.at(this.tasks.length -1).leaf();
			} else {
				return this.tasks.at(this.tasks.length -1);
			}
		} else {
			return this;
		}
	},


	indent: function() {
		if (!this.isFolder()) {
			if (this.prevSibling()) {
				oldCollection = this.collection;
				newCollection = this.prevSibling().tasks;
				oldCollection.remove(this);
				newCollection.add(this, {at:newCollection.length});
				return this;
			}
		}
		return false;
	},


	unindent: function() {
		if (!this.isFolder()) {
			if (!this.isParentAFolder()) {
				var oldCollection = this.collection;
				var newCollection = this.parentTask().collection;
				oldCollection.remove(this);
				newCollection.add(this, {at:newCollection.indexOf(oldCollection.parentTask)+1});
				return this;
			}
		}
		return false;
	},


	isFolder: function() {
		return this.get('modelType') == 'folder';
	},


	moveUp: function() {
		var collection = this.collection;
		var index = collection.indexOf(this);
		if (index > 0) {
			collection.remove(this);
			collection.add(this, {at:index-1});
			return true;
		}
		return false;
	},


	moveDown: function() {
		var collection = this.collection;
		var index = collection.indexOf(this);
		if (index < collection.length-1) {
			collection.remove(this);
			collection.add(this, {at:index+1});
			return true;
		}
		return false;
	},
	
});