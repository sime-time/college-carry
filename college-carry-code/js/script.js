document.addEventListener("DOMContentLoaded", () => {
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