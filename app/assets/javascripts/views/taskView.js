var TaskView = BaseView.extend({

	className: "task",

	events: {
		"click": "clickedOn",
		"blur .nameFieldEdit": "blurTextArea",
		"keyup .nameFieldEdit" : "onKeyUp",
		"click .trashIcon": "deleteModel",
		"click .plusIcon": "addTask",
		// "click .plusIcon" : "toggleOpenFolder",
		// "click .minusIcon" : "toggleOpenFolder",
	},

	initialize: function() {
		this.model.view = this;
	},

	render: function() {
		this.$el.html( $(ich.taskViewTemplate( this.model.toJSON() )) );
		return this;
	},

	
});