/**
 * Seetaram Eye Care & Optical - Functional Test Suite
 * Tests JavaScript logic without a browser
 */

// ──────────────────────────────────────────────
// Mock browser globals
// ──────────────────────────────────────────────
const JSDOM_MOCK = {
  localStorage: (() => {
    let store = {};
    return {
      getItem: k => store[k] || null,
      setItem: (k, v) => { store[k] = v; },
      removeItem: k => { delete store[k]; },
      clear: () => { store = {}; }
    };
  })()
};

// ──────────────────────────────────────────────
// Load PRODUCTS from products.js
// ──────────────────────────────────────────────
let PRODUCTS, BRANDS, TESTIMONIALS;
try {
  ({ PRODUCTS, BRANDS, TESTIMONIALS } = require('./products.js'));
} catch (e) {
  console.error('FAIL: Could not load products.js -', e.message);
  process.exit(1);
}

// ──────────────────────────────────────────────
// Test Utilities
// ──────────────────────────────────────────────
let passed = 0, failed = 0;
function test(name, fn) {
  try {
    fn();
    console.log('  PASS -', name);
    passed++;
  } catch (e) {
    console.log('  FAIL -', name, '\n       ', e.message);
    failed++;
  }
}
function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}
function assertEqual(a, b, msg) {
  if (a !== b) throw new Error((msg || '') + ` Expected "${b}", got "${a}"`);
}

// ──────────────────────────────────────────────
// SECTION 1: Products Data
// ──────────────────────────────────────────────
console.log('\n[1] Products Data Integrity');
test('PRODUCTS array is defined and non-empty', () => {
  assert(Array.isArray(PRODUCTS) && PRODUCTS.length > 0, 'PRODUCTS should be a non-empty array');
});
test('All products have required fields', () => {
  PRODUCTS.forEach(p => {
    assert(p.id, `Product missing id: ${JSON.stringify(p)}`);
    assert(p.name, `Product missing name: ${p.id}`);
    assert(p.brand, `Product missing brand: ${p.id}`);
    assert(p.category, `Product missing category: ${p.id}`);
    assert(typeof p.price === 'number', `Product price must be number: ${p.id}`);
    assert(p.image, `Product missing image: ${p.id}`);
    assert(Array.isArray(p.features), `Product features must be array: ${p.id}`);
    assert(typeof p.rating === 'number', `Product rating must be number: ${p.id}`);
  });
});
test('BRANDS array loaded', () => {
  assert(Array.isArray(BRANDS) && BRANDS.length >= 5, 'BRANDS should have at least 5 entries');
});
test('TESTIMONIALS array loaded', () => {
  assert(Array.isArray(TESTIMONIALS) && TESTIMONIALS.length >= 3, 'TESTIMONIALS should have 3+ entries');
});

// ──────────────────────────────────────────────
// SECTION 2: Product Filtering Logic
// ──────────────────────────────────────────────
console.log('\n[2] Product Filtering & Search');
test('Filter by category: eyeglasses', () => {
  const result = PRODUCTS.filter(p => p.category === 'eyeglasses');
  assert(result.length >= 4, `Expected 4+ eyeglasses, got ${result.length}`);
});
test('Filter by category: sunglasses', () => {
  const result = PRODUCTS.filter(p => p.category === 'sunglasses');
  assert(result.length >= 4, `Expected 4+ sunglasses, got ${result.length}`);
});
test('Filter by category: contact-lenses', () => {
  const result = PRODUCTS.filter(p => p.category === 'contact-lenses');
  assert(result.length >= 3, `Expected 3+ contact lenses, got ${result.length}`);
});
test('Search by brand (Ray-Ban)', () => {
  const q = 'ray-ban';
  const result = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    (p.shape && p.shape.toLowerCase().includes(q))
  );
  assert(result.length >= 2, `Expected 2+ Ray-Ban products, got ${result.length}`);
});
test('Search by shape (round)', () => {
  const q = 'round';
  const result = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    (p.shape && p.shape.toLowerCase().includes(q))
  );
  assert(result.length >= 2, `Expected round products, got ${result.length}`);
});
test('Sort by price low-to-high', () => {
  const sorted = [...PRODUCTS].sort((a, b) => a.price - b.price);
  assert(sorted[0].price <= sorted[sorted.length - 1].price, 'Price low-to-high sort failed');
});
test('Sort by price high-to-low', () => {
  const sorted = [...PRODUCTS].sort((a, b) => b.price - a.price);
  assert(sorted[0].price >= sorted[sorted.length - 1].price, 'Price high-to-low sort failed');
});
test('Sort by rating', () => {
  const sorted = [...PRODUCTS].sort((a, b) => b.rating - a.rating);
  assert(sorted[0].rating >= sorted[sorted.length - 1].rating, 'Rating sort failed');
});

