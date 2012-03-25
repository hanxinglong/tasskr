var ScheduleRowView = Backbone.View.extend({
	
	events: {},

	initialize: function() {
		this.model.scheduleRowView = this;
	},

	render: function() {
		this.$el.html( $(ich.scheduleRowViewTemplate( this.model.toJSON() )) );
		return this;
	},

});