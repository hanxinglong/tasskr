var OutlineRowView = Backbone.View.extend({
	
	className: "outlineRow",


	events: {
		"click": "onSelect"
	},


	initialize: function() {
		this.model.outlineRowView = this;
	},


	render: function() {
		$('#leftContainer').append( this.el );
		this.$el.html( $(ich.outlineRowViewTemplate( this.model.toJSON())) );
		return this;
	},


	onSelect: function() {
		this.model.selectModel();
	},

});