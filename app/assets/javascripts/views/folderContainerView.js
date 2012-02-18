var FolderContainerView = Backbone.View.extend({

	tagName: "li",

	className: "folder",

	events: {},

	initialize: function() {
		this.model.folderContainerView = this;
		this.render();
	},

	render: function() {
		this.$el.html( $(ich.folderContainerViewTemplate( this.model.toJSON() )) );

		// render folder view
		this.$el.children('.folderContainer').first().html(this.model.folderView.render().el);

		// render tasks
		// _.each(this.model.tasks.models, function(t) {
		// 	$(this.el).children('ul.tasks').first().append(t.view.render().el);
		// 	t.view.delegateEvents();
		// }, this);

		return this;
	}
	
});