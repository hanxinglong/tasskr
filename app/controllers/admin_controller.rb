class AdminController < ApplicationController
	before_filter :is_admin?

	def index
		@users = User.where(guest: false).order_by([:last_activity_at, :desc]).includes(:folders).limit(40)
		@tasks = Task.where(:name.ne => '').order_by([:created_at, :desc]).limit(30)
		@folders = Folder.order_by([:updated_at, :desc]).includes(:tasks).limit(20)

		# folders = Folders.order_by([:updated_at, :desc]).limit(20)
		# folders.each do |f|
		# 	tasks = f.tasks.where(hideTask: false).order_by([:order, :asc])
		# 	f['childtasks'] = makeTaskTree f, tasks
		# 	@foldersTree << f
		# end

		@numUsers = Array.new
		models = Stat.where(type: 'numUsers').order_by([:date, :asc])
		models.each do |m|
			column = Array.new
			column << m.date.to_time.utc.to_i * 1000
			column << m.count
			@numUsers << column
		end
		@numGuests = Array.new
		models = Stat.where(type: 'numGuests').order_by([:date, :asc])
		models.each do |m|
			column = Array.new
			column << m.date.to_time.utc.to_i * 1000
			column << m.count
			@numGuests << column
		end
		@numFolders = Array.new
		models = Stat.where(type: 'numFolders').order_by([:date, :asc])
		models.each do |m|
			column = Array.new
			column << m.date.to_time.utc.to_i * 1000
			column << m.count
			@numFolders << column
		end
		@numTasks = Array.new
		models = Stat.where(type: 'numTasks').order_by([:date, :asc])
		models.each do |m|
			column = Array.new
			column << m.date.to_time.utc.to_i * 1000
			column << m.count
			@numTasks << column
		end
		@numCompletedTasks = Array.new
		models = Stat.where(type: 'numCompletedTasks').order_by([:date, :asc])
		models.each do |m|
			column = Array.new
			column << m.date.to_time.utc.to_i * 1000
			column << m.count
			@numCompletedTasks << column
		end
		@numUserTasks = Array.new
		models = Stat.where(type: 'numUserTasks').order_by([:date, :asc])
		models.each do |m|
			column = Array.new
			column << m.date.to_time.utc.to_i * 1000
			column << m.count
			@numUserTasks << column
		end
	end
  
end