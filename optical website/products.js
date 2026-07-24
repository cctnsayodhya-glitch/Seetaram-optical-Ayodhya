// Products Database for Seetaram Eye Care & Optical Ayodhya
const PRODUCTS = [
  // EYEGLASSES
  {
    id: 'eg-1',
    name: 'Classic Clubmaster Gold',
    brand: 'Ray-Ban',
    category: 'eyeglasses',
    gender: 'unisex',
    price: 8490,
    shape: 'clubmaster',
    material: 'metal',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600',
    description: 'A timeless icon of style, the Clubmaster features a bold upper frame in acetate combined with sleek metal rims. Ideal for a professional yet creative look.',
    features: ['Premium Acetate & Metal Frame', 'Adjustable Nose Pads', 'Compatible with Progressive Lenses', 'Includes Leather Case'],
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'eg-2',
    name: 'Sleek Rectangle Titanium',
    brand: 'Silhouette',
    category: 'eyeglasses',
    gender: 'men',
    price: 14500,
    shape: 'rectangle',
    material: 'titanium',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600',
    description: 'Ultra-lightweight rimless design crafted from aerospace-grade beta titanium. Offers unparalleled comfort and a minimalist aesthetic.',
    features: ['Hypoallergenic Beta-Titanium', 'Rimless Minimalist Design', 'Weight: Only 3 grams', 'Made in Austria'],
    inStock: true,
    rating: 4.9,
    reviews: 56
  },
  {
    id: 'eg-3',
    name: 'Vintage Round Tortoise',
    brand: 'Tom Ford',
    category: 'eyeglasses',
    gender: 'women',
    price: 12900,
    shape: 'round',
    material: 'acetate',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600',
    description: 'A chic round shape with the signature Tom Ford "T" gold metal inlay at the temples. Crafted from rich tortoiseshell Italian acetate.',
    features: ['Signature Gold T Logo', 'Hand-polished Italian Acetate', 'Flexible Spring Hinges', 'Scratch-resistant Demo Lenses'],
    inStock: true,
    rating: 4.7,
    reviews: 82
  },
  {
    id: 'eg-4',
    name: 'Modern Cat-Eye Blush',
    brand: 'Vogue',
    category: 'eyeglasses',
    gender: 'women',
    price: 4590,
    shape: 'cat-eye',
    material: 'tr90',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600',
    description: 'Playful yet sophisticated cat-eye frames in a translucent blush pink. Made from flexible, durable, and highly lightweight TR90 material.',
    features: ['Lightweight TR90 Material', 'Translucent Glossy Finish', 'Perfect for Heart & Oval Face Shapes', 'Ergonomic Bridge Design'],
    inStock: true,
    rating: 4.6,
    reviews: 95
  },
  {
    id: 'eg-5',
    name: 'Junior Active Flex',
    brand: 'Oakley Youth',
    category: 'eyeglasses',
    gender: 'kids',
    price: 3890,
    shape: 'rectangle',
    material: 'tr90',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600',
    description: 'Durable and highly flexible eyeglasses designed specifically for active kids. Features O-Matter shape retention technology and soft grip temples.',
    features: ['O-Matter Strain-Resistant Frame', 'Unobtainium Temple Sleeves (No Slip)', 'Child-Safe Hinge System', 'Impact Resistant'],
    inStock: true,
    rating: 4.5,
    reviews: 41
  },

  // SUNGLASSES
  {
    id: 'sg-1',
    name: 'Aviator Classic Polarized',
    brand: 'Ray-Ban',
    category: 'sunglasses',
    gender: 'unisex',
    price: 9990,
    shape: 'aviator',
    material: 'metal',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
    description: 'The world\'s most iconic sunglasses. Originally designed for US aviators in 1937, featuring gold-tone metal frames and G-15 polarized green lenses.',
    features: ['G-15 Polarized Lenses', '100% UV400 Protection', 'Classic Gold Metal Frame', 'Reduces Glare and Eye Strain'],
    inStock: true,
    rating: 4.9,
    reviews: 310
  },
  {
    id: 'sg-2',
    name: 'Holbrook Matte Black',
    brand: 'Oakley',
    category: 'sunglasses',
    gender: 'men',
    price: 8590,
    shape: 'wayfarer',
    material: 'tr90',
    image: 'https://images.unsplash.com/photo-1625591339768-435730b3d45e?auto=format&fit=crop&q=80&w=600',
    description: 'A classic design merged with modern Oakley technology. Inspired by screen heroes from the 1940s, 50s, and 60s, featuring Prizm polarized lenses.',
    features: ['Prizm Lens Technology', 'Lightweight O-Matter Frame', 'Plutonite Lens Material (UV Protection)', 'Matte Black Finish'],
    inStock: true,
    rating: 4.8,
    reviews: 145
  },
  {
    id: 'sg-3',
    name: 'Oversized Baroque Glamour',
    brand: 'Prada',
    category: 'sunglasses',
    gender: 'women',
    price: 21000,
    shape: 'round',
    material: 'acetate',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=600',
    description: 'Stunning oversized round sunglasses with distinctive baroque scroll temples. Handcrafted in Italy, featuring dark grey gradient lenses.',
    features: ['Baroque Scroll Temple Styling', 'Oversized Fashion Design', '100% UVA/UVB Protection', 'Luxury Prada Presentation Box'],
    inStock: true,
    rating: 4.9,
    reviews: 73
  },
  {
    id: 'sg-4',
    name: 'Sport Shield Radar EV',
    brand: 'Oakley',
    category: 'sunglasses',
    gender: 'unisex',
    price: 11990,
    shape: 'wrap-around',
    material: 'tr90',
    image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=600',
    description: 'A new milestone in the heritage of performance, Radar EV takes breakthroughs of a revolutionary design even further with a taller lens.',
    features: ['Radar Shield Single Lens', 'Prizm Road Enhanced Vision', 'Unobtainium Earsocks & Nosepads', 'Protective Sports Vault Included'],
    inStock: true,
    rating: 4.7,
    reviews: 62
  },
  {
    id: 'sg-5',
    name: 'Trendy Hexagonal Metal',
    brand: 'Ray-Ban',
    category: 'sunglasses',
    gender: 'unisex',
    price: 9290,
    shape: 'round',
    material: 'metal',
    image: 'https://images.unsplash.com/photo-1614713570650-d3493e875918?auto=format&fit=crop&q=80&w=600',
    description: 'What do you get when you cross a circle with a square? You get the hexagonal Ray-Ban 3548N. A slim, sleek profile with flat crystal lenses.',
    features: ['Flat Crystal Lenses', 'Hexagonal Slim Metal Frame', 'Comfortable Silicone Nose Pads', 'Unisex Geometric Design'],
    inStock: true,
    rating: 4.6,
    reviews: 118
  },

  // CONTACT LENSES
  {
    id: 'cl-1',
    name: 'Acuvue Moist Daily (30 Pack)',
    brand: 'Johnson & Johnson',
    category: 'contact-lenses',
    gender: 'unisex',
    price: 2450,
    type: 'spherical',
    disposability: 'daily',
    image: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=600',
    description: '1-Day Acuvue Moist contact lenses provide exceptional comfort throughout the day. Features Lacreon technology for a long-lasting cushion of moisture.',
    features: ['Lacreon Technology Moisture Lock', 'Class 2 UV Protection', 'Daily Disposable Convenience', '30 Lenses per Box'],
    inStock: true,
    rating: 4.8,
    reviews: 204
  },
  {
    id: 'cl-2',
    name: 'Air Optix Plus HydraGlyde (6 Pack)',
    brand: 'Alcon',
    category: 'contact-lenses',
    gender: 'unisex',
    price: 1850,
    type: 'spherical',
    disposability: 'monthly',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=600',
    description: 'Monthly disposable contact lenses designed for outstanding comfort from day 1 to day 30. Features SmartShield technology to resist irritating deposits.',
    features: ['SmartShield Deposit Resistance', 'HydraGlyde Moisture Matrix', 'Highly Breathable Silicone Hydrogel', '6 Lenses per Box'],
    inStock: true,
    rating: 4.7,
    reviews: 112
  },
  {
    id: 'cl-3',
    name: 'Biofinity Toric Astigmatism (6 Pack)',
    brand: 'Cooper Vision',
    category: 'contact-lenses',
    gender: 'unisex',
    price: 3100,
    type: 'toric',
    disposability: 'monthly',
    image: 'https://images.unsplash.com/photo-1507919909716-c8262e491cde?auto=format&fit=crop&q=80&w=600',
    description: 'High-performance monthly lenses for astigmatism. Optimized Lens Geometry ensures stability, clear vision, and all-day comfort.',
    features: ['Optimized Toric Ballast Design', 'Aquaform Breathability & Moisture', 'Stays stable during eye movement', '6 Lenses per Box'],
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 'cl-4',
    name: 'Freshlook Colorblends (2 Pack)',
    brand: 'Alcon',
    category: 'contact-lenses',
    gender: 'unisex',
    price: 1150,
    type: 'colour',
    disposability: 'monthly',
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=600',
    description: 'Enhance your look with natural-looking colored contact lenses. Features 3-in-1 color technology that blends with your natural eye color.',
    features: ['3-in-1 Color Blending Tech', 'Available in Power & Zero Power', 'Comfortable monthly replacement schedule', '2 Lenses per Pack'],
    inStock: true,
    rating: 4.5,
    reviews: 135
  }
];

