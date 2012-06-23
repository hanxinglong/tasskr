class Task
  include Mongoid::Document
  include Mongoid::Timestamps
  belongs_to :folder
  field :name, type: String
  field :order, type: Integer
  field :notes, type: String
  field :createdInDb, type: Boolean	# to prevent models from being created twice
  field :hideTask, type: Boolean
  field :startDate, type: DateTime
  field :startDateString, type: String
  field :checked, type: Boolean
  field :completedDate, type: DateTime
  field :parentTaskId, type: String, default: nil
  field :openFolder, type: Boolean, default: true
  field :startDateInPast, type: Boolean, default: false
  field :repeatSeconds, type: Integer, default: nil


  def self.resetRecurringTasks
    # set timezone to UTC
    Time.zone = ActiveSupport::TimeZone[0]

    # get tasks
    tasks = Task.where(:repeatSeconds.exists => true, :startDate.exists => true, :startDate.lt => Time.now, :hideTask => false)
    tasks.each do |task|
      # advance start date
      task.startDate = task.startDate.advance(:seconds => task.repeatSeconds)

      dateString = task.startDate.strftime("%b %-d, %l:%M%P")
      task.name = task.name.gsub(task.startDateString, dateString)
      task.startDateString = dateString

      task.save
    end
  end

end
