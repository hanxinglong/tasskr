var MenuView = Backbone.View.extend({
	
	el: 'nav',

	events: {
		"click #signUpButton": "signUp",
		"click #loginButton": "login",
		"click #logoutButton": "logout",
	},

	initialize: function() {
		app.menuView = this;
		this.render();
	},

	render: function() {
		this.$el.html( $(ich.menuViewTemplate()) );
		return this;
	},

	signUp: function() {
		window.location = "/signup";
	},

	login: function() {
		window.location = "/signin";
	},

	logout: function() {
		window.location = "/logout"
	}

});