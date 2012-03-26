var ChartsView = Backbone.View.extend({

	id: "chartsView",
	
	events: {},

	initialize: function() {
		app.chartsView = this;
		$('#rightContent').append( this.render().el );
	},

	render: function() {
		this.$el.html( $(ich.chartsViewTemplate()) );
		return this;
	},

	hideView: function() {
		this.$el.hide();
	},

	showView: function() {
		this.$el.show();
	},

});