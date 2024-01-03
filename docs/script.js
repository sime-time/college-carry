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