import './style.css'
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
//import { response } from './amplify/backend/function/collegecarrylambdafunc/src/app';
Amplify.configure(amplifyconfig);

document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'https://pu5dvbczdc.execute-api.us-east-2.amazonaws.com/dev/email'

  


  const button = document.getElementById("MutationEventButton");
  const results = document.getElementById('QueryResult');


  button.addEventListener('click', () => {
    
    // customer email to be sent in POST request
    const contactForm = {
      firstName: "Jon",
      lastName: "Doe",
      email: "jondoe@domain.com",
      property: "dorm",
      requiredService: "move-in",
      date: "01/01/2001",
      time: "13:00",
      address: "1234 Main St."
    }

    // make POST request that sends emails 
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactForm)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response from API:', data);
    })
    .catch(error => console.error('Error:', error));
    
    console.log('contact form submitted');
    const node = document.createTextNode("email sent")
    results.appendChild(node);
  });

});