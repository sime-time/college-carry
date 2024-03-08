/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const nodemailer = require('nodemailer')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/email', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/email/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/email', async function(req, res) {

  // access environment variables
  const senderService = process.env.EMAIL_SERVICE;
  const senderHost = process.env.EMAIL_HOST;
  const senderEmail = process.env.EMAIL_USERNAME;
  const senderPass = process.env.EMAIL_PASSWORD;
  const senderName = process.env.EMAIL_SENDER;
  
  try {
    // create a transporter to send emails
    const transporter = nodemailer.createTransport({
      host: senderHost, 
      port: 587,
      secure: false, 
      auth: {
        user: senderEmail,
        pass: senderPass
      }
    }); 

    // use uniform style sheet for emails
    const email_style = `
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }

          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h2 {
              color: #333;
          }

          p {
              color: #555;
          }

          li {
              color: #555;
              margin: 10px
          }
      </style>`

    // draft email to be sent internally
    const internal_message = `${email_style}
    <div class="container">
      <h2>A customer has booked a ${req.body.requiredService.toUpperCase()}:</h2>
      <ul>
        <li>Name:&nbsp;${req.body.firstName} ${req.body.lastName}</li>
        <li>Email:&nbsp;${req.body.email}</li>
        <li>Address:&nbsp;${req.body.address}</li>
        <li>Property:&nbsp;${req.body.property}</li>
        <li>Date:&nbsp;${req.body.date}</li>
        <li>Time:&nbsp;${req.body.time}</li>
        <li>Notes:&nbsp;${req.body.addtionalNotes}</li>
      </ul>
    </div>`

    // draft an email to be sent to the customer
    // cc back to sender so they can see what they've sent
    const payment_link = "https://buy.stripe.com/6oEcOr8K10cM1IkfZ0"
    const contact_info = '<a href="tel:(260)804-3503"><span>260-804-3503</span></a>'
    const customer_message = `${email_style}
    <div class="container">
        <h2>Thank You for Booking with Us!</h2>
        <p>Dear ${req.body.firstName} ${req.body.lastName},</p>
        <p>We appreciate your trust in ${senderName} for your upcoming move. We are excited to assist you with a smooth and stress-free experience.</p>
        <p>To confirm and secure your appointment during peak seasons, we require a non-refundable down payment of $20. This deposit serves as confirmation of your booking and is non-refundable in the event of a cancellation.</p>
        <p>Please follow the link below to make the payment:</p>
        <p><a href="${payment_link}">Make Payment</a></p>
        <p>If you have any questions or need further assistance, feel free to reply to this email or contact us at ${contact_info}.</p>
        <p>Thank you once again for choosing ${senderName}. We look forward to serving you!</p>
        <p>Best regards,<br>${senderName}</p>
    </div>
    `

    const customerMailContent = {
      to: req.body.email,
      from: {
        name: senderName,
        address: senderEmail
      },
      subject: "Thank you for booking with us!",
      html: customer_message,
      cc: senderEmail
    };

    // draft an email to be sent to college carry business email internally
    const internalMailContent = {
      to: senderEmail,
      from: {
        name: senderName,
        address: senderEmail
      },
      subject: `${req.body.requiredService.toUpperCase()}: Customer Booked Appointment`,
      html: internal_message
    };

    // send the email
    const customer_mail_info = await transporter.sendMail(customerMailContent);
    const internal_mail_info = await transporter.sendMail(internalMailContent);

    // log the result
    console.log('Email sent to customer:', customer_mail_info.response);
    console.log('Email sent internally:', internal_mail_info.response);

    // respond to the client 
    res.json({success: 'post call succeed!', url: req.url, body: req.body})

  } catch (error) {
    // log the error 
    console.error('Error sending email:', error);

    // respond to the client with an error 
    res.status(500).json({ error: 'internal server error - error sending email' });
  }
});

app.post('/email/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/email', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/email/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/email', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/email/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("API is ready!");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;