/**
 * KAHA Services - Main JavaScript File
 * Advanced interactions and animations
 */

// ============================================
// TAB SWITCHING
// ============================================

function switchTab(tabName) {
  // Hide all tab content with fade out animation
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });

  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.tab-button');
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab content
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Add active class to clicked button
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

// ============================================
// SMOOTH SCROLL
// ============================================

function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// ============================================
// ACTIVE NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Observe all cards and service boxes for scroll animations
  const animatedElements = document.querySelectorAll('.card, .service-box, .about-card, .value-box');
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Set active navigation link based on current page
  const links = document.querySelectorAll('header.navbar nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    if ((currentPage === '' || currentPage === '/') && href === 'index.html') {
      link.classList.add('active');
    } else if (href === currentPage) {
      link.classList.add('active');
    }
  });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

function contactUs() {
  window.location.href = 'contact.html';
}

function submitForm(e) {
  e.preventDefault();
  alert("Thank you! We will contact you soon.");
}

// Handle contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email');
      return;
    }
    
    // Show success message
    alert(`Thank you, ${name}! We'll get back to you soon.`);
    contactForm.reset();
  });
}

// ============================================
// HEADER EFFECTS ON SCROLL
// ============================================

let lastScrollPosition = 0;
const navbar = document.querySelector('header.navbar');

window.addEventListener('scroll', function() {
  const currentScrollPosition = window.pageYOffset;
  
  if (currentScrollPosition > 50) {
    if (navbar) {
      navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    }
  } else {
    if (navbar) {
      navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
  }
  
  lastScrollPosition = currentScrollPosition;
});

// ============================================
// BUTTON HOVER EFFECTS
// ============================================

document.querySelectorAll('.btn, .card a, button').forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

// ============================================
// CARD ANIMATION ON HOVER
// ============================================

document.querySelectorAll('.card, .service-box, .about-card, .value-box').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

// ============================================
// MOBILE MENU SUPPORT
// ============================================

function toggleMobileMenu() {
  const nav = document.querySelector('header.navbar nav');
  if (nav) {
    nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getElementByID(id) {
  return document.getElementById(id);
}

function addEventListenerToElements(selector, event, callback) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => el.addEventListener(event, callback));
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', function() {
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', function(e) {
  console.error('An error occurred:', e.error);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// ANALYTICS PLACEHOLDER
// ============================================

function trackEvent(eventName, eventData) {
  console.log(`Event: ${eventName}`, eventData);
}

document.addEventListener('DOMContentLoaded', function() {
  trackEvent('page_view', {
    page: window.location.pathname,
    title: document.title,
    timestamp: new Date().toISOString()
  });
});
