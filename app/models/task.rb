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
end