// ──────────────────────────────────────────────
// SECTION 3: Style Finder Logic
// ──────────────────────────────────────────────
console.log('\n[3] Style Finder Recommendation Logic');

function getRecommendations(faceShape, stylePreference) {
  let matchingShapes = [];
  if (faceShape === 'round') matchingShapes = ['rectangle', 'clubmaster'];
  else if (faceShape === 'square') matchingShapes = ['round', 'aviator', 'cat-eye'];
  else if (faceShape === 'oval') matchingShapes = ['aviator', 'rectangle', 'round', 'wayfarer'];
  else if (faceShape === 'heart') matchingShapes = ['cat-eye', 'round', 'clubmaster'];
  else matchingShapes = ['rectangle', 'round', 'aviator'];

  const scoreProduct = (prod) => {
    let score = 0;
    if (matchingShapes.includes(prod.shape)) score += 5;
    if (stylePreference === 'sporty' && (prod.material === 'tr90' || prod.shape === 'wrap-around')) score += 3;
    if (stylePreference === 'retro' && (prod.shape === 'clubmaster' || prod.shape === 'round' || prod.material === 'metal')) score += 3;
    if (stylePreference === 'bold' && (prod.shape === 'cat-eye' || prod.brand === 'Prada' || prod.brand === 'Tom Ford')) score += 3;
    if (stylePreference === 'classic' && (prod.brand === 'Ray-Ban' || prod.shape === 'rectangle' || prod.shape === 'aviator')) score += 3;
    return score;
  };

  return [...PRODUCTS].sort((a, b) => scoreProduct(b) - scoreProduct(a)).slice(0, 3);
}

test('Style Finder: round face returns 3 recommendations', () => {
  const recs = getRecommendations('round', 'classic');
  assertEqual(recs.length, 3, 'Should return 3 recommendations');
});
test('Style Finder: square face recommendations scored correctly', () => {
  const recs = getRecommendations('square', 'bold');
  assert(recs.length === 3, 'Should return 3 recommendations');
});
test('Style Finder: oval face with sporty style', () => {
  const recs = getRecommendations('oval', 'sporty');
  assert(recs.length === 3, 'Should return 3 recommendations');
});
test('Style Finder: heart face with retro style', () => {
  const recs = getRecommendations('heart', 'retro');
  assert(recs.length === 3, 'Should return 3 recommendations');
});
test('Style Finder: no face shape defaults to 3 recommendations', () => {
  const recs = getRecommendations('', 'classic');
  assert(recs.length === 3, 'Should return 3 recommendations even with no face shape');
});

// ──────────────────────────────────────────────
// SECTION 4: Appointment Booking Logic
// ──────────────────────────────────────────────
console.log('\n[4] Appointment Booking Validation');

function validateAppointment(name, phone, date, time) {
  const today = new Date().toISOString().split('T')[0];
  if (!name.trim()) return 'Name is required';
  if (!phone.trim()) return 'Phone is required';
  if (!date) return 'Date is required';
  if (!time) return 'Time is required';
  if (date < today) return 'Date must be today or future';
  return 'OK';
}

