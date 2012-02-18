class Folder
include Mongoid::Document
include Mongoid::Timestamps
belongs_to :user
has_many :tasks
field :name, type: String
field :order, type: Integer
field :checked, type: Boolean
field :openFolder, type: Boolean
field :createdInDb, type: Boolean	# to prevent models from being created twice
before_destroy :destroyTasks

protected

def destroyTasks
	self.tasks.destroy_all
end
end
