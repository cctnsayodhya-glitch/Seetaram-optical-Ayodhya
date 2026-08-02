/* ==========================================================================
   AYODHYA SHREE RAM TEMPLE & TOURIST GUIDE WEBSITE (DM CONSULTANCY)
   Interactive JavaScript Core
   ========================================================================== */

// Place details database for dynamic modal popups
const AYODHYA_PLACES_DATA = {
  ram_mandir: {
    title: "Shree Ram Janmabhoomi Mandir",
    tag: "Major Temple",
    timing: "6:00 AM - 12:00 PM | 4:00 PM - 10:00 PM",
    aartiTimings: "Shringar Aarti: 6:30 AM | Bhog Aarti: 12:00 PM | Sandhya Aarti: 7:30 PM",
    entryFee: "Free Entry (VIP Pass Guidance Available)",
    description: "The grand sacred abode of Lord Ram Lalla. Built in traditional Nagara style architecture with carved pink sandstone without steel or iron. Spread over 70 acres, it is the heart of Ayodhya's spiritual revival.",
    guidelines: [
      "Mobile phones, cameras, leather items, and metallic objects are strict prohibited inside.",
      "Free locker facilities are available at Sugriva Kila entry point.",
      "Wheelchair support available for senior citizens & differently-abled devotees.",
      "Rahul Yadav assists in smooth entry and Sugriva Kila route coordination."
    ]
  },
  hanuman_garhi: {
    title: "Hanuman Garhi Temple",
    tag: "Major Temple",
    timing: "5:00 AM - 11:00 PM",
    aartiTimings: "Morning Aarti: 5:30 AM | Evening Aarti: 8:00 PM",
    entryFee: "Free Entry",
    description: "A 10th-century temple fortress perched atop a hill accessible by 76 stairs. Legend says Lord Hanuman resides here to protect Ayodhya. Devotees visit Hanuman Garhi first before paying respects to Lord Ram.",
    guidelines: [
      "Besan ke Laddoo is offered as sacred Bhog.",
      "Early morning visits have shorter waiting queues.",
      "Rahul Yadav provides special stair assistance for elderly pilgrims."
    ]
  },
  kanak_bhawan: {
    title: "Kanak Bhawan (Golden Palace)",
    tag: "Historical Palace",
    timing: "8:00 AM - 11:30 AM | 4:30 PM - 9:00 PM",
    aartiTimings: "Morning Aarti: 8:30 AM | Sandhya Aarti: 7:00 PM",
    entryFee: "Free Entry",
    description: "Gifted to Devi Sita by Queen Kaikeyi right after her marriage to Lord Ram. Houses exquisite idols of Lord Ram and Sita adorned in pure gold crowns.",
    guidelines: [
      "Soothing devotional bhajans played live in the courtyard.",
      "Photography permitted in outer courtyard area only."
    ]
  },
  sarayu_aarti: {
    title: "Sarayu River & Evening Maha Aarti",
    tag: "Holy Ghat",
    timing: "Open 24 Hours | Evening Aarti at 6:30 PM",
    aartiTimings: "Grand Maha Aarti: 6:30 PM daily at Ram Ki Paidi",
    entryFee: "Free (Boat Ride ₹100 - ₹300 per person)",
    description: "The sacred river Sarayu mentioned in ancient Ramayana scriptures. Watching hundreds of lit brass lamps and hearing chanting along Ram Ki Paidi during sunset is an unforgettable divine experience.",
    guidelines: [
      "Guided wooden boat rides and motor boats available.",
      "Holy dip (Snan) facilities with separate changing rooms available.",
      "Best photo opportunities at dusk."
    ]
  },
  nageshwarnath: {
    title: "Nageshwarnath Temple",
    tag: "Major Temple",
    timing: "5:00 AM - 8:30 PM",
    aartiTimings: "Morning Aarti: 6:00 AM | Evening Aarti: 7:30 PM",
    entryFee: "Free Entry",
    description: "Established by Lord Ram's son Prince Kush. Dedicated to Lord Shiva, this temple survived even when Ayodhya was covered in dense forests during ancient times.",
    guidelines: [
      "Located adjacent to Ram Ki Paidi ghats.",
      "Grand celebrations held during Maha Shivratri."
    ]
  },
  guptar_ghat: {
    title: "Guptar Ghat (Moksha Dham)",
    tag: "Holy Ghat",
    timing: "Open 24 Hours",
    aartiTimings: "Sunset Aarti: 6:45 PM",
    entryFee: "Free Entry",
    description: "The serene holy ghat where Lord Shri Ram took Jal Samadhi and ascended to Vaikuntha Dham. Peaceful manicured gardens, newly renovated riverfront, and calm vibes.",
    guidelines: [
      "Ideal place for peaceful meditation and evening strolls.",
      "Battery-operated golf carts available along the ghat promenade."
    ]
  },
  dashrath_mahal: {
    title: "Dashrath Mahal (Bada Stan)",
    tag: "Historical Palace",
    timing: "6:00 AM - 12:00 PM | 4:00 PM - 9:00 PM",
    aartiTimings: "Sangeet Aarti: 7:00 PM",
    entryFee: "Free Entry",
    description: "The historic residence palace of King Dashrath where Lord Ram spent his early childhood alongside his three brothers Lakshman, Bharat, and Shatrughna.",
    guidelines: [
      "Intricate entryway carved with royal motifs.",
      "Located in the vibrant center of main Ayodhya market."
    ]
  },
  ram_ki_paidi: {
    title: "Ram Ki Paidi Waterfront",
    tag: "Historical Palace",
    timing: "Open 24 Hours",
    aartiTimings: "Laser Light Show: 7:15 PM (Selected Days)",
    entryFee: "Free Entry",
    description: "A series of beautifully lit ghats on the banks of Sarayu river with continuous fresh water flow. The site of world-record Deepotsav celebrations during Diwali.",
    guidelines: [
      "Stunning musical fountain and 3D light projection shows in the evening.",
      "Spacious walkway perfect for family walks."
    ]
  }
};

