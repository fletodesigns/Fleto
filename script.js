// script.js

// Scroll Reveal Animation
const revealSections = document.querySelectorAll("section");

const revealOnScroll = () => {
  revealSections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight / 1.3;
    if (sectionTop < triggerPoint) {
      section.classList.add("reveal");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);

document.addEventListener("DOMContentLoaded", revealOnScroll);

// Smooth Scroll
const smoothScrollLinks = document.querySelectorAll("a[href^='#']");

smoothScrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Dynamic Stats Counter
const statElements = document.querySelectorAll(".stat h3");

const animateStats = () => {
  statElements.forEach((stat) => {
    const updateCount = () => {
      const target = +stat.getAttribute("data-target");
      const count = +stat.innerText;
      const increment = target / 100;

      if (count < target) {
        stat.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        stat.innerText = target;
      }
    };
    updateCount();
  });
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statElements.forEach((stat) => {
  statsObserver.observe(stat);
});

// Navbar Active State on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const setActiveNavLink = () => {
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const pageYOffset = window.pageYOffset;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(section.id)) {
          link.classList.add("active");
        }
      });
    }
  });
};

window.addEventListener("scroll", setActiveNavLink);

// Contact Form Validation
const contactForm = document.querySelector(".contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const errorMessages = document.querySelector(".error-messages");

const validateForm = (e) => {
  e.preventDefault();
  errorMessages.innerHTML = "";
  let isValid = true;

  if (nameInput.value.trim() === "") {
    errorMessages.innerHTML += "<p>Please enter your name.</p>";
    isValid = false;
  }
  if (!emailInput.value.includes("@") || emailInput.value.trim() === "") {
    errorMessages.innerHTML += "<p>Please enter a valid email.</p>";
    isValid = false;
  }
  if (messageInput.value.trim().length < 10) {
    errorMessages.innerHTML += "<p>Your message must be at least 10 characters.</p>";
    isValid = false;
  }

  if (isValid) {
    alert("Thank you for your message!");
    contactForm.reset();
  }
};

contactForm.addEventListener("submit", validateForm);

// Products Hover Animation
const productCards = document.querySelectorAll(".product");

productCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.05) rotate(1deg)";
    card.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.15)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1) rotate(0deg)";
    card.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
  });
});

// Back-to-Top Button
const backToTop = document.createElement("button");
backToTop.innerText = "⬆ Back to Top";
backToTop.classList.add("back-to-top");
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background: #36ffbf;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
`;

const toggleBackToTop = () => {
  if (window.pageYOffset > 300) {
    backToTop.style.opacity = "1";
    backToTop.style.visibility = "visible";
  } else {
    backToTop.style.opacity = "0";
    backToTop.style.visibility = "hidden";
  }
};

window.addEventListener("scroll", toggleBackToTop);

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
