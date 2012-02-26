var TabMenuView = Backbone.View.extend({

	tagName: "ul",

	el: '#tabs',
	
	events: {
		"click #scheduleTab": "selectScheduleTab",
		"click #chartsTab": "selectChartsTab",
		"click #taskTab": "selectTaskTab",
	},

	initialize: function() {
		app.tabMenuView = this;
		this.render();
	},

	render: function() {
		this.$el.html( $(ich.tabMenuViewTemplate()) );
		return this;
	},

	deselectAllTabs: function() {
		this.$('#scheduleTab').removeClass('selected');
		this.$('#chartsTab').removeClass('selected');
		this.$('#taskTab').removeClass('selected');
		app.scheduleView.hideView();
		app.chartsView.hideView();
		if (!_.isUndefined(app.selectedModel)) {
			if (!_.isUndefined(app.selectedModel.taskEditView)) {
				app.selectedModel.taskEditView.hideView();
			}
		}
	},

	selectScheduleTab: function() {
		this.deselectAllTabs();
		this.$('#scheduleTab').addClass('selected');
		app.scheduleView.showView();
	},

	selectChartsTab: function() {
		this.deselectAllTabs();
		this.$('#chartsTab').addClass('selected');
		app.chartsView.showView();
	},

	selectTaskTab: function() {
		this.deselectAllTabs();
		this.$('#taskTab').addClass('selected');
		app.selectedModel.taskEditView.showView();
	},

});