var MenuView = Backbone.View.extend({
	
	el: 'nav',

	events: {},

	initialize: function() {
		app.menuView = this;
		this.render();
	},

	render: function() {
		this.$el.html( $(ich.menuViewTemplate()) );
		return this;
	},

});