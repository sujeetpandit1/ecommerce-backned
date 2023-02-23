const orderModel = require ('../modules/orderModule')
const nodemailer = require('nodemailer');

const sendEmail = (email, message) => {
    // create a transporter using the Sendgrid API
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
          user: 'sujeet4545@gmail.com',
          pass: 'lezixxmjmhyketwz'
      }
    });
  
    // define the email options
    const mailOptions = {
      from: 'sujeet4545@gmail.com',
      to: email,
      subject: 'Order Notification',
      text: message,
    };
  
    // send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
  
  const notify = async () => {
    let checkOrder = await orderModel.find( { $or: [ { orderStatus: "Completed"}]});
    // console.log(checkOrder);
  
    for(let ele of checkOrder){
      if (ele.orderStatus === "Completed") {
        sendNotification(ele._id, `Wohoo ! You Order Has been Placed.`);
      };
    
    }
  };
    
    module.exports = { notify };