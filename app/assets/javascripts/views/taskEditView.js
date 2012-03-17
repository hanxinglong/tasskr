var TaskEditView = Backbone.View.extend({
	
	id: 'taskEditView',

	events: {
		"keyup textarea" : "textareaKeyUp",
	},

	initialize: function() {
		this.model.taskEditView = this;
		$('#rightContent').append( this.render().el );
		app.tabMenuView.$('#taskTab').show();
	},

	render: function() {
		if (this.model.has('created_at')) {
			this.model.set({ tempChowCreatedDate: true}, {silent:true});
			this.model.set({ tempCreatedDateFromNow: moment( this.model.get( 'created_at' ) ).calendar().toLowerCase() }, {silent:true});
		}

		this.$el.html( $(ich.taskEditViewTemplate( this.model.toJSON() )) );
		return this;
	},

	hideView: function() {
		this.$el.hide();
	},

	showView: function() {
		this.$el.show();
		this.$el.css('height', '100%');
	},

	textareaKeyUp: function() {
		var input = this.$('textarea');
		if (input.val() != this.model.get('notes')) {
			this.model.set({notes: input.val()});
		}
	},

});