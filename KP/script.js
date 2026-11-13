/* ===========================
   Jim Corbett National Park
   Interactive JavaScript
   =========================== */

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// ===========================
// Mobile Navigation Toggle
// ===========================
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===========================
// Scroll Reveal Animations
// ===========================
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const windowHeight = window.innerHeight;

  reveals.forEach((el, index) => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      // Stagger animations for items in grids
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(child => 
          child.classList.contains('reveal') || 
          child.classList.contains('reveal-left') || 
          child.classList.contains('reveal-right')
        );
        const siblingIndex = siblings.indexOf(el);
        if (siblingIndex > 0) {
          el.style.transitionDelay = `${siblingIndex * 0.1}s`;
        }
      }
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===========================
// Counter Animation (Hero Stats)
// ===========================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easedProgress * target);
      
      counter.textContent = currentValue.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
        // Add "+" suffix for species count
        if (target === 650) {
          counter.textContent = target + '+';
        }
        if (target === 230) {
          counter.textContent = target + '+';
        }
      }
    }
    
    requestAnimationFrame(updateCounter);
  });
}

// Trigger counter animation when hero is in view
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  heroObserver.observe(heroStats);
}

// ===========================
// Active Nav Link Highlight
// ===========================
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 200;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (navLink && scrollPos >= top && scrollPos < top + height) {
      document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
      navLink.style.color = 'var(--accent)';
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===========================
// Smooth Scroll for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = targetEl.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===========================
// Modal System
// ===========================
let currentBookingType = '';
let currentBookingPrice = '';

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});

// ===========================
// Safari Booking
// ===========================
function openBookingModal(activity, price) {
  currentBookingType = activity;
  currentBookingPrice = price;
  
  document.getElementById('bookingModalTitle').textContent = `Book ${activity}`;
  document.getElementById('bookingModalSubtitle').textContent = `${price}/person — Fill in your details to reserve your spot`;
  
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('safariDate').setAttribute('min', today);
  
  // Reset form
  document.getElementById('safariBookingForm').reset();
  
  openModal('bookingModal');
}

async function handleSafariBooking(e) {
    e.preventDefault();

    const formData = {
        activity: currentBookingType,
        price: currentBookingPrice,
        name: document.getElementById('safariName').value,
        email: document.getElementById('safariEmail').value,
        phone: document.getElementById('safariPhone').value,
        date: document.getElementById('safariDate').value,
        guests: document.getElementById('safariGuests').value,
        zone: document.getElementById('safariZone').value
    };

    try {
        const response = await fetch("http://localhost:5000/api/safari-booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            closeModal('bookingModal');
            showConfirmation(formData, 'safari');
        } else {
            alert("Booking failed.");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Could not connect to the backend.");
    }

}

// ===========================
// Hotel Booking
// ===========================
let currentHotelName = '';
let currentHotelPrice = '';

function openHotelModal(hotel, price) {
  currentHotelName = hotel;
  currentHotelPrice = price;
  
  document.getElementById('hotelModalTitle').textContent = `Book ${hotel}`;
  document.getElementById('hotelModalSubtitle').textContent = `${price}/night — Reserve your stay`;
  
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('hotelCheckin').setAttribute('min', today);
  document.getElementById('hotelCheckout').setAttribute('min', today);
  
  // Reset form
  document.getElementById('hotelBookingForm').reset();
  
  openModal('hotelModal');
}

// Ensure checkout is after checkin
document.getElementById('hotelCheckin')?.addEventListener('change', function() {
  const checkout = document.getElementById('hotelCheckout');
  checkout.setAttribute('min', this.value);
  if (checkout.value && checkout.value <= this.value) {
    checkout.value = '';
  }
});

function handleHotelBooking(e) {
    e.preventDefault();

    const formData = {
        hotel: currentHotelName,
        price: currentHotelPrice,
        name: document.getElementById('hotelGuestName').value,
        email: document.getElementById('hotelEmail').value,
        phone: document.getElementById('hotelPhone').value,
        checkin: document.getElementById('hotelCheckin').value,
        checkout: document.getElementById('hotelCheckout').value,
        guests: document.getElementById('hotelGuests').value,
        room: document.getElementById('hotelRoom').value
    };

    fetch("http://localhost:5000/api/hotel-booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Backend response:", data);

        if (data.success) {
            closeModal('hotelModal');
            showConfirmation(formData, 'hotel');
        } else {
            alert("Hotel booking failed.");
        }
    })
    .catch(error => {
        console.error("Backend error:", error);
        alert("Not connected with backend.");
    });
}

