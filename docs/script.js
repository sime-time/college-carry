import './style.css'
import { Amplify } from '../docs/aws-amplify';
import amplifyconfig from '../docs/src/amplifyconfiguration.json';
//import { response } from './amplify/backend/function/collegecarrylambdafunc/src/app';
Amplify.configure(amplifyconfig);

document.addEventListener('DOMContentLoaded', function() {

  // body-overlay fade out
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
  const form_submit_btn = document.getElementById("form-submit-btn");
  if (form_submit_btn) {
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
  };


  // "Our Portfolio" Tab Selection -> Image Changes
  const portfolio = document.querySelector(".portfolio");
  if (portfolio) {
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
  
    document.getElementById('tab1').addEventListener('click', function() {
      showContent('tab1') 
    });
  
    document.getElementById('tab2').addEventListener('click', function() {
      showContent('tab2') 
    });
  
    document.getElementById('tab3').addEventListener('click', function() {
      showContent('tab3') 
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
  
});

