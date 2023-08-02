import smtplib


class Email:

  def __init__(self, receiver, lower_limit, upper_limit, user):
    self.receiver = receiver
    self.sender = "darpanhh11819@gmail.com"
    self.lower_limit = lower_limit
    self.upper_limit = upper_limit
    self.user = user
    self.message = """From: darpanhh11819@gmail.com
    To: """+self.receiver+"""
    Subject: Urgent Notification: Crypto Currency Price Limit Reached

    Dear sir,

    I hope this email finds you well. We are writing to notify you about an important development regarding your
    cryptocurrency investment. """

  def send_email(self):
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
      server.ehlo()
      server.starttls()
      server.ehlo()
      server.login(self.sender,'prwyzgxxcovyjxqs')
      server.sendmail(self.sender, self.receiver, self.message)

      server.close()

      print("sent")



a = Email('darpan.bahadur.2001@gmail.com', 10, 10)
a.send_email()
