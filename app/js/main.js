const smoothScroll = document.querySelectorAll('.nav__link');
const burger = document.querySelector('.burger')
const navMenu = document.querySelector('.nav')

smoothScroll.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
  
    const ID = event.target.getAttribute('href').substr(1);

    document.getElementById(ID).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
    })
  })
})


const toggleMenu = () => {
  navMenu.classList.toggle('nav_active')
  burger.classList.toggle('burger_active')
}

burger.addEventListener('click', () => {
  toggleMenu()
})
