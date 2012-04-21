var HelpView = Backbone.View.extend({

	id: "helpView",
	
	events: {},

	initialize: function() {
		app.helpView = this;
		$('#rightContent').append( this.render().el );
	},

	render: function() {
		this.$el.html( $(ich.helpViewTemplate()) );
		return this;
	},

	hideView: function() {
		this.$el.hide();
	},

	showView: function() {
		this.$el.show();
	},

});