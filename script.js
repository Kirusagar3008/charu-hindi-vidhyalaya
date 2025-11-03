// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Simple animation for sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Modal for quick enrollment
const modal = document.createElement('div');
modal.id = 'enrollment-modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Quick Enrollment</h2>
        <form id="enrollment-form">
            <input type="text" name="name" placeholder="Your Name" required>
            <input type="email" name="email" placeholder="Your Email" required>
            <input type="tel" name="phone" placeholder="Your Phone">
            <select name="course" required>
                <option value="">Select Course</option>
                <option value="grammar">Hindi Grammar Classes</option>
                <option value="literature">Literature Studies</option>
                <option value="exam">Exam Preparation</option>
                <option value="conversation">Conversation Skills</option>
                <option value="online">Online Hindi Classes</option>
            </select>
            <button type="submit">Enroll Now</button>
        </form>
    </div>
`;
document.body.appendChild(modal);

// Modal styles
const modalStyles = `
    #enrollment-modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }
    .modal-content {
        background-color: white;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 500px;
        border-radius: 8px;
    }
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }
    .close:hover {
        color: black;
    }
    #enrollment-form input,
    #enrollment-form select {
        width: 100%;
        padding: 0.8rem;
        margin-bottom: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }
    #enrollment-form button {
        background-color: #28a745;
        color: white;
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        width: 100%;
    }
    #enrollment-form button:hover {
        background-color: #218838;
    }
`;
const style = document.createElement('style');
style.textContent = modalStyles;
document.head.appendChild(style);

// Show modal on CTA button click (excluding review button)
document.querySelectorAll('.cta-button:not(.review-btn)').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
    });
});

// Close modal
document.querySelector('.close').addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Contact form submission (send to WhatsApp)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.querySelector('#contact-form input[name="name"]').value.trim();
    const email = document.querySelector('#contact-form input[name="email"]').value.trim();
    const phone = document.querySelector('#contact-form input[name="phone"]').value.trim();
    const message = document.querySelector('#contact-form textarea[name="message"]').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
        alert('Please fill in all required fields (Name, Email, Message).');
        return false;
    }

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Send to WhatsApp
    const whatsappMessage = `Inquiry from ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/916383804684?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Reset form
    this.reset();
});

document.getElementById('enrollment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for enrolling! We will contact you soon.');
    modal.style.display = 'none';
    this.reset();
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// FAQ accordion functionality with keyboard support
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });

    // Keyboard support
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// Modal for enroll button
const enrollModal = document.getElementById('enroll-modal');
const enrollBtn = document.getElementById('enroll-btn');
const closeBtn = document.querySelector('.close-btn');

// Open modal
enrollBtn.addEventListener('click', () => {
    enrollModal.style.display = 'block';
});

// Close modal
closeBtn.addEventListener('click', () => {
    enrollModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === enrollModal) {
        enrollModal.style.display = 'none';
    }
});

// Enroll form submission (send to WhatsApp and Email)
document.getElementById('enroll-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.querySelector('#enroll-form input[name="name"]').value.trim();
    const email = document.querySelector('#enroll-form input[name="email"]').value.trim();
    const phone = document.querySelector('#enroll-form input[name="phone"]').value.trim();
    const course = document.querySelector('#enroll-form select[name="course"]').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !course) {
        alert('Please fill in all required fields (Name, Email, Course).');
        return false;
    }

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Send to WhatsApp
    const whatsappMessage = `Enrollment Request\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${course}`;
    const whatsappUrl = `https://wa.me/916383804684?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Send to Email (using mailto)
    const emailSubject = 'New Enrollment Request';
    const emailBody = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${course}`;
    const emailUrl = `mailto:charuhindividhyalaya@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(emailUrl, '_blank');

    alert('Thank you for enrolling! We will contact you soon.');
    enrollModal.style.display = 'none';
    this.reset();
});

// Side Banner Popup
const sideBanner = document.getElementById('side-banner');
const sideCloseBtn = document.querySelector('.side-close-btn');
const sideEnrollBtn = document.getElementById('side-enroll-btn');
const sideFormContainer = document.getElementById('side-form-container');

// Show side banner after 5 seconds
setTimeout(() => {
    sideBanner.classList.add('show');
}, 5000);

// Close side banner
sideCloseBtn.addEventListener('click', () => {
    sideBanner.classList.remove('show');
    sideFormContainer.style.display = 'none';
});

// Show form on enroll button click
sideEnrollBtn.addEventListener('click', () => {
    sideFormContainer.style.display = 'block';
});

// Side enroll form submission (send to WhatsApp and Email)
document.getElementById('side-enroll-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.querySelector('#side-enroll-form input[name="name"]').value.trim();
    const email = document.querySelector('#side-enroll-form input[name="email"]').value.trim();
    const phone = document.querySelector('#side-enroll-form input[name="phone"]').value.trim();
    const course = document.querySelector('#side-enroll-form select[name="course"]').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !course) {
        alert('Please fill in all required fields (Name, Email, Course).');
        return false;
    }

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Send to WhatsApp
    const whatsappMessage = `Summer Discount Enrollment\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${course}`;
    const whatsappUrl = `https://wa.me/916383804684?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Send to Email (using mailto)
    const emailSubject = 'New Summer Discount Enrollment Request';
    const emailBody = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${course}`;
    const emailUrl = `mailto:charuhindividhyalaya@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(emailUrl, '_blank');

    alert('Thank you for enrolling! We will contact you soon.');
    sideBanner.classList.remove('show');
    this.reset();
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
}

// Auto-slide testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// You can add more interactive features here as needed
