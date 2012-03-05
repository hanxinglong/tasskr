var BaseView = Backbone.View.extend({

	clickedOn: function(e) {
		this.model.selectModel();
		e.stopPropagation();
	},


	blurTextArea: function() {
		this.model.deselectModel();
	},


	onKeyDown: function(e) {

		// tab
		if (e.keyCode === 9) {
			if (e.shiftKey) {
				// shift + tab
				if (this.model.unindent()) {
					this.model.selectModel();
				}
			} else {
				// tab
				if (this.model.indent()) {
					this.model.selectModel();
				}
			}
			e.stopPropagation();
			return false;
		}

		// enter
		// prevent newlines when hitting enter
		if(e.keyCode == 13) { 
			return false;
		}

		// up
		if (e.keyCode === 38) {
			if (e.shiftKey) {
				if (this.model.moveUp()) {
					this.model.selectModel();
				}
			} else {
				if (this.model.modelAbove()) {
					this.model.modelAbove().selectModel();
				}
			}
			e.stopPropagation();
			return false;
		}

		// down
		if (e.keyCode === 40) {
			if (e.shiftKey) {
				if (this.model.moveDown()) {
					this.model.selectModel();
				}
			} else {
				if (this.model.modelBelow()) {
					this.model.modelBelow().selectModel();
				}
			}
			e.stopPropagation();
			return false;
		}

	},


	onKeyUp: function(e) {
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