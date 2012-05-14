class UserMailer < ActionMailer::Base
  default from: "passwordreset@tasskr.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.reset_password_email.subject
  #
  def reset_password_email(user)
    @user = user
    @url  = "http://tasskr.com/password_resets/#{user.reset_password_token}/edit"
    mail(:to => user.email,
         :subject => "Your password has been reset")
  end


  def reminder_email(user, tasks, dateToday)
    @user = user
    @tasks = tasks
    @dateToday = dateToday
    mail(:to => user.email,
        :from => "reminder@tasskr.com",
        :subject => "Tasskr Reminder")
  end
end
