class TasksController < ApplicationController

	# def index
	# 	@tasks = Task.where(folder_id: params[:folder_id]).order_by([:order, :asc])
	# 	respond_to do |format|
	# 		format.json { render :json => @tasks }
	# 		format.html { }
	# 	end
	# end

	def create
		task = Task.new pick(params[:task], :folder_id, :name, :order, :checked, :notes, :createdInDb, :hideTask, :startDate, :startDateString, :completedDate, :parentTaskId, :openFolder, :startDateInPast, :repeatSeconds)
		if task.save
			x = Hash.new
			x['_id'] = task._id 
			x['created_at'] = task.created_at
			render :json => x
		else
			render :json => task.errors
		end
	end

	def update
		task = Task.find params[:id]
		if task.update_attributes pick(params[:task], :folder_id, :name, :order, :checked, :notes, :createdInDb, :hideTask, :startDate, :startDateString, :completedDate, :parentTaskId, :openFolder, :startDateInPast, :repeatSeconds)
			render :json => ''
		else
			render :json => task.errors
		end
	end

	def destroy
		task = Task.find params[:id] 
		task.destroy
		render :json => ""
	end

end