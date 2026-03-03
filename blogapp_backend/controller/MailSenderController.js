const dotenv = require("dotenv");
const transporter = require("../services/MailSenderTransporter");

// const MailModel = require("../models/Mail")

dotenv.config();

async function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

const MailSenderController = async (req, res) => {
  try {
    const { email, subject, body } = req.body;
    let info = await transporter.sendMail({
      from: "er.satyagautam@gmail.com",
      to: email,
      subject: subject,
      html: `<h2>${body}</h2>`,
    });

    // const data = MailModel.create({email,subject,body});
    // console.log(" Entry in db is : ");
    // console.log(data);

    // await wait(4000);

    return res.status(200).json({
      success: true,
      message: "Mail has been sent successfully ",
      info: info,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: " Something went wrong while sending mail ",
    });
  }
};

module.exports = MailSenderController;
