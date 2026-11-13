# Jim Corbett National Park — All-in-One Wildlife Tourism Website

Build a stunning, premium single-page website for **Jim Corbett National Park** (Uttarakhand, India) that serves as a one-stop destination for visitors — combining park information, activity/safari ticket booking, hotel reservations, and taxi services.

## Tech Stack

- **Pure HTML + CSS + JavaScript** (no frameworks)
- **Google Fonts** (Outfit + Inter) for premium typography
- **CSS Variables** for a cohesive dark/earth-tone color palette inspired by the jungle
- **Smooth scroll navigation** with a sticky header
- **Generated images** for hero, wildlife, and activities sections

---

## Proposed Website Sections

### 1. 🏠 Hero Section
- Full-screen hero with a stunning wildlife/jungle background image
- Animated tagline: *"Where the Wild Roams Free"*
- Quick-action CTA buttons: **Book Safari**, **Find Hotels**, **Book a Taxi**
- Glassmorphism overlay card with park stats (est. 1936, 520 sq km, 650+ species)

### 2. 🌿 About the Park
- Rich storytelling section about India's oldest national park (est. 1936)
- Key facts: Location (Nainital, Uttarakhand), named after hunter-turned-conservationist Jim Corbett
- Safari zones info cards: **Dhikala**, **Bijrani**, **Jhirna**, **Dhela**, **Durgadevi**, **Garjiya**
- Flora & fauna highlights with micro-animation on scroll

### 3. 🐅 Wildlife Gallery
- Grid/masonry gallery showcasing: Royal Bengal Tiger, Asian Elephant, Leopard, Gharial, Sambar Deer, 600+ bird species
- Hover-zoom effects with species info overlay

### 4. 🎫 Activities & Safari Booking
Interactive cards for each activity with a "Book Now" button that opens a modal booking form:

| Activity | Price (approx.) | Duration |
|---|---|---|
| Jeep Safari (Bijrani/Jhirna) | ₹3,500/person | 3-4 hours |
| Canter Safari (Dhikala) | ₹2,500/person | 4-5 hours |
| Elephant Safari | ₹2,000/person | 1-2 hours |
| Bird Watching Tour | ₹1,500/person | 3 hours |
| Night Safari | ₹4,000/person | 2-3 hours |
| Nature Walk & Trekking | ₹1,000/person | 2-3 hours |

**Booking Modal** will collect: Name, Email, Phone, Date, Number of Guests, Zone Preference, and show a confirmation summary.

### 5. 🏨 Hotel Booking
Premium hotel cards with:
- Hotel image, name, star rating, price per night, amenities icons
- "Book Now" button opening a reservation modal

| Hotel | Category | Price/Night |
|---|---|---|
| Taj Corbett Resort & Spa | 5-Star Luxury | ₹18,000 |
| Jim Corbett Marriott Resort | 5-Star | ₹15,000 |
| Aahana The Corbett Wilderness | 5-Star Eco | ₹12,000 |
| Jim's Jungle Retreat | Boutique | ₹8,000 |
| The Riverview Retreat | Premium | ₹6,500 |
| Corbett Treat Resort | Budget | ₹3,500 |

**Hotel Booking Modal**: Check-in/Check-out dates, Guests, Room type, Contact info.

### 6. 🚕 Taxi / Transport Services
- Route cards with pricing: Ramnagar Station → Park Gate, Delhi → Corbett, Nainital → Corbett
- Vehicle options: Sedan (₹2,500), SUV (₹4,000), Tempo Traveller (₹6,500)
- Taxi booking form: Pickup location, Drop location, Date, Time, Vehicle type

### 7. 📍 Visitor Info & Tips
- Best time to visit (Nov–June, peak: Feb–May)
- What to carry checklist
- Rules & regulations
- Park timings
- Interactive Google Maps embed

### 8. 📞 Contact & Footer
- Contact form (Name, Email, Message)
- Social media links
- Address & phone
- Quick navigation links
- Newsletter subscription

---

## Design System

### Color Palette (Jungle/Earth Theme)
| Token | Color | Usage |
|---|---|---|
| `--primary` | `#2d5016` | Deep forest green |
| `--primary-light` | `#4a7c2e` | Hover states |
| `--accent` | `#d4a843` | Gold accent (CTAs, highlights) |
| `--accent-glow` | `#f0c75e` | Hover glow effects |
| `--bg-dark` | `#0a0f07` | Body background |
| `--bg-card` | `#141f0e` | Card backgrounds |
| `--bg-glass` | `rgba(20,31,14,0.7)` | Glassmorphism |
| `--text-primary` | `#e8edd4` | Main text |
| `--text-secondary` | `#a3b48a` | Muted text |
| `--danger` | `#c0392b` | Alerts |

### Typography
- **Headings**: Outfit (700, 600)
- **Body**: Inter (400, 500)

### Animations
- Scroll-triggered fade-in/slide-up for sections
- Parallax hero background
- Card hover lift + glow effects
- Smooth modal open/close transitions
- Pulsing CTA buttons
- Counter animations for park stats

---

## File Structure

```
d:\KP\
├── index.html          — Main HTML structure (all sections)
├── styles.css          — Complete CSS with design system
├── script.js           — All interactivity (nav, modals, booking, animations)
└── images/             — Generated images (hero, wildlife, activities)
```

> [!IMPORTANT]
> This is a **frontend-only demo website**. Booking forms will show confirmation modals with summaries but won't process real payments. Real integration would require a backend.

---

## Open Questions

> [!NOTE]
> **1. Payment Integration**: Should the booking forms just show a confirmation summary, or do you want placeholder payment UI (card number fields, UPI, etc.)?

> [!NOTE]
> **2. Language**: Should the website be English-only, or would you like Hindi text as well?

> [!NOTE]
> **3. Real Maps**: Should I embed a real Google Maps iframe for the park location?

---

## Verification Plan

### Manual Verification
- Open the website in a browser and verify all sections render correctly
- Test all booking modals (open, fill, submit, confirm)
- Verify responsive design on different viewport sizes
- Check all animations and hover effects
- Verify smooth scrolling navigation
