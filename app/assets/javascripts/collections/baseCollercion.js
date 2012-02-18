var BaseCollection = Backbone.Collection.extend({
	setOrderFromIndex: function(){
		_.each(this.models, function(m) {
			if (m.get('order') != _.indexOf(m.collection.models, m)) {
				m.set({order: _.indexOf(m.collection.models, m)}, {silent:true});
				m.save(m.attributes, {silent:true});
			}
		});
	},
});