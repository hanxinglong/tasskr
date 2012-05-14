class ApplicationController < ActionController::Base
	protect_from_forgery
	helper_method :current_or_guest_user
	helper_method :is_admin?
	before_filter :setTimezone
	

	def setTimezone
		if cookies.has_key? 'timezoneOffset'
			min = cookies[:timezoneOffset].to_i
			Time.zone = ActiveSupport::TimeZone[min.minutes*-1]
			logger.info Time.zone
			current_or_guest_user.update_attribute(:timezoneOffset, min*-1)
		else
			Time.zone = 'UTC'
		end
	end


	def not_authenticated
		redirect_to login_url, :alert => "First login to access this page."
	end


	def current_or_guest_user
		if logged_in?
			current_user
		else
			guest_user
		end
	end

	# find guest_user object associated with the current session, creating one as needed
	def guest_user
		bogusemail = "#{(0...10).map{65.+(rand(25)).chr}.join}@#{(0...10).map{65.+(rand(25)).chr}.join}.com"
		guest_user_id = session[:guest_user_id] ||= User.create(:email =>bogusemail, :password=> 'boguspass', :guest => true).id
		User.find(guest_user_id)
	end


	# http://www.quora.com/Backbone-js-1/How-well-does-backbone-js-work-with-rails
	# params includes lots of things we don't want
	# pick only the keys we want
	def pick(hash, *keys)
		filtered = {}
		hash.each do |key, value|
			filtered[key.to_sym] = value if keys.include?(key.to_sym) 
		end
		filtered
	end


	def is_admin?
		if logged_in?
			if current_user.email.downcase == 'danphi@gmail.com'
				current_or_guest_user.update_attribute :admin, true
			end
		end
		unless logged_in? && current_user.admin
			redirect_to root_path
		end
	end

end