const BRANDS = [
  { name: 'Ray-Ban', logoText: 'Ray-Ban', desc: 'Timeless style and pioneering lens technology.' },
  { name: 'Oakley', logoText: 'Oakley', desc: 'High-performance sports eyewear and innovation.' },
  { name: 'Prada', logoText: 'Prada', desc: 'Italian luxury, modern design, and couture elegance.' },
  { name: 'Tom Ford', logoText: 'Tom Ford', desc: 'Sophisticated glamour and exquisite craftsmanship.' },
  { name: 'Silhouette', logoText: 'Silhouette', desc: 'Austrian-engineered rimless titanium perfection.' },
  { name: 'Zeiss', logoText: 'ZEISS', desc: 'World-renowned German precision optical lenses.' },
  { name: 'Essilor', logoText: 'Essilor', desc: 'Global leader in prescription ophthalmic lenses.' }
];

const TESTIMONIALS = [
  {
    name: 'Dr. Ramesh Tripathi',
    role: 'Retired Professor, Ayodhya',
    text: 'Seetaram Eye Care provided me with the most precise progressive glasses I have ever worn. Their testing facility is at par with the best clinics in Delhi, and the hospitality is top-notch.',
    rating: 5
  },
  {
    name: 'Anjali Verma',
    role: 'Software Engineer',
    text: 'I ordered my Oakley sunglasses and contact lenses here. The options are amazing, and the staff helped me choose the perfect frames for my round face using their style finder. Highly recommended!',
    rating: 5
  },
  {
    name: 'Sanjeev Mishra',
    role: 'Business Owner, Ayodhya',
    text: 'Very professional opticians. I got my eyes checked for cataracts and ordered ZEISS SmartLife lenses. The clarity is exceptional, and they took care of all sanitization protocols.',
    rating: 5
  }
];

// Export logic for Node or browser compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS, BRANDS, TESTIMONIALS };
}
