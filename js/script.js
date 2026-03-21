/**
 * Gamers Lounge Foundation (GLF) - Interactive JavaScript
 * Handles navigation, slideshow, FAQ, animations, and more
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initHeroRotator();
    initSlideshow();
    initFAQ();
    initCounters();
    initSmoothScroll();
    initFormValidation();
    initRandomGallery();
    initLightboxControls();
});

/**
 * Hero image: random order on each page load, change every 5 seconds
 */
const HERO_IMAGES = [
    { src: 'Asset/IMG_7116.jpg', alt: 'GLF community impact' },
    { src: 'Asset/IMG_7136.jpg', alt: 'GLF community outreach' },
    { src: 'Asset/IMG_7145.jpg', alt: 'GLF education initiative' },
    { src: 'Asset/IMG_7156.jpg', alt: 'GLF disaster relief' },
    { src: 'Asset/IMG_7162.jpg', alt: 'GLF volunteers' },
    { src: 'Asset/IMG_7176.jpg', alt: 'GLF healthcare access' },
    { src: 'Asset/IMG_7186.jpg', alt: 'GLF education campaign' },
    { src: 'Asset/IMG_7195.jpg', alt: 'GLF relief efforts' },
    { src: 'Asset/IMG_7204.jpg', alt: 'GLF healthcare program' },
    { src: 'Asset/IMG_7222.jpg', alt: 'GLF scholarship support' },
    { src: 'Asset/IMG_7232.jpg', alt: 'GLF community leader' },
    { src: 'Asset/IMG_7247.jpg', alt: 'GLF education support' },
    { src: 'Asset/IMG_7260.jpg', alt: 'GLF relief mission' },
    { src: 'Asset/IMG_7270.jpg', alt: 'GLF education programs' },
    { src: 'Asset/IMG_7280.jpg', alt: 'GLF community development' },
    { src: 'Asset/IMG_7290.jpg', alt: 'GLF healthcare outreach' },
    { src: 'Asset/IMG_7102.jpg', alt: 'GLF outreach' },
    { src: 'Asset/IMG_7120.jpg', alt: 'GLF community event' },
    { src: 'Asset/IMG_7140.jpg', alt: 'GLF charity mission' },
    { src: 'Asset/IMG_7214.jpg', alt: 'GLF youth education' }
];

function shuffleHeroImages(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function initHeroRotator() {
    const img = document.getElementById('heroImage');
    if (!img || !HERO_IMAGES.length) return;

    const sequence = shuffleHeroImages(HERO_IMAGES);
    let index = 0;

    function showHeroItem(item, withFade) {
        if (withFade) {
            img.style.opacity = '0.35';
        }
        const preload = new Image();
        preload.onload = function() {
            img.src = item.src;
            img.alt = item.alt;
            img.style.opacity = '1';
        };
        preload.onerror = function() {
            img.style.opacity = '1';
        };
        preload.src = item.src;
    }

    showHeroItem(sequence[0], false);

    const intervalMs = 5000;
    const timer = setInterval(function() {
        index = (index + 1) % sequence.length;
        showHeroItem(sequence[index], true);
    }, intervalMs);

    window.addEventListener('beforeunload', function() {
        clearInterval(timer);
    });
}

/**
 * Navbar functionality
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = navbarToggle.querySelectorAll('span');
            if (navbarMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target)) {
                navbarMenu.classList.remove('active');
                const spans = navbarToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        const navLinks = navbarMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarMenu.classList.remove('active');
                const spans = navbarToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

/**
 * Slideshow functionality
 */
function initSlideshow() {
    const track = document.getElementById('slideshowTrack');
    const dots = document.querySelectorAll('.slide-dot');
    
    if (!track || dots.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = dots.length;
    let slideInterval;
    
    // Function to go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        
        // Move track
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
            dot.setAttribute('aria-pressed', i === currentSlide ? 'true' : 'false');
        });
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }
    
    // Auto-advance slides
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000); // 5 seconds
    }
    
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopSlideshow();
            goToSlide(index);
            startSlideshow();
        });
    });
    
    // Pause on hover
    track.addEventListener('mouseenter', stopSlideshow);
    track.addEventListener('mouseleave', startSlideshow);
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopSlideshow();
    }, { passive: true });
    
    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
        
        startSlideshow();
    }, { passive: true });
    
    // Start slideshow
    startSlideshow();
}

