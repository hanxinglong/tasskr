class UsersController < ApplicationController

	def edit
		@user = current_or_guest_user
	end

	def update
		logger.debug params[:user]
		@user = current_or_guest_user
		if @user.update_attributes(params[:user])
			redirect_to root_url, :flash => { :success => "settings saved" }
		else
			render :action => "edit"
		end
	end


	def new
	  @user = User.new
	end


	def create
	  @user = User.new(params[:user])
	  @user.guest = false
	  if @user.save
	  		guest = User.find(session[:guest_user_id])
			guest_folders = guest.folders
			guest_folders.each do |f|
				f.user = @user
				f.save!
			end
			guest.destroy
			session[:guest_user_id] = nil
			auto_login(@user)
	   	redirect_to root_url, :notice => "Signed up!"
	  else
	    render :new
	  end
	end
	
end