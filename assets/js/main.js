// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Search Toggle
const searchBtn = document.querySelector('.search-btn');
const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
        searchInput.focus();
    }
});

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target) && e.target !== searchBtn) {
        searchContainer.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// Sticky navigation on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('sticky', window.scrollY > 0);
});

// Video hero play/pause control
const heroVideo = document.getElementById('hero-video');
const heroSection = document.querySelector('.hero');

// Try to autoplay video (with fallback for mobile)
function attemptAutoplay() {
    const promise = heroVideo.play();
    
    if (promise !== undefined) {
        promise.catch(error => {
            // Autoplay failed, show fallback image
            heroVideo.style.display = 'none';
            heroSection.style.backgroundImage = 'url(images/hero-bg.jpg)';
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
        });
    }
}

// Attempt autoplay when page loads
document.addEventListener('DOMContentLoaded', attemptAutoplay);

// Also try when user interacts with page (required for some mobile browsers)
document.addEventListener('click', attemptAutoplay, { once: true });

// Initialize animations when elements come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in, .slide-up');
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight / 1.2;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < triggerPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Hero content animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(-50%)';
        }, 300);
    }
    
    // Product card animations
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Feature card animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Countdown timer for flash deals
const countdown = () => {
    // Set deadline to 7 days from now
    const countDate = new Date();
    countDate.setDate(countDate.getDate() + 7);
    
    const now = new Date().getTime();
    const gap = countDate - now;
    
    // Time calculations
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    // Calculate remaining time
    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);
    
    // Update HTML
    document.getElementById('days').innerText = textDay < 10 ? '0' + textDay : textDay;
    document.getElementById('hours').innerText = textHour < 10 ? '0' + textHour : textHour;
    document.getElementById('minutes').innerText = textMinute < 10 ? '0' + textMinute : textMinute;
    document.getElementById('seconds').innerText = textSecond < 10 ? '0' + textSecond : textSecond;
};

// Run countdown every second
setInterval(countdown, 1000);
countdown(); // Initial call

// Filter tabs for new arrivals
const filterTabs = document.querySelectorAll('.filter-btn');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // In a real app, you would filter products here
        console.log(`Filtering by: ${tab.textContent}`);
    });
});

// Loading overlay
const loadingOverlay = document.getElementById('loadingOverlay');

function showLoading() {
    loadingOverlay.style.display = 'flex';
    document.body.classList.add('no-scroll');
}

function hideLoading() {
    loadingOverlay.style.display = 'none';
    document.body.classList.remove('no-scroll');
}

// Simulate loading for demonstration
window.addEventListener('load', () => {
    setTimeout(hideLoading, 1500);
});

// Get Started button
const getStartedBtn = document.querySelector('.btn-primary');

if (getStartedBtn && getStartedBtn.textContent.includes('Get Started')) {
    getStartedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showLoading();
        
        // Simulate loading
        setTimeout(() => {
            hideLoading();
            window.location.href = '#new-arrivals';
        }, 1000);
    });
}

// Subscribe form
const subscribeForm = document.querySelector('.subscribe-form');
const subscribeSuccess = document.querySelector('.subscribe-success');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = subscribeForm.querySelector('input[type="email"]');
        
        if (emailInput.value) {
            // In a real app, you would send this to your backend
            console.log('Subscribed with email:', emailInput.value);
            
            // Show success message
            subscribeForm.style.display = 'none';
            subscribeSuccess.style.display = 'flex';
            
            // Reset after 3 seconds
            setTimeout(() => {
                subscribeForm.style.display = 'flex';
                subscribeSuccess.style.display = 'none';
                emailInput.value = '';
            }, 3000);
        }
    });
}