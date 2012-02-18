class FoldersController < ApplicationController

	def chartCompleted
		completedDates = Array.new
		createdDates = Array.new

		completedDatesData = Array.new
		completedDayData = Array.new
		completedHourData = Array.new
		totalCompletedData = Array.new
		totalCreatedData = Array.new

		@data = Hash.new
		folders = current_or_guest_user.folders
		folders.each do |f|
			tasks = f.tasks
			tasks.each do |t|
				if t.checked
					if t.completedDate
						completedDates  << t.completedDate
					else
						completedDates  << t.updated_at
					end
				end
				createdDates << t.created_at
			end
		end

		groupedCompletedDates = completedDates.group_by{ |completedDate| completedDate.in_time_zone.to_date.to_s }
		groupedCompletedDates.each do |key, value|
			column = Array.new
			column << key.to_time.utc.to_i * 1000		# this is for Flot
			column << value.count
			completedDatesData << column
		end
		@data[:byDate] = completedDatesData

		groupedCompletedDay = completedDates.group_by{ |completedDate| completedDate.in_time_zone.to_date.strftime('%w')  }
		groupedCompletedDay.each do |key, value|
			column = Array.new
			column << key
			column << value.count
			completedDayData << column
		end
		@data[:byDay] = completedDayData

		groupedCompletedHour = completedDates.group_by{ |completedDate| completedDate.in_time_zone.strftime('%k')  }
		groupedCompletedHour.each do |key, value|
			column = Array.new
			column << key
			column << value.count
			completedHourData << column
		end
		@data[:byHour] = completedHourData

		c=0
		(completedDates[0].in_time_zone.to_date..Time.now.in_time_zone.to_date).each do |date|
			c=c+completedDates.count{ |key, value| key.in_time_zone.to_date == date }
			column = Array.new
			column << date.to_time.utc.to_i * 1000		# this is for Flot
		 	column << c
		 	totalCompletedData << column
		end
		@data[:totalCompleted] = totalCompletedData

		c=0
		(createdDates[0].in_time_zone.to_date..Time.now.in_time_zone.to_date).each do |date|
			c=c+createdDates.count{ |key, value| key.in_time_zone.to_date == date }
			column = Array.new
			column << date.to_time.utc.to_i * 1000		# this is for Flot
		 	column << c
		 	totalCreatedData << column
		end
		@data[:totalCreated] = totalCreatedData

		render :json => @data
	end



	def index
		@result = []
		folders = current_or_guest_user.folders.order_by([:order, :asc])
		folders.each do |f|
			tasks = f.tasks.where(hideTask: false).order_by([:order, :asc])
			f['childtasks'] = tasks
			@result << f
		end
		respond_to do |format|
			format.json { render :json => @result }
			format.html { }
		end
	end

	def create
		folder = current_or_guest_user.folders.new pick(params[:folder], :name, :order, :openFolder, :createdInDb)
		if folder.save
			x = Hash.new
			x['_id'] = folder._id 
			x['created_at'] = folder.created_at
			render :json => x
		else
			render :json => folder.errors
		end
	end

	def update
		folder = current_or_guest_user.folders.find params[:id]
		if folder.update_attributes pick(params[:folder], :name, :order, :openFolder, :createdInDb)
			render :json => ''
		else
			render :json => folder.errors
		end
	end

	def destroy
		folder = current_or_guest_user.folders.find params[:id] 
		folder.destroy
		render :json => ""
	end

end