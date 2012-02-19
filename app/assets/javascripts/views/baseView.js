var BaseView = Backbone.View.extend({

	clickedOn: function(e) {
		if (this.$('.taskName').is(':visible')) {
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
		// input.attr('rows', '1');
		// while (input.height() < input[0].scrollHeight) {
		// 	input.css('overflow-y', 'scroll');
		// 	input.attr('rows', input[0].rows + 1);
		// 	input.css('overflow-y', 'hidden');
		// }

		if (input.val() != this.model.get('name')) {
			this.model.set({name: input.val()});
		}
	},

	clickedOn: function(e) {
		if (this.$('.nameField').is(':visible')) {
			this.model.makeEditable();
		}
		e.stopPropagation();
	},

	blurTextArea: function() {
		this.model.makeNonEditable();
	},

	addTask: function(e) {
		this.model.addTask(0);
		e.stopPropagation();
	},

	toggleOpenFolder: function(e) {
		if (this.model.get('openFolder')) {
			this.model.set({openFolder:false});
		} else {
			this.model.set({openFolder:true});
		}
		e.stopPropagation();
	},

	deleteModel: function(e){
		var answer = confirm('Delete?');
		if (answer) {
			v = this;
			$(this.model.containerView.el).slideUp(200, function() {
				v.model.destroy();
			});
		}
		e.stopPropagation();
	},

});