import React, { useState, useMemo } from 'react';

// Decorative Indian Sacred Motifs & Icons (Self-Contained SVGs)
const LotusIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C12 2 10.5 7.5 7 9.5C3.5 11.5 2 14.5 2 17C2 19.5 4 21 6.5 21C9 21 11 19.5 12 18.5C13 19.5 15 21 17.5 21C20 21 22 19.5 22 17C22 14.5 20.5 11.5 17 9.5C13.5 7.5 12 2 12 2Z" opacity="0.85" />
    <path d="M12 6C12 6 11 10 8 12C5 14 4 16.5 4 18.5C4 20 5.5 20.5 7 20.5C9 20.5 10.5 19.5 12 17.5C13.5 19.5 15 20.5 17 20.5C18.5 20.5 20 20 20 18.5C20 16.5 19 14 16 12C13 10 12 6 12 6Z" fill="#F59E0B" />
  </svg>
);

const TempleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7h20L12 2z" />
    <path d="M4 7v13h16V7" />
    <path d="M9 20v-6h6v6" />
    <path d="M12 2v5" />
  </svg>
);

const ShieldCheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const GlobeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const FlagIndiaIcon = ({ className = "w-5 h-5" }) => (
  <span className={`inline-block ${className} font-bold text-base`}>🇮🇳</span>
);

const FlagWorldIcon = ({ className = "w-5 h-5" }) => (
  <span className={`inline-block ${className} font-bold text-base`}>🌐</span>
);

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H7c-.7 0-1.3.3-1.8.7C4.3 8.6 3 10 3 10s-2.7.6-4.5 1.1C.7 11.3 0 12.1 0 13v3c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const UtensilsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 2v20M21 2v6a3 3 0 0 1-3 3M18 11v11M3 2v7a4 4 0 0 0 4 4v9M7 2v11" />
  </svg>
);

const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Constants & Master Data
const DESTINATIONS = [
  { id: 'ayodhya', name: 'Ayodhya Shree Ram Mandir', state: 'Uttar Pradesh', highlights: 'Ram Janmabhoomi, Saryu Aarti, Hanumangarhi', bg: 'from-amber-600 to-orange-700' },
  { id: 'varanasi', name: 'Varanasi Kashi Vishwanath', state: 'Uttar Pradesh', highlights: 'Kashi Vishwanath Corridor, Subah-e-Banaras, Ganga Aarti', bg: 'from-orange-600 to-amber-700' },
  { id: 'vrindavan', name: 'Mathura & Vrindavan', state: 'Uttar Pradesh', highlights: 'Bankey Bihari, Krishna Janmabhoomi, Prem Mandir', bg: 'from-yellow-600 to-amber-600' },
  { id: 'haridwar', name: 'Haridwar & Rishikesh', state: 'Uttarakhand', highlights: 'Har Ki Pauri Aarti, Parmarth Niketan, Yoga Ashram', bg: 'from-amber-500 to-yellow-700' },
  { id: 'tirupati', name: 'Tirupati Balaji', state: 'Andhra Pradesh', highlights: 'Shree Venkateswara Swamy, Sheshachalam Hills', bg: 'from-amber-700 to-orange-800' },
];

const ACCOMMODATION_TYPES = [
  { id: 'standard', name: 'Standard Sacred Stay', inr: 2500, usd: 30, desc: 'Clean, comfortable 3-Star AC Hotel / Pilgrim Guest House near temple grounds', icon: '🏨' },
  { id: 'deluxe', name: 'Deluxe Pilgrim Suite', inr: 5500, usd: 68, desc: '4-Star Premium Hotel with Sattvik Dining, Temple Transfer & Quiet Lounge', icon: '🌟' },
  { id: 'luxury', name: 'Luxury Heritage Haveli', inr: 12000, usd: 148, desc: '5-Star Royal Heritage Haveli / Riverside Villa with Private Butler & Pujari Services', icon: '👑' },
];

const TRANSPORT_OPTIONS = [
  { id: 'none', name: 'No Transport Needed', inrPerDay: 0, usdPerDay: 0, desc: 'Self-arranged or local walking distance' },
  { id: 'sedan', name: 'Private Sedan (Dzire / Etios)', inrPerDay: 2200, usdPerDay: 28, desc: 'Up to 3 Pilgrims | AC Sedan with Experienced Local Driver' },
  { id: 'suv', name: 'Luxury SUV (Innova Crysta)', inrPerDay: 4200, usdPerDay: 52, desc: 'Up to 6 Pilgrims | Premium AC SUV, Highway Tolls & Driver Stay Included' },
  { id: 'tempo', name: 'Tempo Traveller Bus', inrPerDay: 7800, usdPerDay: 95, desc: 'Up to 12 Pilgrims | Pushback AC Seats, Sound System & Refreshments' },
];

