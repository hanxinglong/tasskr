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