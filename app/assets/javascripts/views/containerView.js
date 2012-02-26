var ContainerView = Backbone.View.extend({

	tagName: "li",

	events: {},

	initialize: function() {
		this.model.containerView = this;
	},

	render: function() {
		// render container for view
		this.$el.html( $(ich.containerViewTemplate( this.model.toJSON() )) );

		// render view
		this.$el.children('.container').first().html(this.model.view.render().el);

		// render child tasks
		_.each(this.model.tasks.models, function(t) {
			$(this.el).children('ul.tasks').first().append(t.containerView.render().el);
		}, this);

		return this;
	}
	
});