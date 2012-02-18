class Stat
  include Mongoid::Document
  include Mongoid::Timestamps
  field :type, type: String
  field :count, type: Integer
  field :date, type: Date

	def self.recordUsers
		count = User.where(:guest => false).count
		date = DateTime.now.utc.to_date
		if Stat.exists?(conditions: {type: 'numUsers', date: date})
			stat = Stat.where(type: 'numUsers', date: date).first
			stat.update_attribute(:count, count)
		else
			Stat.create!(type: 'numUsers', count: count, date: date)
		end
		puts "recorded #{count} users"
	end

	def self.recordGuests
		count = User.where(:guest => true).count
		date = DateTime.now.utc.to_date
		if Stat.exists?(conditions: {type: 'numGuests', date: date})
			stat = Stat.where(type: 'numGuests', date: date).first
			stat.update_attribute(:count, count)
		else
			Stat.create!(type: 'numGuests', count: count, date: date)
		end
		puts "recorded #{count} guests"
	end

  def self.recordTasks
  		count = Task.count
		date = DateTime.now.utc.to_date
		if Stat.exists?(conditions: {type: 'numTasks', date: date})
			stat = Stat.where(type: 'numTasks', date: date).first
			stat.update_attribute(:count, count)
		else
			Stat.create!(type: 'numTasks', count: count, date: date)
		end
		puts "recorded #{count} tasks"
  end

  def self.recordFolders
  		count = Folder.count
		date = DateTime.now.utc.to_date
		if Stat.exists?(conditions: {type: 'numFolders', date: date})
			stat = Stat.where(type: 'numFolders', date: date).first
			stat.update_attribute(:count, count)
		else
			Stat.create!(type: 'numFolders', count: count, date: date)
		end
		puts "recorded #{count} folders"
  end

  def self.completedTasks
  		count = 0
  		users = User.where(guest: false)
  		users.each do |user|
  			folders = user.folders
  			folders.each do |folder|
  				count = count + folder.tasks.where(checked: true).count
  			end
  		end
  		date = DateTime.now.utc.to_date
  		if Stat.exists?(conditions: {type: 'numCompletedTasks', date: date})
  			stat = Stat.where(type: 'numCompletedTasks', date: date).first
  			stat.update_attribute(:count, count)
  		else
  			Stat.create!(type: 'numCompletedTasks', count: count, date: date)
  		end
  		puts "recorded #{count} completed tasks"
  end

  def self.userTasks
  		count = 0
  		users = User.where(guest: false)
  		users.each do |user|
  			folders = user.folders
  			folders.each do |folder|
  				count = count + folder.tasks.count
  			end
  		end
  		date = DateTime.now.utc.to_date
  		if Stat.exists?(conditions: {type: 'numUserTasks', date: date})
  			stat = Stat.where(type: 'numUserTasks', date: date).first
  			stat.update_attribute(:count, count)
  		else
  			Stat.create!(type: 'numUserTasks', count: count, date: date)
  		end
  		puts "recorded #{count} user tasks"
  end
end