// ===========================
// Taxi Booking
// ===========================
function handleTaxiBooking(e) {
    e.preventDefault();

    const formData = {
        pickup: document.getElementById('taxiPickup').value,
        drop: document.getElementById('taxiDrop').value,
        date: document.getElementById('taxiDate').value,
        time: document.getElementById('taxiTime').value,
        vehicle: document.getElementById('taxiVehicle').value,
        passengers: document.getElementById('taxiPassengers').value,
        name: document.getElementById('taxiName').value,
        phone: document.getElementById('taxiPhone').value
    };

    fetch("http://localhost:5000/api/taxi-booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Backend response:", data);

        if (data.success) {
            showConfirmation(formData, 'taxi');
            document.getElementById('taxiForm').reset();
        } else {
            alert("Taxi booking failed.");
        }
    })
    .catch(error => {
        console.error("Backend error:", error);
        alert("Not connected with backend.");
    });
}

// ===========================
// Confirmation Modal
// ===========================
function showConfirmation(data, type) {
  const summaryEl = document.getElementById('bookingSummary');
  let summaryHTML = '';
  
  const bookingId = 'CB' + Date.now().toString().slice(-8);
  
  if (type === 'safari') {
    summaryHTML = `
      <div class="summary-row">
        <span class="label">Booking ID</span>
        <span class="value">${bookingId}</span>
      </div>
      <div class="summary-row">
        <span class="label">Activity</span>
        <span class="value">${data.activity}</span>
      </div>
      <div class="summary-row">
        <span class="label">Name</span>
        <span class="value">${data.name}</span>
      </div>
      <div class="summary-row">
        <span class="label">Date</span>
        <span class="value">${formatDate(data.date)}</span>
      </div>
      <div class="summary-row">
        <span class="label">Guests</span>
        <span class="value">${data.guests}</span>
      </div>
      <div class="summary-row">
        <span class="label">Zone</span>
        <span class="value">${data.zone}</span>
      </div>
      <div class="summary-row">
        <span class="label">Price</span>
        <span class="value" style="color: var(--accent); font-weight: 700;">${data.price} × ${data.guests} = ₹${parseInt(data.price.replace(/[₹,]/g, '')) * parseInt(data.guests)}</span>
      </div>
    `;
  } else if (type === 'hotel') {
    const nights = calculateNights(data.checkin, data.checkout);
    summaryHTML = `
      <div class="summary-row">
        <span class="label">Booking ID</span>
        <span class="value">${bookingId}</span>
      </div>
      <div class="summary-row">
        <span class="label">Hotel</span>
        <span class="value">${data.hotel}</span>
      </div>
      <div class="summary-row">
        <span class="label">Guest</span>
        <span class="value">${data.name}</span>
      </div>
      <div class="summary-row">
        <span class="label">Check-in</span>
        <span class="value">${formatDate(data.checkin)}</span>
      </div>
      <div class="summary-row">
        <span class="label">Check-out</span>
        <span class="value">${formatDate(data.checkout)}</span>
      </div>
      <div class="summary-row">
        <span class="label">Room Type</span>
        <span class="value">${data.room}</span>
      </div>
      <div class="summary-row">
        <span class="label">Duration</span>
        <span class="value">${nights} night${nights > 1 ? 's' : ''}</span>
      </div>
      <div class="summary-row">
        <span class="label">Estimated Total</span>
        <span class="value" style="color: var(--accent); font-weight: 700;">${data.price} × ${nights} = ₹${parseInt(data.price.replace(/[₹,]/g, '')) * nights}</span>
      </div>
    `;
  } else if (type === 'taxi') {
    summaryHTML = `
      <div class="summary-row">
        <span class="label">Booking ID</span>
        <span class="value">${bookingId}</span>
      </div>
      <div class="summary-row">
        <span class="label">Route</span>
        <span class="value">${data.pickup} → ${data.drop}</span>
      </div>
      <div class="summary-row">
        <span class="label">Passenger</span>
        <span class="value">${data.name}</span>
      </div>
      <div class="summary-row">
        <span class="label">Date & Time</span>
        <span class="value">${formatDate(data.date)} at ${data.time}</span>
      </div>
      <div class="summary-row">
        <span class="label">Vehicle</span>
        <span class="value">${data.vehicle}</span>
      </div>
      <div class="summary-row">
        <span class="label">Passengers</span>
        <span class="value">${data.passengers}</span>
      </div>
    `;
  }
  
  summaryEl.innerHTML = summaryHTML;
  openModal('confirmationModal');
}

