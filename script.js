const navLinks = document.querySelectorAll(`.ul-list li a`);
const sections = document.querySelectorAll(`section`);
//Grabs all navigation links and all the sections on the page.

function removeActive() {
    navLinks.forEach(link => link.parentElement.classList.remove(`active`));
}
//Clears the “active” class from every nav item, so only one can be highlighted at a time.

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault(); //prevent krega default jump to a new page
        const targetId = link.getAttribute('href').substring(1); // sbki id lera hai
        const targetSection = document.getElementById(targetId); // upar li hui ID (home,about....)

        window.scrollTo({ // yehi scroll krega
            top : targetSection.offsetTop - 80,
            behavior: 'smooth'  //object hai scrollto ke ander
        });
        removeActive();
        link.parentElement.classList.add('active');
    });
});
/*>It stops the default jump.
  >Finds the matching section (based on the href).
  >Smoothly scrolls to that section, offset slightly for the navbar height.
  >Updates the nav item to look “active.” */

window.addEventListener('scroll', ()=> {
    let scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        if(scrollPos > section.offsetTop && scrollPos < section.offsetTop+section.offsetHeight) {
            removeActive();
            const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
            if (activeLink) activeLink.parentElement.classList.add('active');
        }
    });//Checks which section is currently in view and highlights its corresponding nav link dynamically.

    if(window.scrollY > 500) {
        backToTop.style.display = "flex";
    }else {
        backToTop.style.display = "none"
    }//Shows or hides the “back to top” button once the user scrolls down a bit.

    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if(elementTop < windowHeight - revealPoint) {
            el.classList.add('active-reveal')
        }
    });
});//Implements a scroll reveal effect — when an element is about to enter the viewport, it gets a CSS class that triggers an animation.

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));
//Prepares elements with the reveal class so they can animate later when scrolled into view.
const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior: 'smooth'});
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});





const roles = ["Frontend Developer",
               "Web enthusiast",
               "AI and machine Learning",
               "Data Structures"
              ];
let index = 0;
let charIndex = 0;
let currentRole = "";
let isDeleting = false;

const role = document.getElementById("role");
const typingSpeed = 120;
const deletingSpeed = 60;
const delay = 1500; //pause after full word

function typeEffect() {
    currentRole = roles[index];
    role.textContent = currentRole.substring(0, charIndex) + "|";

    if(!isDeleting && charIndex < currentRole.length) {
        charIndex++;
        setTimeout(typeEffect, typingSpeed);
    }
    else if(isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, deletingSpeed);
    }
    else {
        if(!isDeleting) {
            isDeleting = true;
            setTimeout(typeEffect, delay);
        }
        else {
            isDeleting = false;
            index = (index + 1) % roles.length;
            setTimeout(typeEffect, 300); 
        }
    }
}
typeEffect();

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay=0){
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);          
  showElement(mainIcon, 800);         
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx*400);  
  });
  showElement(designerText, 2800);    

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.style.display='none', 500);
    mainPage.classList.add("visible");
  }, 4000);
});