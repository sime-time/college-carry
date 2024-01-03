import './style.css'
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
//import { response } from './amplify/backend/function/collegecarrylambdafunc/src/app';
Amplify.configure(amplifyconfig);

document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'https://pu5dvbczdc.execute-api.us-east-2.amazonaws.com/dev/email'
  const form_submit_btn = document.getElementById("form-submit-btn");

  form_submit_btn.addEventListener('click', () => {
    
    // customer email to be sent in POST request
    const contactForm = {
      firstName: "Jon",
      lastName: "Doe",
      email: "simeondunn25@gmail.com",
      property: "dorm",
      requiredService: "move-in",
      date: "01/01/2001",
      time: "13:00",
      address: "1234 Main St."
    };

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
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".body-overlay");
  overlay.addEventListener("animationend", () => {
    overlay.style.display = "none";
    console.log('animation end')
  });
});

function showContent(tabId) {
  const tabs = document.querySelectorAll('.tab');
  const allContents = document.querySelectorAll('.content');
  allContents.forEach(content => {
    content.classList.remove('active-content');
  });
  tabs.forEach(tab => {
    tab.classList.remove('active');
  })

  const selectedTabes = document.getElementById(`${tabId}`);
  if (selectedTabes) {
    selectedTabes.classList.add('active');
  }
  const selectedTab = document.getElementById(`content-${tabId}`);
  if (selectedTab) {
    selectedTab.classList.add('active-content');
  }
};

const bars = document.querySelector('.bars i');
const cross = document.querySelector('.fa-x');
//const cross = document.querySelector('.cross i');
const nav = document.querySelector('nav');

bars.addEventListener('click', () => {
  nav.style.left = '0px';
  console.log('nav')
});
cross.addEventListener('click', () => {
  nav.style.left = '-200px';
  console.log('nav close')
});