const INDIAN_ID_TYPES = [
  { id: 'aadhaar', label: 'Aadhaar Card', placeholder: '12-digit Aadhaar Number (e.g. 5489 1234 5678)' },
  { id: 'dl', label: 'Driving License', placeholder: 'State DL Number (e.g. UP1420210012345)' },
  { id: 'passport', label: 'Indian Passport', placeholder: '8-Character Passport Number (e.g. Z1234567)' },
];

const INDIAN_LANGUAGES = [
  'Hindi (Recommended)', 'English', 'Sanskrit (Vedic Chanting)', 'Gujarati', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'
];

const FOREIGNER_LANGUAGES = [
  'English (Default)', 'Spanish (Español)', 'French (Français)', 'German (Deutsch)', 'Russian (Русский)', 'Japanese (日本語)', 'Mandarin (中文)'
];

const FOREIGNER_PAYMENTS = [
  { id: 'stripe', name: 'Stripe International Credit/Debit Card', desc: 'Visa, Mastercard, AMEX, Discover accepted globally', badge: 'Instant Confirmation' },
  { id: 'paypal', name: 'PayPal Express Checkout', desc: 'Secure payment via your global PayPal account', badge: 'Buyer Protected' },
  { id: 'swift', name: 'International Bank Wire (SWIFT)', desc: 'Direct USD wire transfer to Divine Yatra Trust account', badge: 'Pre-Booking' }
];

const INDIAN_PAYMENTS = [
  { id: 'upi', name: 'Instant UPI (Google Pay / PhonePe / Paytm / BHIM)', desc: 'Zero gateway charges. Scan QR code or enter UPI ID', badge: 'Most Popular' },
  { id: 'paytm', name: 'Paytm Wallet & Postpaid', desc: 'One-click payment via linked mobile number', badge: 'Fast & Easy' },
  { id: 'netbanking', name: 'Net Banking / NEFT', desc: 'HDFC, SBI, ICICI, Axis, Kotak & 50+ Indian Banks', badge: 'Secure Direct' }
];

const COUNTRIES_LIST = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore', 'United Arab Emirates', 'Netherlands', 'Switzerland', 'Malaysia', 'Nepal', 'Mauritius', 'South Africa', 'New Zealand', 'Italy', 'Brazil', 'Other Country'
];