/**
 * FAQ Accordion functionality
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * Counter animation for statistics
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (counters.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                
                const updateCounter = function() {
                    current += increment;
                    
                    if (current < target) {
                        counter.textContent = formatNumber(Math.floor(current));
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = formatNumber(target) + '+';
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form validation and handling
 */
function initFormValidation() {
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const actionAttr = contactForm.getAttribute('action');
        const usesRemoteSubmit = actionAttr && /^https?:\/\//i.test(actionAttr.trim());

        // Only intercept submit for hosted forms (e.g. Formspree). Mailto / no action uses inline handler or native behavior.
        if (usesRemoteSubmit) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                const formData = new FormData(contactForm);
                
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(async response => {
                    let data = {};
                    try {
                        const text = await response.text();
                        if (text) data = JSON.parse(text);
                    } catch (e) {
                        data = {};
                    }

                    const hasErrors = Array.isArray(data.errors) && data.errors.length > 0;
                    const failed = !response.ok || data.ok === false || data.error || hasErrors;
                    if (!failed) {
                        contactForm.style.display = 'none';
                        const formSuccess = document.getElementById('formSuccess');
                        if (formSuccess) {
                            formSuccess.style.display = 'block';
                            formSuccess.setAttribute('tabindex', '-1');
                            formSuccess.focus();
                        }
                    } else {
                        const msg = (data && (data.error || data.message)) ? String(data.error || data.message) : ('HTTP ' + response.status);
                        alert('Could not send your message: ' + msg + '\n\nIf this persists, email gamersloungefoundation@gmail.com directly and confirm your Formspree form email in the Formspree dashboard.');
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                }).catch(() => {
                    alert('There was a problem sending your message. Please try again or email gamersloungefoundation@gmail.com.');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
            });
        }
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
    
    // Donation form validation
    const donationForm = document.getElementById('donationForm');
    
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            let isValid = true;
            const requiredFields = donationForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                return;
            }
            
            // Form is valid - Paystack handles the payment
            // (Code is in donate.html)
        });
    }
}

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Check if empty for required fields
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation (optional)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Update UI
    if (isValid) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    } else {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.color = 'var(--accent-red)';
        errorElement.style.fontSize = '0.875rem';
        errorElement.textContent = errorMessage;
        field.parentElement.appendChild(errorElement);
    }
    
    return isValid;
}

/**
 * Random Gallery - Display 20 random images with slideshow and lightbox
 */
let galleryImages = [];
let currentSlideIndex = 0;
let galleryInterval = null;
let lightboxLastFocus = null;

// Make functions globally available
window.refreshGallery = function() {
    loadRandomGallery();
};

window.nextGallerySlide = function() {
    currentSlideIndex = (currentSlideIndex + 1) % galleryImages.length;
    updateGalleryDisplay();
};

window.prevGallerySlide = function() {
    currentSlideIndex = (currentSlideIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryDisplay();
};

window.openLightbox = function(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    if (!lightbox || !lightboxImg || !lightboxCaption || galleryImages.length === 0) return;
    
    lightboxLastFocus = document.activeElement;
    currentSlideIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].title + ': ' + galleryImages[index].desc;
    lightboxCaption.textContent = galleryImages[index].title + ' - ' + galleryImages[index].desc;
    lightbox.style.display = 'block';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    stopGallerySlideshow();
    
    if (closeBtn && typeof closeBtn.focus === 'function') {
        closeBtn.focus();
    }
};

