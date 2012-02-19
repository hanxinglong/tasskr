var BaseModel = Backbone.Model.extend({

	save: function(attributes, options) {
		m = this;
		if (this.isNew()) {
			if (this.get('createdInDb')) {
				clearTimeout(this.get('saveTimerId'));
				var t = setTimeout('m.save()', 100);
				this.set({saveTimerId: t}, {silent: true});
			} else {
				Backbone.Model.prototype.save.call(this, attributes, {silent:true});
				this.set({createdInDb:true}, {silent:true});
			}
		} else {
			Backbone.Model.prototype.save.call(this, attributes, options);
		}
	},

	makeEditable: function() {
		if (this.view.$('.nameField').is(':visible')) {
			this.view.$('.nameField').hide();
			this.view.$('.nameFieldEdit').show();
			//this.view.onKeyUp();		// resize textarea
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

	
});