export default function DivineYatraBooking() {
  // 1. User Type State: 'indian' | 'international'
  const [userType, setUserType] = useState('indian');

  // 2. Shared Itinerary State
  const [destination, setDestination] = useState('ayodhya');
  const [checkInDate, setCheckInDate] = useState('2026-10-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-18');
  const [pilgrimsCount, setPilgrimsCount] = useState(2);
  const [accommodation, setAccommodation] = useState('deluxe');
  const [transport, setTransport] = useState('suv');

  // 3. Indian Specific State
  const [indianIdType, setIndianIdType] = useState('aadhaar');
  const [indianIdNumber, setIndianIdNumber] = useState('');
  const [indianGuideLang, setIndianGuideLang] = useState('Hindi (Recommended)');
  const [indianPayment, setIndianPayment] = useState('upi');
  const [addSeniorCitizenAssistance, setAddSeniorCitizenAssistance] = useState(true);
  const [addPrasadamBox, setAddPrasadamBox] = useState(true);

  // 4. Foreigner Specific State
  const [passportNumber, setPassportNumber] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('United States');
  const [foreignerGuideLang, setForeignerGuideLang] = useState('English (Default)');
  const [foreignerPayment, setForeignerPayment] = useState('stripe');
  const [sattvikMealPlan, setSattvikMealPlan] = useState(true);
  const [bottledWaterPackage, setBottledWaterPackage] = useState(true);
  const [airportTransfer, setAirportTransfer] = useState('delhi_del');

  // Contact Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // UI state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Calculation Logic
  const durationNights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 3;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkInDate, checkOutDate]);

  const selectedAccom = useMemo(() => {
    return ACCOMMODATION_TYPES.find(a => a.id === accommodation) || ACCOMMODATION_TYPES[1];
  }, [accommodation]);

  const selectedTrans = useMemo(() => {
    return TRANSPORT_OPTIONS.find(t => t.id === transport) || TRANSPORT_OPTIONS[2];
  }, [transport]);

  const priceCalculation = useMemo(() => {
    const isINR = userType === 'indian';
    const rateFactor = isINR ? 1 : 1; // Base pricing defined in INR or USD per tier

    // Accommodation total
    const baseStayPerNight = isINR ? selectedAccom.inr : selectedAccom.usd;
    const totalStay = baseStayPerNight * durationNights;

    // Transport total
    const baseTransportPerDay = isINR ? selectedTrans.inrPerDay : selectedTrans.usdPerDay;
    const totalTransport = baseTransportPerDay * (durationNights + 1);

    // Extras
    let extrasTotal = 0;
    if (isINR) {
      if (addSeniorCitizenAssistance) extrasTotal += 1500;
      if (addPrasadamBox) extrasTotal += 750;
    } else {
      if (sattvikMealPlan) extrasTotal += 25 * (durationNights + 1) * pilgrimsCount; // $25 per day per person
      if (bottledWaterPackage) extrasTotal += 10 * (durationNights + 1); // $10 per day package
      if (airportTransfer !== 'none') extrasTotal += 65; // $65 flat airport VIP shuttle
    }

    // Guide Service Fee
    const guideFee = isINR ? 1200 : 40; // ₹1,200 vs $40 per tour

    const subtotal = totalStay + totalTransport + extrasTotal + guideFee;
    const taxGst = Math.round(subtotal * 0.05); // 5% Pilgrimage Tourism GST
    const grandTotal = subtotal + taxGst;

    return {
      currencySymbol: isINR ? '₹' : '$',
      currencyCode: isINR ? 'INR' : 'USD',
      totalStay,
      totalTransport,
      extrasTotal,
      guideFee,
      subtotal,
      taxGst,
      grandTotal,
    };
  }, [
    userType,
    selectedAccom,
    selectedTrans,
    durationNights,
    pilgrimsCount,
    addSeniorCitizenAssistance,
    addPrasadamBox,
    sattvikMealPlan,
    bottledWaterPackage,
    airportTransfer
  ]);

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!fullName.trim()) errors.fullName = 'Full Name is required for Temple Pass';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid Email is required';
    if (!phone.trim()) errors.phone = 'Phone / WhatsApp number is required';

    if (userType === 'indian') {
      if (!indianIdNumber.trim()) {
        errors.indianIdNumber = `Please provide your ${INDIAN_ID_TYPES.find(i => i.id === indianIdType)?.label} number`;
      }
    } else {
      if (!passportNumber.trim()) {
        errors.passportNumber = 'Passport Number is mandatory for Foreign National Pilgrims';
      }
      if (!countryOfOrigin) {
        errors.countryOfOrigin = 'Please select your Country of Origin';
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setValidationErrors({});
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Header Banner */}
      <header className="mb-8 text-center relative overflow-hidden bg-gradient-to-r from-stone-900 via-amber-950 to-amber-900 text-amber-50 rounded-3xl p-8 sm:p-12 shadow-2xl border border-amber-500/30">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-medium uppercase tracking-widest mb-4 backdrop-blur-sm">
            <LotusIcon className="w-4 h-4 text-amber-400" />
            Official Sacred Pilgrimage Portal
            <LotusIcon className="w-4 h-4 text-amber-400" />
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 font-cinzel mb-3 drop-shadow">
            Divine Yatra Booking
          </h1>
          
          <p className="max-w-2xl text-stone-300 text-sm sm:text-base leading-relaxed">
            Reserve certified Darshan passes, heritage accommodations, sattvik dining, and private AC transfers across India’s most sacred holy shrines.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-semibold text-amber-200/90">
            <span className="flex items-center gap-1.5 bg-stone-800/60 px-3 py-1.5 rounded-lg border border-amber-500/20">
              <TempleIcon className="w-4 h-4 text-amber-400" /> Ayodhya • Varanasi • Vrindavan • Haridwar • Tirupati
            </span>
            <span className="flex items-center gap-1.5 bg-stone-800/60 px-3 py-1.5 rounded-lg border border-amber-500/20">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-400" /> 100% Verified Temple Darshan Logistics
            </span>
          </div>
        </div>
      </header>

      {/* PHASE SELECTOR / TOGGLE BAR */}
      <div className="mb-10 max-w-3xl mx-auto">
        <div className="text-center mb-3">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Select Pilgrim Residency Status</span>
        </div>
        
        <div className="bg-amber-100/60 p-2 rounded-2xl border-2 border-amber-300/70 shadow-lg flex flex-col sm:flex-row gap-2 relative">
          
          {/* Indian Resident Toggle Option */}
          <button
            type="button"
            onClick={() => {
              setUserType('indian');
              setValidationErrors({});
            }}
            className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold transition-all duration-300 ${
              userType === 'indian'
                ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white shadow-xl scale-[1.02] ring-2 ring-amber-400'
                : 'text-stone-700 hover:bg-amber-200/50 hover:text-stone-900'
            }`}
          >
            <FlagIndiaIcon className="text-2xl" />
            <div className="text-left">
              <div className="text-base font-extrabold leading-tight flex items-center gap-2">
                Indian Resident
                {userType === 'indian' && <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>}
              </div>
              <div className="text-xs font-medium opacity-90">Currency: INR (₹) • Aadhaar / DL / UPI</div>
            </div>
          </button>

          {/* International Pilgrim Toggle Option */}
          <button
            type="button"
            onClick={() => {
              setUserType('international');
              setValidationErrors({});
            }}
            className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold transition-all duration-300 ${
              userType === 'international'
                ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white shadow-xl scale-[1.02] ring-2 ring-amber-400'
                : 'text-stone-700 hover:bg-amber-200/50 hover:text-stone-900'
            }`}
          >
            <FlagWorldIcon className="text-2xl" />
            <div className="text-left">
              <div className="text-base font-extrabold leading-tight flex items-center gap-2">
                International Pilgrim
                {userType === 'international' && <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>}
              </div>
              <div className="text-xs font-medium opacity-90">Currency: USD ($) • Passport • Multilingual</div>
            </div>
          </button>
        </div>

        {/* Dynamic Context Banner */}
        <div className="mt-3 text-center">
          {userType === 'indian' ? (
            <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2 inline-flex items-center gap-2">
              ✨ Dynamic Form Loaded: Configured for domestic pilgrims with INR pricing, Aadhaar verification & local payment gateways.
            </p>
          ) : (
            <p className="text-xs text-blue-900 bg-blue-50 border border-blue-200 rounded-lg p-2 inline-flex items-center gap-2">
              🌍 Dynamic Form Loaded: Custom tailored for global devotees with USD pricing, mandatory Passport verification, Sattvik meals, and Airport pickup.
            </p>
          )}
        </div>
      </div>

      {/* Confirmation View */}
      {isSubmitted ? (
        <div className="bg-white border-2 border-amber-300 rounded-3xl p-8 sm:p-12 shadow-2xl text-center max-w-2xl mx-auto my-10 animate-fade-in">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircleIcon className="w-12 h-12" />
          </div>

          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
            Booking Request Received
          </span>

          <h2 className="text-3xl font-extrabold text-stone-900 font-cinzel mt-4 mb-2">
            Har Har Mahadev! Jai Shree Ram!
          </h2>

          <p className="text-stone-600 mb-6">
            Thank you, <strong className="text-stone-900">{fullName}</strong>. Your sacred pilgrimage request for{' '}
            <strong className="text-amber-700">{DESTINATIONS.find(d => d.id === destination)?.name}</strong> has been registered successfully.
          </p>

          <div className="bg-amber-50/80 rounded-2xl p-6 text-left border border-amber-200 mb-8 space-y-3">
            <div className="flex justify-between border-b border-amber-200/60 pb-2">
              <span className="text-stone-500 text-sm">Residency Mode:</span>
              <span className="font-bold text-stone-800">{userType === 'indian' ? '🇮🇳 Indian Resident' : '🌐 International Pilgrim'}</span>
            </div>
            <div className="flex justify-between border-b border-amber-200/60 pb-2">
              <span className="text-stone-500 text-sm">Travel Dates:</span>
              <span className="font-bold text-stone-800">{checkInDate} to {checkOutDate} ({durationNights} Nights)</span>
            </div>
            <div className="flex justify-between border-b border-amber-200/60 pb-2">
              <span className="text-stone-500 text-sm">Selected Accommodation:</span>
              <span className="font-bold text-stone-800">{selectedAccom.name}</span>
            </div>
            <div className="flex justify-between border-b border-amber-200/60 pb-2">
              <span className="text-stone-500 text-sm">Guide Language:</span>
              <span className="font-bold text-stone-800">{userType === 'indian' ? indianGuideLang : foreignerGuideLang}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-stone-800 font-extrabold">Estimated Total:</span>
              <span className="font-extrabold text-amber-700 text-lg">
                {priceCalculation.currencySymbol}{priceCalculation.grandTotal.toLocaleString()} {priceCalculation.currencyCode}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition"
            >
              Modify / New Booking
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-amber-500 text-stone-900 rounded-xl font-bold hover:bg-amber-400 transition"
            >
              🖨️ Print Yatra Voucher
            </button>
          </div>
        </div>
      ) : (

        /* MAIN 2-COLUMN BOOKING FORM */
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT FORM COLUMN (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">

            {/* SECTION 1: DESTINATION & ITINERARY (SHARED) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/80 relative">
              <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md">
                  1
                </div>
                <div>
                  <h2 className="text-xl font-bold text-stone-900 font-cinzel">Sacred Destination & Dates</h2>
                  <p className="text-xs text-stone-500">Choose your destination shrine and travel schedule</p>
                </div>
              </div>

              {/* Destination Cards Selector */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-stone-700 mb-3">
                  Select Holy Shrine / Circuit <span className="text-amber-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DESTINATIONS.map((dest) => (
                    <div
                      key={dest.id}
                      onClick={() => setDestination(dest.id)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 relative overflow-hidden ${
                        destination === dest.id
                          ? 'border-amber-500 bg-amber-50/70 shadow-md ring-1 ring-amber-400'
                          : 'border-stone-200 hover:border-amber-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                            {dest.state}
                          </span>
                          <h3 className="font-bold text-stone-900 mt-1">{dest.name}</h3>
                        </div>
                        <input
                          type="radio"
                          name="destination"
                          checked={destination === dest.id}
                          onChange={() => setDestination(dest.id)}
                          className="mt-1 accent-amber-600"
                        />
                      </div>
                      <p className="text-xs text-stone-500 mt-2 line-clamp-1">
                        ✨ {dest.highlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dates & Pilgrims Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full pl-3 pr-3 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-800 text-sm font-medium bg-stone-50/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full pl-3 pr-3 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-800 text-sm font-medium bg-stone-50/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Total Pilgrims
                  </label>
                  <select
                    value={pilgrimsCount}
                    onChange={(e) => setPilgrimsCount(Number(e.target.value))}
                    className="w-full px-3 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-800 text-sm font-medium bg-stone-50/40"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Pilgrim' : 'Pilgrims'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 2: ACCOMMODATION & TRANSPORT (SHARED) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/80">
              <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md">
                  2
                </div>
                <div>
                  <h2 className="text-xl font-bold text-stone-900 font-cinzel">Stay & Private Transport</h2>
                  <p className="text-xs text-stone-500">Select accommodation tier and vehicle preference</p>
                </div>
              </div>

              {/* Accommodation Tier Select */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-stone-700 mb-3">
                  Accommodation Tier
                </label>
                <div className="space-y-3">
                  {ACCOMMODATION_TYPES.map((tier) => {
                    const priceDisplay = userType === 'indian' ? `₹${tier.inr.toLocaleString()} / night` : `$${tier.usd} / night`;
                    return (
                      <label
                        key={tier.id}
                        className={`flex items-start p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          accommodation === tier.id
                            ? 'border-amber-500 bg-amber-50/80 shadow-md'
                            : 'border-stone-200 hover:border-amber-200 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="accommodation"
                          checked={accommodation === tier.id}
                          onChange={() => setAccommodation(tier.id)}
                          className="mt-1 accent-amber-600 mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-stone-900 text-base">
                              {tier.icon} {tier.name}
                            </span>
                            <span className="text-amber-800 font-extrabold text-sm bg-amber-100/90 px-2.5 py-1 rounded-lg">
                              {priceDisplay}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-1">{tier.desc}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Private Transport Selector */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-3">
                  Private AC Vehicle Request
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TRANSPORT_OPTIONS.map((t) => {
                    const priceText = userType === 'indian'
                      ? (t.inrPerDay === 0 ? 'Free / Self' : `₹${t.inrPerDay.toLocaleString()} / day`)
                      : (t.usdPerDay === 0 ? 'Free / Self' : `$${t.usdPerDay} / day`);

                    return (
                      <div
                        key={t.id}
                        onClick={() => setTransport(t.id)}
                        className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                          transport === t.id
                            ? 'border-amber-500 bg-amber-50/70 shadow-sm'
                            : 'border-stone-200 hover:border-amber-200 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-stone-900 text-sm">{t.name}</h4>
                          <span className="text-xs font-bold text-amber-700">{priceText}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 leading-snug">{t.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 3: DYNAMIC USER SPECIFIC FIELDS (INDIAN VS INTERNATIONAL) */}
            <div className={`rounded-3xl p-6 sm:p-8 shadow-xl border-2 transition-all duration-300 ${
              userType === 'indian'
                ? 'bg-amber-50/30 border-amber-300'
                : 'bg-blue-50/30 border-blue-300'
            }`}>
              <div className="flex items-center gap-3 mb-6 border-b border-stone-200/60 pb-4">
                <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold shadow-md ${
                  userType === 'indian' ? 'bg-amber-600' : 'bg-blue-600'
                }`}>
                  3
                </div>
                <div>
                  <h2 className="text-xl font-bold text-stone-900 font-cinzel flex items-center gap-2">
                    {userType === 'indian' ? (
                      <>🇮🇳 Indian Resident Verification & Customs</>
                    ) : (
                      <>🌐 International Pilgrim Passport & Preferences</>
                    )}
                  </h2>
                  <p className="text-xs text-stone-500">
                    {userType === 'indian'
                      ? 'Government ID verification, local language guide & Indian payment options'
                      : 'Passport verification, country of origin, Sattvik meal plan & airport shuttle'}
                  </p>
                </div>
              </div>

              {/* DYNAMIC FORM FIELDS: INDIAN CUSTOMER */}
              {userType === 'indian' && (
                <div className="space-y-6">
                  
                  {/* Indian ID Type & Number */}
                  <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-stone-800 flex items-center gap-2">
                      <ShieldCheckIcon className="text-amber-600" />
                      Indian Government ID Verification (Required for Temple VIP Tokens)
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {INDIAN_ID_TYPES.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setIndianIdType(type.id)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-left transition ${
                            indianIdType === type.id
                              ? 'bg-amber-500 text-stone-900 border-amber-600 shadow-sm'
                              : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        {INDIAN_ID_TYPES.find(i => i.id === indianIdType)?.label} Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={indianIdNumber}
                        onChange={(e) => setIndianIdNumber(e.target.value)}
                        placeholder={INDIAN_ID_TYPES.find(i => i.id === indianIdType)?.placeholder}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                          validationErrors.indianIdNumber
                            ? 'border-red-500 bg-red-50'
                            : 'border-stone-300 focus:ring-2 focus:ring-amber-500'
                        }`}
                      />
                      {validationErrors.indianIdNumber && (
                        <p className="text-xs text-red-600 mt-1 font-semibold">{validationErrors.indianIdNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* Guide Language Selection (Indian Languages) */}
                  <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm">
                    <label className="block text-sm font-bold text-stone-800 mb-2">
                      Preferred Pilgrim Guide Language
                    </label>
                    <select
                      value={indianGuideLang}
                      onChange={(e) => setIndianGuideLang(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-800 text-sm font-medium"
                    >
                      {INDIAN_LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  {/* Addon Checkboxes for Indian Residents */}
                  <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-3">
                    <h3 className="text-sm font-bold text-stone-800">Special Domestic Assistance Add-ons</h3>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addSeniorCitizenAssistance}
                        onChange={(e) => setAddSeniorCitizenAssistance(e.target.checked)}
                        className="w-4 h-4 accent-amber-600 rounded"
                      />
                      <div>
                        <span className="text-xs font-bold text-stone-800">Senior Citizen / Wheelchair Assistance (₹1,500)</span>
                        <p className="text-[11px] text-stone-500">Dedicated temple escort & battery cart priority inside complex</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addPrasadamBox}
                        onChange={(e) => setAddPrasadamBox(e.target.checked)}
                        className="w-4 h-4 accent-amber-600 rounded"
                      />
                      <div>
                        <span className="text-xs font-bold text-stone-800">Blessed Temple Prasadam Home Courier Box (₹750)</span>
                        <p className="text-[11px] text-stone-500">Consecrated Dry Prasadam & Rudraksha delivered to your home address</p>
                      </div>
                    </label>
                  </div>

                </div>
              )}

              {/* DYNAMIC FORM FIELDS: INTERNATIONAL / FOREIGNER CUSTOMER */}
              {userType === 'international' && (
                <div className="space-y-6">

                  {/* Mandatory Passport & Country */}
                  <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-stone-800 flex items-center gap-2">
                      <GlobeIcon className="text-blue-600" />
                      Mandatory Foreign Passport & Nationality Clearance
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                          Passport Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={passportNumber}
                          onChange={(e) => setPassportNumber(e.target.value)}
                          placeholder="e.g. A12345678"
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                            validationErrors.passportNumber
                              ? 'border-red-500 bg-red-50'
                              : 'border-stone-300 focus:ring-2 focus:ring-blue-500'
                          }`}
                        />
                        {validationErrors.passportNumber && (
                          <p className="text-xs text-red-600 mt-1 font-semibold">{validationErrors.passportNumber}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                          Country of Origin / Citizenship <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={countryOfOrigin}
                          onChange={(e) => setCountryOfOrigin(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-500 text-stone-800 text-sm font-medium"
                        >
                          {COUNTRIES_LIST.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Custom Preferences for International Visitors */}
                  <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-stone-800 flex items-center gap-2">
                      <UtensilsIcon className="text-amber-600" />
                      Dietary, Hygiene & Airport Transit Preferences
                    </h3>

                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sattvikMealPlan}
                          onChange={(e) => setSattvikMealPlan(e.target.checked)}
                          className="mt-1 w-4 h-4 accent-blue-600 rounded"
                        />
                        <div>
                          <span className="text-xs font-bold text-stone-800">Strict Sattvik / Pure Vegetarian Dining ($25 / day per person)</span>
                          <p className="text-[11px] text-stone-500">100% Organic, No Onion/Garlic option, ISO-certified hygienic kitchens</p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bottledWaterPackage}
                          onChange={(e) => setBottledWaterPackage(e.target.checked)}
                          className="mt-1 w-4 h-4 accent-blue-600 rounded"
                        />
                        <div>
                          <span className="text-xs font-bold text-stone-800">Ultra-Purified / Sealed Mineral Water Guarantee ($10 / day package)</span>
                          <p className="text-[11px] text-stone-500">Unlimited sealed copper/mineral water bottles provided daily in vehicle & room</p>
                        </div>
                      </label>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 mt-2">
                          VIP Airport Transfer Service
                        </label>
                        <select
                          value={airportTransfer}
                          onChange={(e) => setAirportTransfer(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-800"
                        >
                          <option value="delhi_del">New Delhi International Airport (DEL) Pickup & Return ($65)</option>
                          <option value="varanasi_vns">Varanasi Lal Bahadur Shastri Airport (VNS) Pickup ($45)</option>
                          <option value="chennai_maa">Chennai / Tirupati Airport Pickup ($55)</option>
                          <option value="none">No Airport Transfer Needed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Foreigner Guide Language */}
                  <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm">
                    <label className="block text-sm font-bold text-stone-800 mb-2">
                      Multilingual Cultural Guide Language
                    </label>
                    <select
                      value={foreignerGuideLang}
                      onChange={(e) => setForeignerGuideLang(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-500 text-stone-800 text-sm font-medium"
                    >
                      {FOREIGNER_LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                </div>
              )}

            </div>

            {/* SECTION 4: CONTACT & DYNAMIC PAYMENT SELECTION */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/80 space-y-6">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md">
                  4
                </div>
                <div>
                  <h2 className="text-xl font-bold text-stone-900 font-cinzel">Pilgrim Details & Payment</h2>
                  <p className="text-xs text-stone-500">Enter your contact details and preferred checkout method</p>
                </div>
              </div>

              {/* Primary Pilgrim Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Primary Pilgrim Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name as on ID"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                      validationErrors.fullName ? 'border-red-500 bg-red-50' : 'border-stone-300'
                    }`}
                  />
                  {validationErrors.fullName && <p className="text-xs text-red-600 mt-1">{validationErrors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="for E-Voucher & Pass"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                      validationErrors.email ? 'border-red-500 bg-red-50' : 'border-stone-300'
                    }`}
                  />
                  {validationErrors.email && <p className="text-xs text-red-600 mt-1">{validationErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 or International code"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                      validationErrors.phone ? 'border-red-500 bg-red-50' : 'border-stone-300'
                    }`}
                  />
                  {validationErrors.phone && <p className="text-xs text-red-600 mt-1">{validationErrors.phone}</p>}
                </div>
              </div>

              {/* Dynamic Payment Gateways according to user phase */}
              <div>
                <label className="block text-sm font-bold text-stone-800 mb-3">
                  {userType === 'indian' ? '🇮🇳 Payment Options (INR ₹)' : '🌐 International Gateways (USD $)'}
                </label>
                <div className="space-y-3">
                  {userType === 'indian' ? (
                    INDIAN_PAYMENTS.map((pm) => (
                      <label
                        key={pm.id}
                        className={`flex items-start p-4 rounded-2xl border-2 cursor-pointer transition ${
                          indianPayment === pm.id
                            ? 'border-amber-500 bg-amber-50/80 shadow-sm'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="indianPayment"
                          checked={indianPayment === pm.id}
                          onChange={() => setIndianPayment(pm.id)}
                          className="mt-1 accent-amber-600 mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-stone-900 text-sm">{pm.name}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                              {pm.badge}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5">{pm.desc}</p>
                        </div>
                      </label>
                    ))
                  ) : (
                    FOREIGNER_PAYMENTS.map((pm) => (
                      <label
                        key={pm.id}
                        className={`flex items-start p-4 rounded-2xl border-2 cursor-pointer transition ${
                          foreignerPayment === pm.id
                            ? 'border-blue-500 bg-blue-50/80 shadow-sm'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="foreignerPayment"
                          checked={foreignerPayment === pm.id}
                          onChange={() => setForeignerPayment(pm.id)}
                          className="mt-1 accent-blue-600 mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-stone-900 text-sm">{pm.name}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                              {pm.badge}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5">{pm.desc}</p>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: STICKY LIVE SUMMARY & PRICING CARD (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 bg-stone-900 text-amber-50 rounded-3xl p-6 sm:p-7 shadow-2xl border border-amber-500/30 overflow-hidden">
              
              <div className="flex justify-between items-center border-b border-stone-800 pb-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-extrabold">Yatra Summary</span>
                  <h3 className="text-lg font-bold font-cinzel text-white">Pricing Breakdown</h3>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                  userType === 'indian' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30' : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                }`}>
                  {userType === 'indian' ? 'INR (₹)' : 'USD ($)'}
                </span>
              </div>

              {/* Selected Shrine Tag */}
              <div className="bg-stone-800/80 rounded-xl p-3 border border-amber-500/20 mb-4">
                <div className="text-[10px] text-amber-400 uppercase tracking-wider">Destination</div>
                <div className="font-extrabold text-stone-100 text-sm">
                  {DESTINATIONS.find(d => d.id === destination)?.name}
                </div>
                <div className="text-xs text-stone-400 mt-1">
                  📅 {checkInDate} to {checkOutDate} ({durationNights} Nights) • {pilgrimsCount} {pilgrimsCount === 1 ? 'Pilgrim' : 'Pilgrims'}
                </div>
              </div>

              {/* Dynamic Line Items */}
              <div className="space-y-3 text-xs border-b border-stone-800 pb-4 mb-4">
                <div className="flex justify-between text-stone-300">
                  <span>Stay ({selectedAccom.name}):</span>
                  <span className="font-bold text-stone-100">
                    {priceCalculation.currencySymbol}{priceCalculation.totalStay.toLocaleString()}
                  </span>
                </div>

                {selectedTrans.id !== 'none' && (
                  <div className="flex justify-between text-stone-300">
                    <span>Transport ({selectedTrans.name}):</span>
                    <span className="font-bold text-stone-100">
                      {priceCalculation.currencySymbol}{priceCalculation.totalTransport.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-stone-300">
                  <span>Verified Guide ({userType === 'indian' ? indianGuideLang : foreignerGuideLang}):</span>
                  <span className="font-bold text-stone-100">
                    {priceCalculation.currencySymbol}{priceCalculation.guideFee.toLocaleString()}
                  </span>
                </div>

                {priceCalculation.extrasTotal > 0 && (
                  <div className="flex justify-between text-stone-300">
                    <span>Add-ons & Preferences:</span>
                    <span className="font-bold text-stone-100">
                      {priceCalculation.currencySymbol}{priceCalculation.extrasTotal.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-stone-400 pt-1">
                  <span>Pilgrimage Tourism GST (5%):</span>
                  <span>{priceCalculation.currencySymbol}{priceCalculation.taxGst.toLocaleString()}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-xs text-stone-400 block">Total Payable</span>
                  <span className="text-2xl font-black text-amber-400 font-cinzel">
                    {priceCalculation.currencySymbol}{priceCalculation.grandTotal.toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-1 rounded">
                  ✔ All Temple Fees Included
                </span>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 shadow-xl hover:brightness-110 active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2"
              >
                <LotusIcon className="w-5 h-5 text-stone-900" />
                Book Sacred Yatra Now
              </button>

              <div className="mt-4 text-center">
                <p className="text-[10px] text-stone-400 flex items-center justify-center gap-1">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-amber-400" />
                  Official Temple Token Guarantee • Free Cancellation up to 48 hrs
                </p>
              </div>

            </div>
          </div>

        </form>
      )}

      {/* Footer Branding */}
      <footer className="mt-16 text-center text-xs text-stone-500 border-t border-stone-200/80 pt-6">
        <p className="font-medium text-stone-600">
          Divine Yatra © 2026 • Sacred Pilgrimage Tourism Board Partner • Ayodhya, Varanasi, Mathura, Haridwar & Tirupati Shrines
        </p>
      </footer>

    </div>
  );
}