window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    startGallerySlideshow();
    if (lightboxLastFocus && typeof lightboxLastFocus.focus === 'function') {
        lightboxLastFocus.focus();
    }
    lightboxLastFocus = null;
};

window.prevLightboxImage = function() {
    if (galleryImages.length === 0) return;
    currentSlideIndex = (currentSlideIndex - 1 + galleryImages.length) % galleryImages.length;
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    lightboxImg.src = galleryImages[currentSlideIndex].src;
    lightboxImg.alt = galleryImages[currentSlideIndex].title + ': ' + galleryImages[currentSlideIndex].desc;
    lightboxCaption.textContent = galleryImages[currentSlideIndex].title + ' - ' + galleryImages[currentSlideIndex].desc;
};

window.nextLightboxImage = function() {
    if (galleryImages.length === 0) return;
    currentSlideIndex = (currentSlideIndex + 1) % galleryImages.length;
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    lightboxImg.src = galleryImages[currentSlideIndex].src;
    lightboxImg.alt = galleryImages[currentSlideIndex].title + ': ' + galleryImages[currentSlideIndex].desc;
    lightboxCaption.textContent = galleryImages[currentSlideIndex].title + ' - ' + galleryImages[currentSlideIndex].desc;
};

function initLightboxControls() {
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevLightboxImage);
    if (nextBtn) nextBtn.addEventListener('click', nextLightboxImage);
}

function initRandomGallery() {
    loadRandomGallery();
}

function startGallerySlideshow() {
    if (galleryInterval) clearInterval(galleryInterval);
    galleryInterval = setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % galleryImages.length;
        updateGalleryDisplay();
    }, 3000); // 3 seconds
}

function stopGallerySlideshow() {
    if (galleryInterval) {
        clearInterval(galleryInterval);
        galleryInterval = null;
    }
}

function updateGalleryDisplay() {
    const slideshow = document.getElementById('gallerySlideshow');
    const counter = document.getElementById('galleryCounter');
    const title = document.getElementById('galleryTitle');
    const thumbs = document.getElementById('galleryThumbs');
    
    if (!slideshow || galleryImages.length === 0) return;
    
    // Update main image
    slideshow.innerHTML = `<img src="${galleryImages[currentSlideIndex].src}" alt="${galleryImages[currentSlideIndex].title}" onclick="openLightbox(${currentSlideIndex})">`;
    
    // Update counter
    if (counter) counter.textContent = `${currentSlideIndex + 1} / ${galleryImages.length}`;
    
    // Update title
    if (title) title.textContent = galleryImages[currentSlideIndex].title;
    
    // Update thumbnails
    if (thumbs) {
        thumbs.innerHTML = '';
        galleryImages.forEach((img, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'gallery-thumb' + (index === currentSlideIndex ? ' active' : '');
            thumb.innerHTML = `<img src="${img.src}" alt="${img.title}" onclick="goToSlide(${index})">`;
            thumbs.appendChild(thumb);
        });
    }
}

window.goToSlide = function(index) {
    currentSlideIndex = index;
    updateGalleryDisplay();
    // Reset the interval when manually clicking
    startGallerySlideshow();
};