test('Valid appointment passes validation', () => {
  const today = new Date().toISOString().split('T')[0];
  const result = validateAppointment('Rahul Kumar', '9876543210', today, '10:00 AM - 12:00 PM');
  assertEqual(result, 'OK');
});
test('Empty name fails validation', () => {
  const today = new Date().toISOString().split('T')[0];
  const result = validateAppointment('', '9876543210', today, '10:00 AM');
  assert(result !== 'OK', 'Should fail with empty name');
});
test('Missing time slot fails validation', () => {
  const today = new Date().toISOString().split('T')[0];
  const result = validateAppointment('Rahul', '9876543210', today, '');
  assert(result !== 'OK', 'Should fail with no time');
});
test('Past date fails validation', () => {
  const result = validateAppointment('Rahul', '9876543210', '2020-01-01', '10:00 AM');
  assert(result !== 'OK', 'Past date should fail');
});

// ──────────────────────────────────────────────
// SECTION 5: Billing Invoice Logic
// ──────────────────────────────────────────────
console.log('\n[5] Billing Invoice Calculation');

function calculateTotal(framePrice, lensPrice, discount) {
  return Math.max(0, framePrice + lensPrice - discount);
}
function generateInvId(date) {
  const formatted = date.replace(/-/g, '').substring(2);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `INV-${formatted}-${rand}`;
}

test('Invoice total calculation is correct', () => {
  const total = calculateTotal(3500, 1200, 200);
  assertEqual(total, 4500);
});
test('Invoice total cannot go below 0', () => {
  const total = calculateTotal(100, 0, 500);
  assertEqual(total, 0, 'Total must be clamped at 0');
});
test('Invoice ID has correct format', () => {
  const today = new Date().toISOString().split('T')[0];
  const id = generateInvId(today);
  assert(id.startsWith('INV-'), `Invoice ID should start with INV-: ${id}`);
  assert(id.length >= 14, `Invoice ID too short: ${id}`);
});

// ──────────────────────────────────────────────
// SECTION 6: LocalStorage Helpers
// ──────────────────────────────────────────────
console.log('\n[6] LocalStorage Booking/Billing Persistence');

const ls = JSDOM_MOCK.localStorage;

function saveBookings(list) { ls.setItem('seetaram_appointments', JSON.stringify(list)); }
function getBookings() { return JSON.parse(ls.getItem('seetaram_appointments') || '[]'); }
function saveBills(list) { ls.setItem('seetaram_bills', JSON.stringify(list)); }
function getBills() { return JSON.parse(ls.getItem('seetaram_bills') || '[]'); }

test('Booking saved and retrieved from localStorage', () => {
  const booking = { id: 'SEO-123456', name: 'Test Patient', phone: '9876543210', service: 'eye-checkup', date: '2026-07-25', time: '10:00 AM', notes: '' };
  saveBookings([booking]);
  const retrieved = getBookings();
  assertEqual(retrieved.length, 1);
  assertEqual(retrieved[0].id, 'SEO-123456');
  assertEqual(retrieved[0].name, 'Test Patient');
});
test('Cancel booking removes it from localStorage', () => {
  const bookings = [
    { id: 'SEO-111111', name: 'Patient A' },
    { id: 'SEO-222222', name: 'Patient B' }
  ];
  saveBookings(bookings);
  const updated = getBookings().filter(b => b.id !== 'SEO-111111');
  saveBookings(updated);
  const result = getBookings();
  assertEqual(result.length, 1);
  assertEqual(result[0].id, 'SEO-222222');
});
test('Bill saved and retrieved from localStorage', () => {
  const bill = { id: 'INV-260725-1234', date: '2026-07-25', name: 'Amit Sharma', phone: '9898989898', pricing: { framePrice: 3500, lensPrice: 1200, discount: 200, total: 4500 } };
  saveBills([bill]);
  const retrieved = getBills();
  assertEqual(retrieved.length, 1);
  assertEqual(retrieved[0].pricing.total, 4500);
});
test('Delete bill removes it from localStorage', () => {
  saveBills([
    { id: 'INV-A', name: 'Customer A' },
    { id: 'INV-B', name: 'Customer B' }
  ]);
  const updated = getBills().filter(b => b.id !== 'INV-A');
  saveBills(updated);
  const result = getBills();
  assertEqual(result.length, 1);
  assertEqual(result[0].id, 'INV-B');
});

// ──────────────────────────────────────────────
// FINAL SUMMARY
// ──────────────────────────────────────────────
console.log('\n' + '='.repeat(45));
console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('='.repeat(45));
process.exit(failed > 0 ? 1 : 0);