// Package Pricing Map (Base per person rates)
const PACKAGE_PRICES = {
  express_1day: 1200,
  heritage_2day: 2800,
  vip_aarti: 1800,
  custom_nri: 4500
};

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initPlaceFilters();
  initPriceCalculator();
  initBookingForm();
  initFAQAccordion();
});

/* --------------------------------------------------------------------------
   1. NAVIGATION & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const headerNav = document.getElementById('headerNav');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when link clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Header scroll shadow effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      headerNav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
    } else {
      headerNav.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    }
  });
}

/* --------------------------------------------------------------------------
   2. PLACES TO VISIT FILTER TABS & MODAL POPUP
   -------------------------------------------------------------------------- */
function initPlaceFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const placeCards = document.querySelectorAll('.place-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      placeCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function openPlaceModal(placeId) {
  const modalOverlay = document.getElementById('placeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  const data = AYODHYA_PLACES_DATA[placeId];
  if (!data) return;

  modalTitle.innerText = data.title;

  let guidelinesHtml = '';
  if (data.guidelines && data.guidelines.length > 0) {
    guidelinesHtml = `
      <div style="margin-top: 20px; background: var(--primary-light-saffron); padding: 16px; border-radius: var(--radius-sm); border-left: 4px solid var(--primary-saffron);">
        <h4 style="font-weight: 700; color: var(--primary-saffron); margin-bottom: 8px;"><i class="fa-solid fa-circle-info"></i> Guide Rahul Yadav's Visitor Tips:</h4>
        <ul style="padding-left: 20px; font-size: 0.9rem; color: var(--navy-slate);">
          ${data.guidelines.map(g => `<li style="margin-bottom: 6px;">${g}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  modalBody.innerHTML = `
    <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px;">
      <span class="place-tag" style="position: static;">${data.tag}</span>
      <span style="font-size: 0.85rem; color: var(--text-muted);"><i class="fa-regular fa-clock" style="color: var(--primary-saffron);"></i> ${data.timing}</span>
    </div>
    
    <p style="font-size: 1rem; color: var(--text-muted); margin-bottom: 16px;">${data.description}</p>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: var(--cream-bg); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
      <div>
        <strong style="font-size: 0.85rem; color: var(--deep-charcoal); display: block; margin-bottom: 4px;"><i class="fa-solid fa-bell" style="color: var(--sacred-gold);"></i> Aarti Timings:</strong>
        <span style="font-size: 0.85rem; color: var(--text-muted);">${data.aartiTimings}</span>
      </div>
      <div>
        <strong style="font-size: 0.85rem; color: var(--deep-charcoal); display: block; margin-bottom: 4px;"><i class="fa-solid fa-ticket" style="color: var(--primary-saffron);"></i> Entry Fee:</strong>
        <span style="font-size: 0.85rem; color: var(--text-muted);">${data.entryFee}</span>
      </div>
    </div>
    
    ${guidelinesHtml}
    
    <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: flex-end;">
      <a href="#booking" onclick="closePlaceModal(); selectPackageFromModal('${data.title}')" class="btn btn-primary" style="font-size: 0.9rem; padding: 10px 20px;">
        <i class="fa-brands fa-whatsapp"></i> Book Guided Tour for This Sight
      </a>
    </div>
  `;

  modalOverlay.classList.add('active');
}

function closePlaceModal() {
  const modalOverlay = document.getElementById('placeModal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
  }
}

function selectPackageFromModal(placeTitle) {
  const requestNotes = document.getElementById('bookingNotes');
  if (requestNotes) {
    requestNotes.value = `Hi Rahul, I am specifically interested in visiting ${placeTitle} with VIP guidance.`;
  }
}

/* --------------------------------------------------------------------------
   3. LIVE PRICE CALCULATOR
   -------------------------------------------------------------------------- */
function initPriceCalculator() {
  const calcPackage = document.getElementById('calcPackage');
  const calcPersons = document.getElementById('calcPersons');
  const calcTransport = document.getElementById('calcTransport');
  const estimatedPriceDisplay = document.getElementById('estimatedPrice');
  const calcBtn = document.getElementById('calcBookBtn');

  function calculate() {
    if (!calcPackage || !calcPersons || !estimatedPriceDisplay) return;
    const pkgKey = calcPackage.value;
    const persons = parseInt(calcPersons.value) || 1;
    const transportAddon = calcTransport && calcTransport.value === 'yes' ? 800 : 0;

    const baseRate = PACKAGE_PRICES[pkgKey] || 1200;
    const total = (baseRate * persons) + (transportAddon * (persons > 4 ? 2 : 1));

    estimatedPriceDisplay.innerText = `₹${total.toLocaleString('en-IN')}`;
  }

  if (calcPackage) calcPackage.addEventListener('change', calculate);
  if (calcPersons) calcPersons.addEventListener('input', calculate);
  if (calcTransport) calcTransport.addEventListener('change', calculate);

  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const selectedPkg = calcPackage.value;
      const personsVal = calcPersons.value;
      const transportVal = calcTransport ? calcTransport.value : 'no';

      // Sync with main booking form
      const bookingPkg = document.getElementById('bookingPackage');
      const bookingPersons = document.getElementById('bookingPersons');
      const bookingTransport = document.getElementById('bookingTransport');

      if (bookingPkg) bookingPkg.value = selectedPkg;
      if (bookingPersons) bookingPersons.value = personsVal;
      if (bookingTransport) bookingTransport.value = transportVal;

      // Scroll to booking form
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. MAIN BOOKING FORM & WHATSAPP GENERATOR
   -------------------------------------------------------------------------- */
function initBookingForm() {
  const bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookingName').value.trim();
      const phone = document.getElementById('bookingPhone').value.trim();
      const date = document.getElementById('bookingDate').value;
      const packageSelected = document.getElementById('bookingPackage').selectedOptions[0].text;
      const persons = document.getElementById('bookingPersons').value;
      const transport = document.getElementById('bookingTransport').value === 'yes' ? 'AC Transport Included' : 'No Transport';
      const notes = document.getElementById('bookingNotes').value.trim();

      if (!name || !phone || !date) {
        alert('Please fill in your Name, Phone Number, and Date of Visit.');
        return;
      }

      // Format WhatsApp Message
      const textMessage = `*NEW TOUR BOOKING INQUIRY - DM CONSULTANCY*\n` +
        `-----------------------------------------\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Date of Visit:* ${date}\n` +
        `*Selected Package:* ${packageSelected}\n` +
        `*No. of Pilgrims:* ${persons} Person(s)\n` +
        `*Transport Needed:* ${transport}\n` +
        (notes ? `*Special Request:* ${notes}\n` : '') +
        `-----------------------------------------\n` +
        `Hello Rahul Yadav ji, I want to confirm my Ayodhya tour booking online via https://www.dmconsultancy.co.in/`;

      const encodedMsg = encodeURIComponent(textMessage);
      const whatsappUrl = `https://wa.me/919451123456?text=${encodedMsg}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      // Show confirmation on page
      alert(`Thank you ${name}! Your booking request has been formatted. Opening WhatsApp to connect with Rahul Yadav instantly.`);
    });
  }
}

/* --------------------------------------------------------------------------
   5. FAQ ACCORDION TOGGLE
   -------------------------------------------------------------------------- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(i => i.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}