function loadRandomGallery() {
    // Stop existing slideshow
    stopGallerySlideshow();
    
    // List of all available images in the Asset folder
    const allImages = [
        { src: 'Asset/IMG_7102.jpg', title: 'Community Outreach', desc: 'Building stronger communities together' },
        { src: 'Asset/IMG_7103.jpg', title: 'Education Initiative', desc: 'Empowering through learning' },
        { src: 'Asset/IMG_7104.jpg', title: 'Healthcare Program', desc: 'Medical support for those in need' },
        { src: 'Asset/IMG_7105.jpg', title: 'Volunteer Work', desc: 'Our dedicated team in action' },
        { src: 'Asset/IMG_7108.jpg', title: 'Disaster Relief', desc: 'Emergency response efforts' },
        { src: 'Asset/IMG_7109.jpg', title: 'Youth Programs', desc: 'Inspiring the next generation' },
        { src: 'Asset/IMG_7111.jpg', title: 'Community Building', desc: 'Creating lasting change' },
        { src: 'Asset/IMG_7112.jpg', title: 'Education Support', desc: 'School supplies and resources' },
        { src: 'Asset/IMG_7113.jpg', title: 'Healthcare Access', desc: 'Medical care for all' },
        { src: 'Asset/IMG_7115.jpg', title: 'Volunteer Team', desc: 'Making a difference daily' },
        { src: 'Asset/IMG_7116.jpg', title: 'Charity Work', desc: 'Giving back to communities' },
        { src: 'Asset/IMG_7117.jpg', title: 'Outreach Program', desc: 'Reaching those in need' },
        { src: 'Asset/IMG_7119.jpg', title: 'Local Impact', desc: 'Small actions, big changes' },
        { src: 'Asset/IMG_7120.jpg', title: 'Community Event', desc: 'Bringing people together' },
        { src: 'Asset/IMG_7122.jpg', title: 'Education Drive', desc: 'Books and materials for students' },
        { src: 'Asset/IMG_7123.jpg', title: 'Medical Camp', desc: 'Free health checkups' },
        { src: 'Asset/IMG_7125.jpg', title: 'Food Distribution', desc: 'Fighting hunger' },
        { src: 'Asset/IMG_7126.jpg', title: 'School Support', desc: 'Educational resources' },
        { src: 'Asset/IMG_7128.jpg', title: 'Health Initiative', desc: 'Wellness programs' },
        { src: 'Asset/IMG_7131.jpg', title: 'Youth Education', desc: 'Learning opportunities' },
        { src: 'Asset/IMG_7133.jpg', title: 'Community Aid', desc: 'Support for families' },
        { src: 'Asset/IMG_7136.jpg', title: 'Outreach Activities', desc: 'Extending our reach' },
        { src: 'Asset/IMG_7137.jpg', title: 'Volunteer Efforts', desc: 'Hands that help' },
        { src: 'Asset/IMG_7138.jpg', title: 'Education Programs', desc: 'Knowledge for all' },
        { src: 'Asset/IMG_7140.jpg', title: 'Healthcare Outreach', desc: 'Medical support' },
        { src: 'Asset/IMG_7141.jpg', title: 'Charity Mission', desc: 'Making impact' },
        { src: 'Asset/IMG_7142.jpg', title: 'Community Service', desc: 'Serving with love' },
        { src: 'Asset/IMG_7145.jpg', title: 'Education Drive', desc: 'Books for children' },
        { src: 'Asset/IMG_7146.jpg', title: 'Relief Efforts', desc: 'Emergency assistance' },
        { src: 'Asset/IMG_7148.jpg', title: 'Youth Support', desc: 'Future leaders' },
        { src: 'Asset/IMG_7150.jpg', title: 'Health Camp', desc: 'Medical services' },
        { src: 'Asset/IMG_7155.jpg', title: 'Community Work', desc: 'Together we grow' },
        { src: 'Asset/IMG_7156.jpg', title: 'Education Initiative', desc: 'Learning opportunities' },
        { src: 'Asset/IMG_7161.jpg', title: 'Volunteer Work', desc: 'Dedication in action' },
        { src: 'Asset/IMG_7162.jpg', title: 'Charity Program', desc: 'Giving hope' },
        { src: 'Asset/IMG_7163.jpg', title: 'Outreach Program', desc: 'Reaching communities' },
        { src: 'Asset/IMG_7173.jpg', title: 'Healthcare Mission', desc: 'Medical care access' },
        { src: 'Asset/IMG_7176.jpg', title: 'Education Support', desc: 'Scholastic materials' },
        { src: 'Asset/IMG_7178.jpg', title: 'Community Impact', desc: 'Changing lives' },
        { src: 'Asset/IMG_7186.jpg', title: 'Disaster Relief', desc: 'Emergency response' },
        { src: 'Asset/IMG_7188.jpg', title: 'Youth Programs', desc: 'Empowering youth' },
        { src: 'Asset/IMG_7190.jpg', title: 'Health Services', desc: 'Medical outreach' },
        { src: 'Asset/IMG_7191.jpg', title: 'Education Drive', desc: 'School support' },
        { src: 'Asset/IMG_7195.jpg', title: 'Charity Work', desc: 'Humanitarian aid' },
        { src: 'Asset/IMG_7197.jpg', title: 'Volunteer Service', desc: 'Community service' },
        { src: 'Asset/IMG_7198.jpg', title: 'Outreach Activities', desc: 'Extending help' },
        { src: 'Asset/IMG_7199.jpg', title: 'Healthcare Program', desc: 'Medical support' },
        { src: 'Asset/IMG_7201.jpg', title: 'Education Initiative', desc: 'Learning resources' },
        { src: 'Asset/IMG_7202.jpg', title: 'Community Building', desc: 'Together stronger' },
        { src: 'Asset/IMG_7203.jpg', title: 'Relief Mission', desc: 'Disaster support' },
        { src: 'Asset/IMG_7204.jpg', title: 'Youth Support', desc: 'Next generation' },
        { src: 'Asset/IMG_7205.jpg', title: 'Health Camp', desc: 'Free screenings' },
        { src: 'Asset/IMG_7206.jpg', title: 'Charity Event', desc: 'Fundraising activities' },
        { src: 'Asset/IMG_7208.jpg', title: 'Volunteer Team', desc: 'Helping hands' },
        { src: 'Asset/IMG_7210.jpg', title: 'Education Program', desc: 'Knowledge access' },
        { src: 'Asset/IMG_7211.jpg', title: 'Community Aid', desc: 'Local support' },
        { src: 'Asset/IMG_7212.jpg', title: 'Healthcare Outreach', desc: 'Medical missions' },
        { src: 'Asset/IMG_7213.jpg', title: 'Disaster Response', desc: 'Emergency aid' },
        { src: 'Asset/IMG_7214.jpg', title: 'Youth Education', desc: 'Learning programs' },
        { src: 'Asset/IMG_7215.jpg', title: 'Charity Mission', desc: 'Giving back' },
        { src: 'Asset/IMG_7216.jpg', title: 'Volunteer Work', desc: 'Service with love' },
        { src: 'Asset/IMG_7220.jpg', title: 'Community Service', desc: 'Making impact' },
        { src: 'Asset/IMG_7222.jpg', title: 'Education Support', desc: 'Student assistance' },
        { src: 'Asset/IMG_7223.jpg', title: 'Healthcare Access', desc: 'Medical care' },
        { src: 'Asset/IMG_7226.jpg', title: 'Outreach Program', desc: 'Community reach' },
        { src: 'Asset/IMG_7229.jpg', title: 'Relief Efforts', desc: 'Aid distribution' },
        { src: 'Asset/IMG_7230.jpg', title: 'Youth Programs', desc: 'Youth empowerment' },
        { src: 'Asset/IMG_7231.jpg', title: 'Health Initiative', desc: 'Wellness support' },
        { src: 'Asset/IMG_7232.jpg', title: 'Education Drive', desc: 'School supplies' },
        { src: 'Asset/IMG_7233.jpg', title: 'Charity Work', desc: 'Humanitarian work' },
        { src: 'Asset/IMG_7234.jpg', title: 'Volunteer Service', desc: 'Community help' },
        { src: 'Asset/IMG_7235.jpg', title: 'Community Building', desc: 'Together we rise' },
        { src: 'Asset/IMG_7236.jpg', title: 'Healthcare Mission', desc: 'Medical care' },
        { src: 'Asset/IMG_7247.jpg', title: 'Education Initiative', desc: 'Learning support' },
        { src: 'Asset/IMG_7249.jpg', title: 'Disaster Relief', desc: 'Emergency help' },
        { src: 'Asset/IMG_7250.jpg', title: 'Youth Support', desc: 'Future builders' },
        { src: 'Asset/IMG_7251.jpg', title: 'Health Programs', desc: 'Medical services' },
        { src: 'Asset/IMG_7253.jpg', title: 'Charity Event', desc: 'Fundraiser' },
        { src: 'Asset/IMG_7254.jpg', title: 'Volunteer Work', desc: 'Dedicated service' },
        { src: 'Asset/IMG_7255.jpg', title: 'Community Aid', desc: 'Local assistance' },
        { src: 'Asset/IMG_7256.jpg', title: 'Education Drive', desc: 'Scholastic aid' },
        { src: 'Asset/IMG_7258.jpg', title: 'Healthcare Outreach', desc: 'Medical missions' },
        { src: 'Asset/IMG_7260.jpg', title: 'Relief Mission', desc: 'Aid efforts' },
        { src: 'Asset/IMG_7261.jpg', title: 'Youth Programs', desc: 'Youth empowerment' },
        { src: 'Asset/IMG_7262.jpg', title: 'Community Service', desc: 'Helping others' },
        { src: 'Asset/IMG_7263.jpg', title: 'Education Support', desc: 'Student support' },
        { src: 'Asset/IMG_7264.jpg', title: 'Charity Work', desc: 'Giving assistance' },
        { src: 'Asset/IMG_7265.jpg', title: 'Volunteer Efforts', desc: 'Service dedication' },
        { src: 'Asset/IMG_7266.jpg', title: 'Health Initiative', desc: 'Wellness programs' },
        { src: 'Asset/IMG_7268.jpg', title: 'Outreach Activities', desc: 'Community outreach' },
        { src: 'Asset/IMG_7269.jpg', title: 'Disaster Response', desc: 'Emergency response' },
        { src: 'Asset/IMG_7270.jpg', title: 'Education Programs', desc: 'Learning initiatives' },
        { src: 'Asset/IMG_7271.jpg', title: 'Youth Education', desc: 'Youth learning' },
        { src: 'Asset/IMG_7272.jpg', title: 'Community Building', desc: 'Building together' },
        { src: 'Asset/IMG_7273.jpg', title: 'Healthcare Program', desc: 'Medical support' },
        { src: 'Asset/IMG_7274.jpg', title: 'Charity Mission', desc: 'Aid mission' },
        { src: 'Asset/IMG_7275.jpg', title: 'Volunteer Service', desc: 'Community service' },
        { src: 'Asset/IMG_7277.jpg', title: 'Education Initiative', desc: 'Learning support' },
        { src: 'Asset/IMG_7278.jpg', title: 'Health Camp', desc: 'Medical camp' },
        { src: 'Asset/IMG_7279.jpg', title: 'Community Aid', desc: 'Local help' },
        { src: 'Asset/IMG_7280.jpg', title: 'Relief Efforts', desc: 'Aid distribution' },
        { src: 'Asset/IMG_7282.jpg', title: 'Youth Support', desc: 'Youth assistance' },
        { src: 'Asset/IMG_7290.jpg', title: 'Healthcare Access', desc: 'Medical access' }
    ];
    
    // Shuffle and pick 20 random images (Fisher–Yates)
    const shuffled = [...allImages];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    galleryImages = shuffled.slice(0, 20);
    currentSlideIndex = 0;
    
    // Update display
    updateGalleryDisplay();
    
    // Start slideshow (auto-advance every 3 seconds)
    startGallerySlideshow();
}

// Close lightbox when clicking outside the image
document.addEventListener('click', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || window.getComputedStyle(lightbox).display === 'none') return;
    if (e.key === 'ArrowLeft') prevLightboxImage();
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'Escape') closeLightbox();
});

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for global use
window.GLF = {
    debounce,
    throttle,
    formatNumber
};
