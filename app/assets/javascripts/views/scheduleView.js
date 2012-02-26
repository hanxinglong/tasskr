var ScheduleView = Backbone.View.extend({
	
	events: {},

	initialize: function() {
		app.scheduleView = this;
		$('#rightContent').append( this.render().el );
	},

	render: function() {
		this.$el.html( $(ich.scheduleViewTemplate()) );
		return this;
	},

	hideView: function() {
		this.$el.hide();
	},

	showView: function() {
		this.$el.show();
	},

});