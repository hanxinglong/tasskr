task :cleanUsers => :environment do
    User.cleanUsers
end

task :recordStats => :environment do
	Stat.recordUsers
	Stat.recordGuests
	Stat.recordTasks
	Stat.recordFolders
	Stat.completedTasks
	Stat.userTasks
end

task :sendEmailReminders => :environment do
	User.sendEmailReminders
end