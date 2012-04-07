var ScheduleRowView = Backbone.View.extend({

	events: {
		"click": "onClickRow",
	},

	initialize: function() {
		this.model.scheduleRowView = this;
	},

	render: function() {
		this.$el.html( $(ich.scheduleRowViewTemplate( this.model.toJSON() )) );
		return this;
	},

	onClickRow: function() {
		this.model.selectModel();
	},

});