// ===========================
// Contact Form
// ===========================
function handleContactForm(e) {
  e.preventDefault();
  
  const data = {
    name: document.getElementById('contactName').value,
    email: document.getElementById('contactEmail').value,
    subject: document.getElementById('contactSubject').value,
    message: document.getElementById('contactMessage').value
  };
  
  // Show confirmation
  const summaryEl = document.getElementById('bookingSummary');
  summaryEl.innerHTML = `
    <div class="summary-row">
      <span class="label">Name</span>
      <span class="value">${data.name}</span>
    </div>
    <div class="summary-row">
      <span class="label">Email</span>
      <span class="value">${data.email}</span>
    </div>
    <div class="summary-row">
      <span class="label">Subject</span>
      <span class="value">${data.subject || 'General Inquiry'}</span>
    </div>
  `;
  
  document.querySelector('#confirmationModal .confirmation-content h3').textContent = 'Message Sent!';
  document.querySelector('#confirmationModal .confirmation-content p').textContent = 
    "Thank you for reaching out! We'll get back to you within 24 hours.";
  
  openModal('confirmationModal');
  document.getElementById('contactForm').reset();
}

// ===========================
// Newsletter
// ===========================
function handleNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }
  
  const summaryEl = document.getElementById('bookingSummary');
  summaryEl.innerHTML = `
    <div class="summary-row">
      <span class="label">Email</span>
      <span class="value">${email}</span>
    </div>
  `;
  
  document.querySelector('#confirmationModal .confirmation-content h3').textContent = 'Subscribed!';
  document.querySelector('#confirmationModal .confirmation-content p').textContent = 
    "You're now subscribed to our newsletter. Stay tuned for wildlife updates and travel deals!";
  
  openModal('confirmationModal');
  document.getElementById('newsletterEmail').value = '';
}

// ===========================
// Utility Functions
// ===========================
function formatDate(dateStr) {
  if (!dateStr) return '';
  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-IN', options);
}

function calculateNights(checkin, checkout) {
  if (!checkin || !checkout) return 1;
  const diff = new Date(checkout) - new Date(checkin);
  const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 1;
}

// ===========================
// Set min date for taxi form
// ===========================
window.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  const taxiDate = document.getElementById('taxiDate');
  if (taxiDate) {
    taxiDate.setAttribute('min', today);
  }
});

// ===========================
// Parallax Effect for Hero
// ===========================
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg img');
  if (hero) {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
      hero.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
    }
  }
});

// ===========================
// Gallery Item Click (lightbox-like zoom)
// ===========================
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', function() {
    this.classList.toggle('expanded');
  });
});
