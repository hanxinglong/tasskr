var TabMenuView = Backbone.View.extend({

	tagName: "ul",

	el: '#tabs',
	
	events: {
		"click #scheduleTab": "selectScheduleTab",
		"click #chartsTab": "selectChartsTab",
		"click #taskTab": "selectTaskTab",
		"click #helpTab": "selectHelpTab",
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
		this.$('#helpTab').removeClass('selected');
		app.scheduleView.hideView();
		app.chartsView.hideView();
		app.helpView.hideView();
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
		trackEvent('selectScheduleTab', 'selectScheduleTab');
	},

	selectChartsTab: function() {
		this.deselectAllTabs();
		this.$('#chartsTab').addClass('selected');
		app.chartsView.showView();
		trackEvent('selectChartsTab', 'selectChartsTab');
	},

	selectTaskTab: function() {
		this.deselectAllTabs();
		this.$('#taskTab').addClass('selected');
		app.selectedModel.taskEditView.showView();
	},

	selectHelpTab: function() {
		this.deselectAllTabs();
		this.$('#helpTab').addClass('selected');
		app.helpView.showView();
		trackEvent('selectHelpTab', 'selectHelpTab');
	},

});