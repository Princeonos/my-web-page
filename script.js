function setupHamburgerMenu(hamburgerSelector, navMenuSelector) {
    const hamburger = document.querySelector(hamburgerSelector);
    const navMenu = document.querySelector(navMenuSelector);

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('visible');
    });
}

// Example usage:
// setupHamburgerMenu('#hamburger', '#navMenu');

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Filter feature for projects section
document.addEventListener('DOMContentLoaded', function () {
    // Filter logic
    const filterInput = document.getElementById('project-filter');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterInput && projectCards.length) {
        filterInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            projectCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }

    // Lightbox effect for project images
    const images = document.querySelectorAll('.project-card img');
    if (images.length) {
        // Create lightbox elements
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.style.position = 'fixed';
        lightboxOverlay.style.top = 0;
        lightboxOverlay.style.left = 0;
        lightboxOverlay.style.width = '100vw';
        lightboxOverlay.style.height = '100vh';
        lightboxOverlay.style.background = 'rgba(0,0,0,0.8)';
        lightboxOverlay.style.display = 'flex';
        lightboxOverlay.style.alignItems = 'center';
        lightboxOverlay.style.justifyContent = 'center';
        lightboxOverlay.style.zIndex = 9999;
        lightboxOverlay.style.visibility = 'hidden';

        const lightboxImg = document.createElement('img');
        lightboxImg.style.maxWidth = '90vw';
        lightboxImg.style.maxHeight = '90vh';
        lightboxImg.style.borderRadius = '8px';
        lightboxOverlay.appendChild(lightboxImg);

        document.body.appendChild(lightboxOverlay);

        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function () {
                lightboxImg.src = this.src;
                lightboxOverlay.style.visibility = 'visible';
            });
        });

        lightboxOverlay.addEventListener('click', function () {
            lightboxOverlay.style.visibility = 'hidden';
            lightboxImg.src = '';
        });
    }
});

// Contact form validation with real-time feedback
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        const name = document.getElementById('contact-name');
        const email = document.getElementById('contact-email');
        const message = document.getElementById('contact-message');

        // Create feedback elements
        function createFeedbackEl(input) {
            let el = input.nextElementSibling;
            if (!el || !el.classList.contains('feedback')) {
                el = document.createElement('div');
                el.className = 'feedback';
                el.style.color = 'red';
                el.style.fontSize = '0.95em';
                el.style.marginTop = '-10px';
                el.style.marginBottom = '10px';
                input.parentNode.insertBefore(el, input.nextSibling);
            }
            return el;
        }

        // Real-time validation
        name.addEventListener('input', function () {
            const feedback = createFeedbackEl(name);
            feedback.textContent = name.value.trim() ? '' : 'Name is required.';
        });

        email.addEventListener('input', function () {
            const feedback = createFeedbackEl(email);
            if (!email.value.trim()) {
                feedback.textContent = 'Email is required.';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                feedback.textContent = 'Enter a valid email address.';
            } else {
                feedback.textContent = '';
            }
        });

        message.addEventListener('input', function () {
            const feedback = createFeedbackEl(message);
            feedback.textContent = message.value.trim() ? '' : 'Message is required.';
        });

        contactForm.addEventListener('submit', function (e) {
            let valid = true;

            // Name validation
            const nameFeedback = createFeedbackEl(name);
            if (!name.value.trim()) {
                nameFeedback.textContent = 'Name is required.';
                valid = false;
            } else {
                nameFeedback.textContent = '';
            }

            // Email validation
            const emailFeedback = createFeedbackEl(email);
            if (!email.value.trim()) {
                emailFeedback.textContent = 'Email is required.';
                valid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                emailFeedback.textContent = 'Enter a valid email address.';
                valid = false;
            } else {
                emailFeedback.textContent = '';
            }

            // Message validation
            const messageFeedback = createFeedbackEl(message);
            if (!message.value.trim()) {
                messageFeedback.textContent = 'Message is required.';
                valid = false;
            } else {
                messageFeedback.textContent = '';
            }

            if (!valid) {
                e.preventDefault();
            }
        });
    }
});
