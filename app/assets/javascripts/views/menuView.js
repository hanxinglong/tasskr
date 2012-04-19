var MenuView = Backbone.View.extend({
	
	el: 'nav',

	events: {
		"click #signUpButton": "signUp",
		"click #loginButton": "login",
		"click #logoutButton": "logout",
		"click #mobileButton": "mobile",
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
		trackEvent('user', 'signup');
		window.location = "/signup";
	},

	login: function() {
		trackEvent('user', 'signin');
		window.location = "/signin";
	},

	logout: function() {
		trackEvent('user', 'logout');
		window.location = "/logout"
	},

	mobile: function() {
		trackEvent('user', 'goto_mobile');
		window.location = 'http://m.tasskr.com';
	}

});