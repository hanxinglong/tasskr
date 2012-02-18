class User
  include Mongoid::Document
  include Mongoid::Timestamps
  authenticates_with_sorcery!

  field :guest, type: Boolean
  field :admin, type: Boolean, default: false
  field :timezoneOffset, type: Integer
  
  has_many :folders
  
  attr_accessible :email, :password, :password_confirmation, :guest, :admin, :timezoneOffset

  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :email
  validates_uniqueness_of :email
  before_destroy :destroyFolders

  def self.cleanUsers
    users = User.where(:guest => true, :updated_at => {'$lt' => 3.days.ago}).only(:updated_at).destroy_all
  end

  protected

  def destroyFolders
    self.folders.destroy_all
  end

end
