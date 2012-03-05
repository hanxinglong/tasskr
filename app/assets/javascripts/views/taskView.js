var TaskView = BaseView.extend({

	className: "task",

	events: {
		"click": "clickedOn",
		"blur .nameFieldEdit": "blurTextArea",
		"keydown .nameFieldEdit": "onKeyDown",
		"keyup .nameFieldEdit" : "onKeyUp",
		"click .trashIcon": "deleteModel",
		"click .plusIcon": "addTask",
		"click input[type=checkbox]" : "clickCheckBox",
		// "click .plusIcon" : "toggleOpenFolder",
		// "click .minusIcon" : "toggleOpenFolder",
	},

	initialize: function() {
		this.model.view = this;
	},

	render: function() {
		this.$el.html( $(ich.taskViewTemplate( this.model.toJSON() )) );
		if (this.model.get('checked')) { this.$el.addClass('checked'); }
		return this;
	},


	clickCheckBox: function(e) {
		if (this.model.get('checked')) {
			this.model.set({checked:false});
		} else {
			this.model.set({checked:true});
		}
		e.stopPropagation();
	},

	
});