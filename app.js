let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');
let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navBar a');

window.addEventListener('scroll', () => {
    section.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach((links)=>{
                links.classList.remove('active');
                document.querySelector('header .navBar a[href *= ' + id + ']').classList.add('active');
            });
        }
    });
    const navbar = document.getElementsByClassName('header')[0];
    if (window.scrollY > 700) {
        navbar.style.backgroundColor = 'rgba(90, 24, 154, 0.7)';
    } else {
        navbar.style.backgroundColor = 'rgba(157, 78, 221, 0)';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const titles = ["PROGRAMMER", "TECH ENTHUSIAST", "WEB DEVELOPER"];
    let titleIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100;
    const erasingSpeed = 80;
    const delayBetweenTitles = 3000;
    const textElement = document.querySelector('.text-animate');

    function typeTitle() {
        if (charIndex < titles[titleIndex].length) {
            textElement.textContent += titles[titleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeTitle, typingSpeed);
        } else {
            setTimeout(eraseTitle, delayBetweenTitles);
        }
    }

    function eraseTitle() {
        if (charIndex > 0) {
            textElement.textContent = titles[titleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseTitle, erasingSpeed);
        } else {
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeTitle, typingSpeed);
        }
    }
    typeTitle();
});



let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};

