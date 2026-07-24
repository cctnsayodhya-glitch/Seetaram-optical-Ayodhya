// Helper function to safely invoke Lucide icons
function safeCreateIcons() {
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroSlider();
    initBrandTrack();
    initProductsCatalog();
    initStyleFinder();
    initAppointmentForm();
    renderBookings();
    initBillingForm();
});

/* =========================================================================
   1. NAVIGATION & VIEW SWITCHING
   ========================================================================= */
function initNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.getElementById('menuToggle');
    const navList = document.querySelector('.nav-links');
    const pageViews = document.querySelectorAll('.page-view');

    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i, svg');
            if (icon) {
                if (navList.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                safeCreateIcons();
            }
        });
    }

    // View Switching (Tab routing)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetViewId = link.getAttribute('data-view');
            if (!targetViewId) return;

            // Close mobile menu if open
            navList.classList.remove('active');
            const toggleIcon = mobileMenuToggle?.querySelector('i, svg');
            if (toggleIcon) {
                toggleIcon.setAttribute('data-lucide', 'menu');
                safeCreateIcons();
            }

            // Update active nav state
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            link.parentElement.classList.add('active');

            // Switch active view
            pageViews.forEach(view => {
                if (view.id === targetViewId) {
                    view.classList.add('active');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    view.classList.remove('active');
                }
            });

            // Special logic for catalog search triggers from header/hero
            if (targetViewId === 'catalog') {
                const categoryFilter = link.getAttribute('data-category');
                if (categoryFilter) {
                    // Pre-select category filter
                    resetFilters();
                    const checkbox = document.querySelector(`.filter-checkbox[value="${categoryFilter}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                        filterProducts();
                    }
                    link.removeAttribute('data-category'); // Clean up
                }
            }
        });
    });
}

function resetFilters() {
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
    const searchInput = document.getElementById('catalogSearch');
    if (searchInput) searchInput.value = '';
    const sortSelect = document.getElementById('catalogSort');
    if (sortSelect) sortSelect.value = 'featured';
}

/* =========================================================================
   2. HERO BANNER CAROUSEL
   ========================================================================= */
let currentSlideIndex = 0;
let slideInterval;

function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    if (!slides.length) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlideIndex = (index + slides.length) % slides.length;
        slides[currentSlideIndex].classList.add('active');
        if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active');
    }

    function startAutoPlay() {
        stopAutoPlay();
        slideInterval = setInterval(() => {
            showSlide(currentSlideIndex + 1);
        }, 6000);
    }

    function stopAutoPlay() {
        if (slideInterval) clearInterval(slideInterval);
    }

    // Prev / Next Controls
    prevBtn?.addEventListener('click', () => {
        showSlide(currentSlideIndex - 1);
        startAutoPlay();
    });

    nextBtn?.addEventListener('click', () => {
        showSlide(currentSlideIndex + 1);
        startAutoPlay();
    });

    // Dots navigation
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showSlide(idx);
            startAutoPlay();
        });
    });

    // Initialize
    showSlide(0);
    startAutoPlay();
}

/* =========================================================================
   3. BRAND TRACK CAROUSEL
   ========================================================================= */
function initBrandTrack() {
    const track = document.querySelector('.brand-track');
    if (!track || typeof BRANDS === 'undefined') return;

    // Render brands twice to create seamless loop
    const brandsList = [...BRANDS, ...BRANDS];

    track.innerHTML = brandsList.map(brand => `
    <div class="brand-item" title="${brand.desc}">${brand.logoText}</div>
  `).join('');
}

/* =========================================================================
   4. PRODUCT CATALOG MANAGEMENT
   ========================================================================= */
let activeProductsList = [];

function initProductsCatalog() {
    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('catalogSearch');
    const sortSelect = document.getElementById('catalogSort');
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');

    if (typeof PRODUCTS === 'undefined' || !productsGrid) return;

    activeProductsList = [...PRODUCTS];
    renderProductsList(activeProductsList);

    // Setup search input listener
    searchInput?.addEventListener('input', filterProducts);

    // Setup sort selector listener
    sortSelect?.addEventListener('change', filterProducts);

    // Setup checkboxes listener
    filterCheckboxes.forEach(cb => {
        cb.addEventListener('change', filterProducts);
    });

    // Set up categories from home page cards clicking
    document.querySelectorAll('[data-category-card]').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.getAttribute('data-category-card');
            // Go to catalog
            const catalogLink = document.querySelector('.nav-link[data-view="catalog"]');
            if (catalogLink) {
                catalogLink.setAttribute('data-category', cat);
                catalogLink.click();
                catalogLink.removeAttribute('data-category'); // Clean up
            }
        });
    });
}

function filterProducts() {
    if (typeof PRODUCTS === 'undefined') return;

    const searchQuery = document.getElementById('catalogSearch')?.value.toLowerCase() || '';
    const sortOption = document.getElementById('catalogSort')?.value || 'featured';

    // Categories
    const categoryCheckboxes = document.querySelectorAll('.filter-checkbox[data-type="category"]:checked');
    const selectedCategories = Array.from(categoryCheckboxes).map(cb => cb.value);

    // Genders
    const genderCheckboxes = document.querySelectorAll('.filter-checkbox[data-type="gender"]:checked');
    const selectedGenders = Array.from(genderCheckboxes).map(cb => cb.value);

    // Brands
    const brandCheckboxes = document.querySelectorAll('.filter-checkbox[data-type="brand"]:checked');
    const selectedBrands = Array.from(brandCheckboxes).map(cb => cb.value);

    let filtered = PRODUCTS.filter(prod => {
        // Search match
        const matchesSearch = prod.name.toLowerCase().includes(searchQuery) ||
            prod.brand.toLowerCase().includes(searchQuery) ||
            (prod.shape && prod.shape.toLowerCase().includes(searchQuery));

        // Category match
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(prod.category);

        // Gender match
        const matchesGender = selectedGenders.length === 0 || selectedGenders.includes(prod.gender);

        // Brand match
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(prod.brand);

        return matchesSearch && matchesCategory && matchesGender && matchesBrand;
    });

    // Sorting
    if (sortOption === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    activeProductsList = filtered;
    renderProductsList(filtered);
}

function renderProductsList(products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    if (products.length === 0) {
        productsGrid.innerHTML = `
      <div class="col-span-full text-center py-12" style="grid-column: 1 / -1;">
        <i data-lucide="package-search" style="width: 48px; height: 48px; color: var(--text-secondary); margin: 0 auto 16px;"></i>
        <h3 class="serif" style="font-size: 1.5rem; margin-bottom: 8px;">No products found</h3>
        <p style="color: var(--text-secondary);">Try adjusting your search or filtering options</p>
      </div>
    `;
        safeCreateIcons();
        return;
    }

    productsGrid.innerHTML = products.map(prod => `
    <div class="product-card" onclick="openProductModal('${prod.id}')">
      <div class="product-card-img">
        <img src="${prod.image}" alt="${prod.name}" loading="lazy">
        <button class="product-wishlist-btn" onclick="event.stopPropagation(); toggleWishlist('${prod.id}', this)">
          <i data-lucide="heart" style="width: 18px; height: 18px;"></i>
        </button>
      </div>
      <div class="product-card-info">
        <span class="product-brand">${prod.brand}</span>
        <h3 class="product-name">${prod.name}</h3>
        <div class="product-meta-row">
          <span class="product-price">₹${prod.price.toLocaleString('en-IN')}</span>
          <div class="product-rating">
            <i data-lucide="star" style="width: 14px; height: 14px; fill: var(--accent);"></i>
            <span>${prod.rating}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

    safeCreateIcons();
}

function toggleWishlist(prodId, element) {
    const icon = element.querySelector('i');
    if (icon) {
        const isFilled = icon.style.fill === 'red';
        if (isFilled) {
            icon.style.fill = 'none';
            icon.style.stroke = 'currentColor';
            element.style.background = 'rgba(18, 18, 22, 0.8)';
            element.style.color = 'var(--text-primary)';
        } else {
            icon.style.fill = 'red';
            icon.style.stroke = 'red';
            element.style.background = '#fff';
            element.style.color = '#e53e3e';
        }
    }
}

/* =========================================================================
   5. PRODUCT DETAILED MODAL
   ========================================================================= */
function openProductModal(prodId) {
    if (typeof PRODUCTS === 'undefined') return;

    const product = PRODUCTS.find(p => p.id === prodId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    if (!modal) return;

    // Setup modal content
    modal.innerHTML = `
    <div class="modal-content glass-panel">
      <div class="modal-close icon-btn" onclick="closeProductModal()">
        <i data-lucide="x" style="width: 24px; height: 24px;"></i>
      </div>
      <div class="modal-left">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="modal-right">
        <span class="modal-brand">${product.brand}</span>
        <h2 class="modal-name serif">${product.name}</h2>
        <div class="product-rating" style="font-size: 1rem; margin-top: -8px;">
          <i data-lucide="star" style="width: 16px; height: 16px; fill: var(--accent);"></i>
          <span><strong>${product.rating}</strong> (${product.reviews} reviews)</span>
        </div>
        <div class="modal-price">₹${product.price.toLocaleString('en-IN')}</div>
        <p class="modal-desc">${product.description}</p>
        
        <div class="modal-specs">
          <div class="modal-spec-item">
            <i data-lucide="check" style="width: 16px; height: 16px;"></i>
            <span><strong>Frame Material:</strong> ${product.material.toUpperCase()}</span>
          </div>
          ${product.shape ? `
          <div class="modal-spec-item">
            <i data-lucide="check" style="width: 16px; height: 16px;"></i>
            <span><strong>Shape:</strong> ${product.shape.toUpperCase()}</span>
          </div>` : ''}
          ${product.features.map(f => `
            <div class="modal-spec-item">
              <i data-lucide="shield-check" style="width: 16px; height: 16px;"></i>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; gap: 16px; margin-top: 24px;">
          <button class="btn btn-primary" style="flex: 1;" onclick="bookEyeCheckupFromModal('${product.brand} ${product.name}')">
            Book Prescription Test
          </button>
          <button class="btn btn-secondary" style="flex: 1;" onclick="addToCartPlaceholder('${product.name}')">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    safeCreateIcons();
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal on click outside or Escape key
window.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        closeProductModal();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

function addToCartPlaceholder(name) {
    alert(`"${name}" added to shopping cart! (Demo System)`);
}

function bookEyeCheckupFromModal(prodInfo) {
    closeProductModal();
    // Navigate to clinic
    const clinicTab = document.querySelector('.nav-link[data-view="clinic"]');
    if (clinicTab) {
        clinicTab.click();
        // Pre-populate service/notes
        const notesField = document.getElementById('appNotes');
        if (notesField) {
            notesField.value = `Eye checkup for lens prescription. Interested in model: ${prodInfo}`;
        }
    }
}

/* =========================================================================
   6. INTERACTIVE STYLE FINDER
   ========================================================================= */
let currentFinderStep = 0;
const finderData = {
    faceShape: '',
    style: '',
    color: ''
};

function initStyleFinder() {
    const startBtn = document.getElementById('startFinderBtn');
    const intro = document.getElementById('finderIntro');
    const container = document.getElementById('finderContainer');
    const steps = document.querySelectorAll('.finder-step');
    const progress = document.getElementById('finderProgress');
    const prevBtn = document.getElementById('finderPrev');
    const nextBtn = document.getElementById('finderNext');
    const results = document.getElementById('finderResults');

    startBtn?.addEventListener('click', () => {
        intro.style.display = 'none';
        container.style.display = 'flex';
        results.style.display = 'none';
        currentFinderStep = 0;
        updateFinderUI();
    });

    // Select card options
    document.querySelectorAll('.finder-option-card').forEach(card => {
        card.addEventListener('click', () => {
            const stepElement = card.closest('.finder-step');
            const questionType = stepElement.getAttribute('data-question');
            const optionValue = card.getAttribute('data-value');

            // Unselect siblings
            stepElement.querySelectorAll('.finder-option-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            finderData[questionType] = optionValue;

            // Auto advance to next step (optional, but let's enable it with visual transition)
            setTimeout(() => {
                if (currentFinderStep < steps.length - 1) {
                    currentFinderStep++;
                    updateFinderUI();
                } else {
                    showFinderResults();
                }
            }, 300);
        });
    });

    prevBtn?.addEventListener('click', () => {
        if (currentFinderStep > 0) {
            currentFinderStep--;
            updateFinderUI();
        }
    });

    nextBtn?.addEventListener('click', () => {
        if (currentFinderStep < steps.length - 1) {
            // Validate option selected
            const currentStepElement = steps[currentFinderStep];
            const selected = currentStepElement.querySelector('.finder-option-card.selected');
            if (!selected) {
                alert('Please select an option to continue.');
                return;
            }
            currentFinderStep++;
            updateFinderUI();
        } else {
            showFinderResults();
        }
    });

    function updateFinderUI() {
        steps.forEach((step, idx) => {
            if (idx === currentFinderStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update progress bar
        const progressPercent = ((currentFinderStep + 1) / steps.length) * 100;
        if (progress) progress.style.width = `${progressPercent}%`;

        // Toggle Back button visibility
        if (prevBtn) {
            prevBtn.style.visibility = currentFinderStep === 0 ? 'hidden' : 'visible';
        }

        // Toggle Next button text
        if (nextBtn) {
            nextBtn.innerHTML = currentFinderStep === steps.length - 1 ? 'Show Matches <i data-lucide="check"></i>' : 'Next <i data-lucide="arrow-right"></i>';
            safeCreateIcons();
        }
    }

    function showFinderResults() {
        container.style.display = 'none';
        results.style.display = 'block';

        const faceShape = finderData.faceShape || 'oval';
        const stylePreference = finderData.style || 'classic';
        const colorPreference = finderData.color || 'neutrals';
        const recommendedGrid = document.getElementById('finderRecommendations');

        if (typeof PRODUCTS === 'undefined' || !recommendedGrid) return;

        let matchingShapes = [];
        if (faceShape === 'round') {
            matchingShapes = ['rectangle', 'clubmaster'];
        } else if (faceShape === 'square') {
            matchingShapes = ['round', 'aviator', 'cat-eye'];
        } else if (faceShape === 'oval') {
            matchingShapes = ['aviator', 'rectangle', 'round', 'wayfarer'];
        } else if (faceShape === 'heart') {
            matchingShapes = ['cat-eye', 'round', 'clubmaster'];
        } else {
            matchingShapes = ['rectangle', 'round', 'aviator'];
        }

        // Score products according to face shape, style, and color preferences
        const scoreProduct = (prod) => {
            let score = 0;
            if (matchingShapes.includes(prod.shape)) score += 5;
            if (stylePreference === 'sporty' && (prod.material === 'tr90' || prod.shape === 'wrap-around')) score += 3;
            if (stylePreference === 'retro' && (prod.shape === 'clubmaster' || prod.shape === 'round' || prod.material === 'metal')) score += 3;
            if (stylePreference === 'bold' && (prod.shape === 'cat-eye' || prod.brand === 'Prada' || prod.brand === 'Tom Ford')) score += 3;
            if (stylePreference === 'classic' && (prod.brand === 'Ray-Ban' || prod.shape === 'rectangle' || prod.shape === 'aviator')) score += 3;
            return score;
        };

        const sortedRecs = [...PRODUCTS].sort((a, b) => scoreProduct(b) - scoreProduct(a));
        const filteredRecs = sortedRecs.slice(0, 3);

        document.getElementById('recommendedShapeText').textContent = `Based on your ${faceShape.toUpperCase()} face shape & ${stylePreference.toUpperCase()} style: ${matchingShapes.join(', ')} frames suit you best!`;

        recommendedGrid.innerHTML = filteredRecs.map(prod => `
      <div class="product-card" onclick="openProductModal('${prod.id}')">
        <div class="product-card-img">
          <img src="${prod.image}" alt="${prod.name}">
        </div>
        <div class="product-card-info">
          <span class="product-brand">${prod.brand}</span>
          <h3 class="product-name">${prod.name}</h3>
          <div class="product-meta-row">
            <span class="product-price">₹${prod.price.toLocaleString('en-IN')}</span>
            <div class="product-rating">
              <i data-lucide="star" style="width: 14px; height: 14px; fill: var(--accent);"></i>
              <span>${prod.rating}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

        safeCreateIcons();
    }

    // Reset Style Finder button
    const restartBtn = document.getElementById('restartFinderBtn');
    restartBtn?.addEventListener('click', () => {
        intro.style.display = 'flex';
        container.style.display = 'none';
        results.style.display = 'none';
        // Clear selection classes
        document.querySelectorAll('.finder-option-card').forEach(c => c.classList.remove('selected'));
        finderData.faceShape = '';
        finderData.style = '';
        finderData.color = '';
    });
}

/* =========================================================================
   7. CLINIC APPOINTMENT BOOKING ENGINE & LOCAL STORAGE
   ========================================================================= */
function initAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    const successState = document.getElementById('bookingSuccess');
    const dateInput = document.getElementById('appDate');

    // Set min date to today to prevent booking in the past
    const today = new Date().toISOString().split('T')[0];
    if (dateInput) {
        dateInput.min = today;
        if (!dateInput.value) dateInput.value = today;
    }

    form?.addEventListener('submit', (e) => {
        e.preventDefault();

        // Fetch values
        const name = document.getElementById('appName').value.trim();
        const phone = document.getElementById('appPhone').value.trim();
        const service = document.getElementById('appService').value;
        const date = document.getElementById('appDate').value;
        const time = document.getElementById('appTime').value;
        const notes = document.getElementById('appNotes')?.value || '';

        if (!name || !phone || !date || !time) {
            alert('Please fill out all required fields.');
            return;
        }

        if (date < today) {
            alert('Please select today or a future date for your appointment.');
            return;
        }

        const refId = `SEO-${Math.floor(100000 + Math.random() * 900000)}`;

        // Populate success details
        document.getElementById('successDetails').innerHTML = `
      <strong>Patient Name:</strong> ${name}<br>
      <strong>Service:</strong> ${service.toUpperCase()}<br>
      <strong>Date & Time:</strong> ${date} at ${time}<br>
      <strong>Reference ID:</strong> <strong>${refId}</strong>
    `;

        // Save to local storage
        const newBooking = {
            id: refId,
            name,
            phone,
            service,
            date,
            time,
            notes
        };

        const currentBookings = getBookings();
        currentBookings.push(newBooking);
        saveBookings(currentBookings);

        // Render bookings dashboard
        renderBookings();

        // Swap states
        form.style.display = 'none';
        successState.style.display = 'flex';
    });

    // Reset Booking form trigger
    const newBookingBtn = document.getElementById('newBookingBtn');
    newBookingBtn?.addEventListener('click', () => {
        form.reset();
        form.style.display = 'flex';
        successState.style.display = 'none';
    });
}

// Local Storage Helper Functions
function getBookings() {
    return JSON.parse(localStorage.getItem('seetaram_appointments') || '[]');
}

function saveBookings(bookings) {
    localStorage.setItem('seetaram_appointments', JSON.stringify(bookings));
}

function renderBookings() {
    const bookings = getBookings();
    const container = document.getElementById('bookingsDashboardContainer');
    const grid = document.getElementById('bookingsGrid');

    if (!container || !grid) return;

    if (bookings.length === 0) {
        container.style.display = 'none';
        grid.innerHTML = '';
        return;
    }

    container.style.display = 'block';
    grid.innerHTML = bookings.map(b => {
        let serviceLabel = b.service;
        if (b.service === 'eye-checkup') serviceLabel = 'Eye Checkup by Dr. Dimpal Yadav';
        else if (b.service === 'lens-fitting') serviceLabel = 'Contact Lens Assessment by Dr. Dimpal Yadav';
        else if (b.service === 'cataract-screening') serviceLabel = 'Cataract/Glaucoma Diagnostic by Dr. Dimpal Yadav';
        else if (b.service === 'frame-alignment') serviceLabel = 'Frame Fitting & Pupil Alignment';

        return `
      <div class="booking-item-card glass-panel" id="booking-card-${b.id}">
        <div class="booking-card-header">
          <span class="booking-ref-id">${b.id}</span>
          <button class="cancel-booking-btn" onclick="cancelBooking('${b.id}')" title="Cancel Appointment">
            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
        <div class="booking-card-body">
          <h4 class="booking-patient-name">${b.name}</h4>
          <div class="booking-detail-row">
            <i data-lucide="activity" style="width: 14px; height: 14px;"></i>
            <span>${serviceLabel}</span>
          </div>
          <div class="booking-detail-row">
            <i data-lucide="calendar" style="width: 14px; height: 14px;"></i>
            <span>${b.date}</span>
          </div>
          <div class="booking-detail-row">
            <i data-lucide="clock" style="width: 14px; height: 14px;"></i>
            <span>${b.time}</span>
          </div>
          <div class="booking-detail-row">
            <i data-lucide="phone" style="width: 14px; height: 14px;"></i>
            <span>${b.phone}</span>
          </div>
          ${b.notes ? `
            <div class="booking-notes-box">
              "${b.notes}"
            </div>
          ` : ''}
        </div>
      </div>
    `;
    }).join('');

    lucide.createIcons();
}

function cancelBooking(refId) {
    if (confirm(`Are you sure you want to cancel appointment ${refId}?`)) {
        const bookings = getBookings();
        const updated = bookings.filter(b => b.id !== refId);
        saveBookings(updated);

        const card = document.getElementById(`booking-card-${refId}`);
        if (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            card.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                renderBookings();
            }, 300);
        } else {
            renderBookings();
        }
    }
}

// Bind to window for HTML onclick handler access
window.cancelBooking = cancelBooking;

/* =========================================================================
   8. ONLINE BILLING SYSTEM
   ========================================================================= */
function initBillingForm() {
    const form = document.getElementById('billingForm');
    const dateInput = document.getElementById('billDate');

    if (!form) return;

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    if (dateInput) dateInput.value = today;

    // Dynamic real-time sync from form inputs to live preview
    const inputsToSync = [
        { inputId: 'billCustomerName', outputId: 'invCustomerName', defaultVal: '--' },
        { inputId: 'billPhone', outputId: 'invPhone', defaultVal: '--' },
        { inputId: 'billAddress', outputId: 'invAddress', defaultVal: '--' },
        { inputId: 'billSphOD', outputId: 'invSphOD', defaultVal: 'Plano' },
        { inputId: 'billCylOD', outputId: 'invCylOD', defaultVal: '--' },
        { inputId: 'billAxisOD', outputId: 'invAxisOD', defaultVal: '--' },
        { inputId: 'billAddOD', outputId: 'invAddOD', defaultVal: '--' },
        { inputId: 'billSphOS', outputId: 'invSphOS', defaultVal: 'Plano' },
        { inputId: 'billCylOS', outputId: 'invCylOS', defaultVal: '--' },
        { inputId: 'billAxisOS', outputId: 'invAxisOS', defaultVal: '--' },
        { inputId: 'billAddOS', outputId: 'invAddOS', defaultVal: '--' },
        { inputId: 'billPD', outputId: 'invPD', defaultVal: '--' }
    ];

    inputsToSync.forEach(item => {
        const el = document.getElementById(item.inputId);
        const out = document.getElementById(item.outputId);
        if (el && out) {
            const updateOut = () => { out.textContent = el.value.trim() || item.defaultVal; };
            el.addEventListener('input', updateOut);
            updateOut(); // Sync on load
        }
    });

    // Sync Date, Lens Type, Costs
    const dateEl = document.getElementById('billDate');
    const invDate = document.getElementById('invDate');
    if (dateEl && invDate) {
        invDate.textContent = dateEl.value;
        dateEl.addEventListener('change', () => {
            invDate.textContent = dateEl.value;
        });
    }

    const lensTypeEl = document.getElementById('billLensType');
    const invLens = document.getElementById('invLensType');
    if (lensTypeEl && invLens) {
        // Initial load sync
        invLens.textContent = lensTypeEl.options[lensTypeEl.selectedIndex].text;
        lensTypeEl.addEventListener('change', () => {
            invLens.textContent = lensTypeEl.options[lensTypeEl.selectedIndex].text;
        });
    }

    const payMethodEl = document.getElementById('billPaymentMethod');
    const invMethod = document.getElementById('invMethod');
    if (payMethodEl && invMethod) {
        // Initial load sync
        invMethod.textContent = payMethodEl.value;
        payMethodEl.addEventListener('change', () => {
            invMethod.textContent = payMethodEl.value;
        });
    }

    // Cost calculators
    const framePriceEl = document.getElementById('billItemPrice');
    const lensPriceEl = document.getElementById('billLensPrice');
    const discountEl = document.getElementById('billDiscount');

    function calculateInvoiceTotals() {
        const framePrice = parseFloat(framePriceEl?.value || 0);
        const lensPrice = parseFloat(lensPriceEl?.value || 0);
        const discount = parseFloat(discountEl?.value || 0);
        const total = Math.max(0, framePrice + lensPrice - discount);

        const invFrame = document.getElementById('invFrameCost');
        const invLensOutput = document.getElementById('invLensCost');
        const invDiscount = document.getElementById('invDiscountCost');
        const invTotal = document.getElementById('invTotalCost');
        const discountRow = document.getElementById('invDiscountRow');

        if (invFrame) invFrame.textContent = `₹${framePrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
        if (invLensOutput) invLensOutput.textContent = `₹${lensPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

        if (discount > 0) {
            if (discountRow) discountRow.style.display = 'table-row';
            if (invDiscount) invDiscount.textContent = `-₹${discount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
        } else {
            if (discountRow) discountRow.style.display = 'none';
        }

        if (invTotal) invTotal.textContent = `₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    }

    [framePriceEl, lensPriceEl, discountEl].forEach(el => {
        el?.addEventListener('input', calculateInvoiceTotals);
    });

    calculateInvoiceTotals(); // Run initial calculation

    // Handle Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('billCustomerName').value.trim();
        const phone = document.getElementById('billPhone').value.trim();
        const date = document.getElementById('billDate').value;
        const address = document.getElementById('billAddress').value.trim();

        const sphOD = document.getElementById('billSphOD').value || 'Plano';
        const cylOD = document.getElementById('billCylOD').value || '--';
        const axisOD = document.getElementById('billAxisOD').value || '--';
        const addOD = document.getElementById('billAddOD').value || '--';

        const sphOS = document.getElementById('billSphOS').value || 'Plano';
        const cylOS = document.getElementById('billCylOS').value || '--';
        const axisOS = document.getElementById('billAxisOS').value || '--';
        const addOS = document.getElementById('billAddOS').value || '--';

        const pd = document.getElementById('billPD').value || '--';
        const lensTypeVal = document.getElementById('billLensType').value;
        const lensTypeText = lensTypeEl.options[lensTypeEl.selectedIndex].text;

        const framePrice = parseFloat(framePriceEl.value || 0);
        const lensPrice = parseFloat(lensPriceEl.value || 0);
        const discount = parseFloat(discountEl.value || 0);
        const total = Math.max(0, framePrice + lensPrice - discount);
        const payMethod = payMethodEl.value;

        // Generate Invoice ID
        const formattedDate = date.replace(/-/g, '').substring(2); // YYMMDD
        const randNum = Math.floor(1000 + Math.random() * 9000);
        const invId = `INV-${formattedDate}-${randNum}`;

        // Update Live Invoice details
        document.getElementById('invNumber').textContent = invId;
        document.getElementById('invDate').textContent = date;
        document.getElementById('invCustomerName').textContent = name;
        document.getElementById('invPhone').textContent = phone;
        document.getElementById('invAddress').textContent = address;

        document.getElementById('invSphOD').textContent = sphOD;
        document.getElementById('invCylOD').textContent = cylOD;
        document.getElementById('invAxisOD').textContent = axisOD;
        document.getElementById('invAddOD').textContent = addOD;

        document.getElementById('invSphOS').textContent = sphOS;
        document.getElementById('invCylOS').textContent = cylOS;
        document.getElementById('invAxisOS').textContent = axisOS;
        document.getElementById('invAddOS').textContent = addOS;

        document.getElementById('invPD').textContent = pd;
        document.getElementById('invLensType').textContent = lensTypeText;
        document.getElementById('invMethod').textContent = payMethod;

        calculateInvoiceTotals();

        // Store Invoice
        const invoiceData = {
            id: invId,
            date,
            name,
            phone,
            address,
            prescription: {
                od: { sph: sphOD, cyl: cylOD, axis: axisOD, add: addOD },
                os: { sph: sphOS, cyl: cylOS, axis: axisOS, add: addOS },
                pd,
                lensType: lensTypeText,
                lensTypeVal
            },
            pricing: { framePrice, lensPrice, discount, total },
            paymentMethod: payMethod
        };

        const bills = getBills();
        const existingIndex = bills.findIndex(b => b.id === invId);
        if (existingIndex > -1) {
            bills[existingIndex] = invoiceData;
        } else {
            bills.push(invoiceData);
        }
        saveBills(bills);
        renderBills();

        alert(`Invoice ${invId} generated and saved successfully!`);
    });

    // Load and initial render
    renderBills();
}

function getBills() {
    return JSON.parse(localStorage.getItem('seetaram_bills') || '[]');
}

function saveBills(bills) {
    localStorage.setItem('seetaram_bills', JSON.stringify(bills));
}

function renderBills() {
    const bills = getBills();
    const grid = document.getElementById('billingHistoryGrid');
    if (!grid) return;

    if (bills.length === 0) {
        grid.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 20px 10px; color: var(--text-secondary);">
          No billing records found. Fill out the form above to generate your first bill.
        </td>
      </tr>
    `;
        return;
    }

    grid.innerHTML = bills.map(b => `
    <tr id="bill-row-${b.id}">
      <td style="font-weight: 600; color: var(--accent);">${b.id}</td>
      <td>${b.date}</td>
      <td>${b.name}</td>
      <td>${b.phone}</td>
      <td style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${b.prescription.lensType}</td>
      <td>₹${b.pricing.total.toLocaleString('en-IN')}</td>
      <td><span class="payment-badge" style="background: rgba(212,175,55,0.15); color: var(--accent); padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 500;">${b.paymentMethod}</span></td>
      <td>
        <div style="display: flex; gap: 8px;">
          <button class="icon-btn" onclick="viewBill('${b.id}')" title="View/Print Bill" style="color: var(--accent); background: transparent; border: none; cursor: pointer; padding: 4px;">
            <i data-lucide="eye" style="width: 16px; height: 16px;"></i>
          </button>
          <button class="icon-btn" onclick="deleteBill('${b.id}')" title="Delete Record" style="color: #fc8181; background: transparent; border: none; cursor: pointer; padding: 4px;">
            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

    safeCreateIcons();
}

function safeCreateIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function viewBill(billId) {
    const bills = getBills();
    const bill = bills.find(b => b.id === billId);
    if (!bill) return;

    // Fill Form fields
    document.getElementById('billCustomerName').value = bill.name;
    document.getElementById('billPhone').value = bill.phone;
    document.getElementById('billDate').value = bill.date;
    document.getElementById('billAddress').value = bill.address;

    document.getElementById('billSphOD').value = bill.prescription.od.sph;
    document.getElementById('billCylOD').value = bill.prescription.od.cyl;
    document.getElementById('billAxisOD').value = bill.prescription.od.axis;
    document.getElementById('billAddOD').value = bill.prescription.od.add;

    document.getElementById('billSphOS').value = bill.prescription.os.sph;
    document.getElementById('billCylOS').value = bill.prescription.os.cyl;
    document.getElementById('billAxisOS').value = bill.prescription.os.axis;
    document.getElementById('billAddOS').value = bill.prescription.os.add;

    document.getElementById('billPD').value = bill.prescription.pd;
    document.getElementById('billLensType').value = bill.prescription.lensTypeVal || 'single-vision';

    document.getElementById('billItemPrice').value = bill.pricing.framePrice;
    document.getElementById('billLensPrice').value = bill.pricing.lensPrice;
    document.getElementById('billDiscount').value = bill.pricing.discount;
    document.getElementById('billPaymentMethod').value = bill.paymentMethod;

    // Update Live Invoice display
    document.getElementById('invNumber').textContent = bill.id;
    document.getElementById('invDate').textContent = bill.date;
    document.getElementById('invCustomerName').textContent = bill.name;
    document.getElementById('invPhone').textContent = bill.phone;
    document.getElementById('invAddress').textContent = bill.address;

    document.getElementById('invSphOD').textContent = bill.prescription.od.sph;
    document.getElementById('invCylOD').textContent = bill.prescription.od.cyl;
    document.getElementById('invAxisOD').textContent = bill.prescription.od.axis;
    document.getElementById('invAddOD').textContent = bill.prescription.od.add;

    document.getElementById('invSphOS').textContent = bill.prescription.os.sph;
    document.getElementById('invCylOS').textContent = bill.prescription.os.cyl;
    document.getElementById('invAxisOS').textContent = bill.prescription.os.axis;
    document.getElementById('invAddOS').textContent = bill.prescription.os.add;

    document.getElementById('invPD').textContent = bill.prescription.pd;
    document.getElementById('invLensType').textContent = bill.prescription.lensType;
    document.getElementById('invMethod').textContent = bill.paymentMethod;

    // Recalculate invoice totals
    const discountRow = document.getElementById('invDiscountRow');
    const invFrame = document.getElementById('invFrameCost');
    const invLens = document.getElementById('invLensCost');
    const invDiscount = document.getElementById('invDiscountCost');
    const invTotal = document.getElementById('invTotalCost');

    invFrame.textContent = `₹${bill.pricing.framePrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    invLens.textContent = `₹${bill.pricing.lensPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    if (bill.pricing.discount > 0) {
        if (discountRow) discountRow.style.display = 'table-row';
        invDiscount.textContent = `-₹${bill.pricing.discount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    } else {
        if (discountRow) discountRow.style.display = 'none';
    }
    invTotal.textContent = `₹${bill.pricing.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    // Scroll to invoice sheet
    document.getElementById('invoiceSheet').scrollIntoView({ behavior: 'smooth' });
}

function deleteBill(billId) {
    if (confirm(`Are you sure you want to delete invoice record ${billId}?`)) {
        const bills = getBills();
        const updated = bills.filter(b => b.id !== billId);
        saveBills(updated);

        const row = document.getElementById(`bill-row-${billId}`);
        if (row) {
            row.style.opacity = '0';
            row.style.transform = 'translateY(10px)';
            row.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                renderBills();
            }, 300);
        } else {
            renderBills();
        }
    }
}

function printInvoice() {
    const invNumber = document.getElementById('invNumber').textContent;
    if (invNumber === '--') {
        alert('Please generate or view a bill first before printing.');
        return;
    }
    window.print();
}

function resetBillingForm() {
    const form = document.getElementById('billingForm');
    if (form) {
        form.reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('billDate').value = today;
    }

    // Clear preview fields
    document.getElementById('invNumber').textContent = '--';
    document.getElementById('invDate').textContent = '--';
    document.getElementById('invCustomerName').textContent = '--';
    document.getElementById('invPhone').textContent = '--';
    document.getElementById('invAddress').textContent = '--';

    document.getElementById('invSphOD').textContent = '--';
    document.getElementById('invCylOD').textContent = '--';
    document.getElementById('invAxisOD').textContent = '--';
    document.getElementById('invAddOD').textContent = '--';

    document.getElementById('invSphOS').textContent = '--';
    document.getElementById('invCylOS').textContent = '--';
    document.getElementById('invAxisOS').textContent = '--';
    document.getElementById('invAddOS').textContent = '--';

    document.getElementById('invPD').textContent = '--';
    document.getElementById('invLensType').textContent = '--';
    document.getElementById('invFrameCost').textContent = '₹0.00';
    document.getElementById('invLensCost').textContent = '₹0.00';

    const discountRow = document.getElementById('invDiscountRow');
    if (discountRow) discountRow.style.display = 'none';

    document.getElementById('invTotalCost').textContent = '₹0.00';
    document.getElementById('invMethod').textContent = '--';
}

// Bind to window for HTML click handlers
window.viewBill = viewBill;
window.deleteBill = deleteBill;
window.printInvoice = printInvoice;
window.resetBillingForm = resetBillingForm;
