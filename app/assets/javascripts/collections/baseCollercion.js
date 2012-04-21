var BaseCollection = Backbone.Collection.extend({

	setOrderFromIndex: function(model, collection, options){
		_.each(collection.models, function(m) {
			if (m.get('order') != _.indexOf(collection.models, m)) {
				m.set({order: _.indexOf(collection.models, m)});
				m.lazySave();
				//m.save(m.attributes, {silent:true});
			}
		});
	},


	removeModel: function(model, collection) {
		model.view.remove();
		model.containerView.remove();
	},

});