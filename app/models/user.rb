class User
  include Mongoid::Document
  include Mongoid::Timestamps
  authenticates_with_sorcery!

  field :guest, type: Boolean
  field :admin, type: Boolean, default: false
  field :timezoneOffset, type: Integer
  field :emailReminders, type: Boolean, default: false
  
  has_many :folders
  
  attr_accessible :email, :password, :password_confirmation, :guest, :admin, :timezoneOffset, :emailReminders, :emailRemindersLastSent

  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :email
  validates_uniqueness_of :email
  before_destroy :destroyFolders


  def self.cleanUsers
    users = User.where(:guest => true, :updated_at => {'$lt' => 3.days.ago}).only(:updated_at).destroy_all
  end


  def self.sendEmailReminders

    users = User.where(:guest => false, :emailReminders => true)
    users.each do |u|
      Time.zone = ActiveSupport::TimeZone[u.timezoneOffset.minutes]
      today = Time.now.to_date
      tomorrow = Time.now.to_date + 1
      tasks = Task.where(:hideTask => false, :checked => false, :startDate  => {'$gte' => today, '$lt' => tomorrow})
      #folders = Folder.where(:startDate => {'$gte' => today, '$lt' => tomorrow})
      puts u.email + ' - ' + tasks.count.to_s + ' tasks'
      logger.debug u.email + ' - ' + tasks.count.to_s + ' tasks'
      if u.email == 'danphi@gmail.com'
        UserMailer.reminder_email(u, tasks, today)
      end
    end
  end


  protected


  def destroyFolders
    self.folders.destroy_all
  end

end
