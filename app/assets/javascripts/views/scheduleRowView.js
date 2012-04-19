var ScheduleRowView = Backbone.View.extend({

	events: {
		"click": "onClickRow",
	},

	initialize: function() {
		this.model.scheduleRowView = this;
	},

	render: function() {
		var startDate = Date.parse(this.model.get('startDate'));
		var displayTime = moment(startDate).format('h:mma');
		this.model.set({displayTimeShow: false});
		if (displayTime != '12:00am') {
			this.model.set({displayTime: displayTime, displayTimeShow: true});
		}
		this.$el.html( $(ich.scheduleRowViewTemplate( this.model.toJSON() )) );
		return this;
	},

	onClickRow: function() {
		this.model.selectModel();
	},

});