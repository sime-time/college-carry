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
  const senderService = process.env.EMAIL_SERVICE
  const senderHost = process.env.EMAIL_HOST
  const senderEmail = process.env.EMAIL_USERNAME
  const senderPass = process.env.EMAIL_PASSWORD
  
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

    // draft an email to be sent to the customer
    const customerMailContent = {
      to: senderEmail,//req.body.email,
      from: senderEmail,
      subject: "Customer Booking Appointment Test",
      text: `Hello ${req.body.firstName}! Thank you for booking a ${req.body.requiredService} with us.`
    };

    // draft an email to be sent to college carry business email internally
    const internalMailContent = {
      to: senderEmail,
      from: senderEmail,
      subject: "Internal Booking Notification Test",
      text: `A customer has booked a ${req.body.requiredService}: \n
        Name:     ${req.body.firstName} ${req.body.lastName} \n
        Email:    ${req.body.email} \n
        Address:  ${req.body.address} \n
        Property: ${req.body.property} \n
        Date:     ${req.body.date} \n
        Time:     ${req.body.time}`
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