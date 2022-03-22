const smoothScroll = document.querySelectorAll('.nav__link');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const navItem = document.querySelectorAll('.nav__link');
const body = document.body;


smoothScroll.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
  
    const ID = event.target.getAttribute('href').substr(1);

    document.getElementById(ID).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
    });
  });
});

burger.addEventListener('click', () => {
  body.classList.toggle('none-scroll')
  burger.classList.toggle('burger_active')
  nav.classList.toggle('nav_visible')
});

navItem.forEach(el => {
  el.addEventListener('click', () => {
    body.classList.remove('none-scroll')
    burger.classList.remove('burger_active')
    nav.classList.remove('nav_visible')
  });
});