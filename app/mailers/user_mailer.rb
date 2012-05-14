class UserMailer < ActionMailer::Base
  #default from: "passwordreset@tasskr.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.reset_password_email.subject
  #
  def reset_password_email(user)
    @user = user
    @url  = "http://tasskr.com/password_resets/#{user.reset_password_token}/edit"
    mail(:to => user.email, :from => "passwordreset@tasskr.com",
         :subject => "Your password has been reset")
  end


  def reminder_emails
    users = User.where(:guest => false, :emailReminders => true)
    users.each do |u|
      Time.zone = ActiveSupport::TimeZone[u.timezoneOffset.minutes]
      @dateToday = Time.now.to_date
      tomorrow = Time.now.to_date + 1

      if u.emailRemindersLastSent != @dateToday
        @tasks = Array.new
        folders = Folder.where(:user_id => u.id)
        folders.each do |f|
          t = Task.where(:folder_id => f.id, :hideTask => false, :checked => false, :startDate  => {'$gte' => @dateToday, '$lt' => tomorrow})
          t.each do |x|
            @tasks << x
          end
        end

        puts u.email + ' - ' + @tasks.count.to_s + ' tasks'

        if @tasks.count > 0
          mail(:to => u.email, :from => "reminder@tasskr.com", :subject => "Tasskr Reminder")
          mail.deliver
          u.update_attribute(:emailRemindersLastSent, @dateToday)
        end
      end
    end
  end

end
