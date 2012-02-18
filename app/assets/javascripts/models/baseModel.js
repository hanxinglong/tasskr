var BaseModel = Backbone.Model.extend({

	// save: function(attributes, options) {
	// 	// use createdInDb to make sure we don't create duplicates
	// 	// if model is stil new then set timer to save later
	// 	m = this;
	// 	if (this.isNew()) {
	// 		if (this.get('createdInDb')) {
	// 			clearTimeout(this.get('saveTimerId'));
	// 			var t = setTimeout('m.save()', 100);
	// 			this.set({saveTimerId: t}, {silent: true});
	// 		} else {
	// 			Backbone.Model.prototype.save.call(this, attributes, {silent:true});
	// 			this.set({createdInDb:true}, {silent:true});
	// 		}
	// 	} else {
	// 		Backbone.Model.prototype.save.call(this, attributes, options);
	// 	}
	// },
	
});