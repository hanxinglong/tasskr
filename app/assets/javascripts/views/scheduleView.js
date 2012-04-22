var ScheduleView = Backbone.View.extend({
	
	id: "scheduleView",

	events: {},

	initialize: function() {
		app.scheduleView = this;
		$('#rightContent').append( this.el );
		this.render();
	},

	render: function() {
		this.$el.html( $(ich.scheduleViewTemplate()) );
		
		_.each(app.allTasks.models, function(m) {
			if (Date.parse( m.get('startDate'))) {
				if (!m.get('hideTask')) {
					var row = new ScheduleRowView({ model:m });
					var startDate = Date.parse(m.get('startDate'));
					var id = "#schedule_" + moment(startDate).format('YYYY-MM-DD');
					$(id).append( row.render().el );
				}
			}
		});

		_.each(app.allFolders.models, function(m) {
			if (Date.parse( m.get('startDate'))) {
				if (!m.get('hideTask')) {
					var row = new ScheduleRowView({ model:m });
					var startDate = Date.parse(m.get('startDate'));
					var id = "#schedule_" + moment(startDate).format('YYYY-MM-DD');
					$(id).append( row.render().el );
				}
			}
		});
	
		return this;
	},

	hideView: function() {
		this.$el.hide();
	},

	showView: function() {
		this.$el.show();
	},

});