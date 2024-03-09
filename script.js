import './style.css'
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
//import { response } from './amplify/backend/function/collegecarrylambdafunc/src/app';
Amplify.configure(amplifyconfig);

document.addEventListener('DOMContentLoaded', function() {

  // Body-overlay fade out
  const body_overlay = document.querySelector(".body-overlay");
  body_overlay.addEventListener("animationend", () => {
    body_overlay.classList.add('animation-complete')
    body_overlay.style.display = "none";
    console.log('animation end')
  });


  // Mobile Responsive Menu Bars
  const bars = document.querySelector('.bars i');
  const cross = document.querySelector('.fa-x');
  const nav = document.querySelector('nav');
  bars.addEventListener('click', () => {
    nav.style.left = '0px';
    console.log('nav')
  });
  cross.addEventListener('click', () => {
    nav.style.left = '-200px';
    console.log('nav close')
  });

  
  // API function call
  const apiUrl = 'https://pu5dvbczdc.execute-api.us-east-2.amazonaws.com/dev/email'
  const contact_form = document.getElementById("contact-form");
  if (contact_form) {
    contact_form.addEventListener('submit', (event) => {
      // Prevent the default form submission behavior
      event.preventDefault();

      // parse the date time values
      let date_time = document.getElementById('dateTimeInput').value;
      let selectedDate = date_time.split('T')[0];
      let selectedTime = date_time.split('T')[1];


      // customer email to be sent in POST request
      const contactFormValues = {
        firstName: document.getElementById('fname').value,
        lastName: document.getElementById('lname').value,
        email: document.getElementById('mail').value,
        phone: document.getElementById('phone').value,
        property: document.getElementById('property-type').value,
        address: document.getElementById('address').value,
        requiredService: document.querySelector('input[name="move-service"]:checked').value,
        date: selectedDate,
        time: selectedTime,
        addtionalNotes: document.getElementById('additionalNotes').value
      };
      
      // make POST request that sends emails 
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactFormValues)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Response from API:', data);
      })
      .catch(error => console.error('Error:', error));

      // hide the form and show successfully submitted form content 
      var form_container = document.querySelector('.form-container');
      var success_content = document.getElementById('submission-success-content')
      
      form_container.classList.add('hidden');
      success_content.classList.remove('hidden');

      // log the submission items
      console.log('contact form submitted');
      console.log(contactFormValues);
    });
  };

  // Home Page Image Slider
  const slide_container = document.querySelector(".slide-container");
  if (slide_container) {
    let currentIndex = 0;
    const text = document.querySelectorAll('.slide-text');
    const slides = document.querySelectorAll(".slide-item");
    const overlay = document.querySelectorAll(".overlay");
  
    const showSlide = (index) => {
      slides.forEach((slide) => slide.classList.remove('active'));
      slides[index].classList.add('active');
      text.forEach((texts) => texts.classList.remove('active'));
      text[index].classList.add('active');
      overlay.forEach((over) => over.classList.remove('active'));
      overlay[index].classList.add('active');
    };
  
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    };
  
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
    showSlide(currentIndex);
  };

}); // end DOMContentLoaded
