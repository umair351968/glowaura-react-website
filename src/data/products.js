const products = [
  // Lip Collection
  {
    id: 1,
    name: "Velvet Matte Lipstick",
    price: "$19.99",
    rating: "⭐⭐⭐⭐⭐ (4.8)",
    description: "Luxury matte finish with 12-hour wear. Available in 15 shades.",
    image: "https://images.pexels.com/photos/31154612/pexels-photo-31154612.jpeg",
    category: "lip-collection/matte-lipstick"
  },
  {
    id: 2,
    name: "Silk Liquid Lipstick",
    price: "$24.99",
    rating: "⭐⭐⭐⭐⭐ (4.9)",
    description: "Transfer-proof liquid lipstick with velvet finish.",
    image: "https://images.pexels.com/photos/30408334/pexels-photo-30408334.jpeg",
    category: "lip-collection/liquid-lipstick"
  },
  {
    id: 3,
    name: "Diamond Lip Gloss",
    price: "$18.99",
    rating: "⭐⭐⭐⭐ (4.7)",
    description: "High-shine gloss with plumping effect and mirror shine.",
    image: "https://images.pexels.com/photos/15854300/pexels-photo-15854300.jpeg",
    category: "lip-collection/lip-gloss"
  },
  {
    id: 4,
    name: "Rosewater Lip Tint",
    price: "$16.99",
    rating: "⭐⭐⭐⭐⭐ (4.8)",
    description: "Natural tint with rose extract for hydrated lips.",
    image: "https://images.pexels.com/photos/7810602/pexels-photo-7810602.jpeg",
    category: "lip-collection/lip-tint"
  },
  {
    id: 5,
    name: "Honey Lip Balm",
    price: "$14.99",
    rating: "⭐⭐⭐⭐⭐ (4.9)",
    description: "Nourishing balm with SPF 15 and honey extract.",
    image: "https://images.pexels.com/photos/4044978/pexels-photo-4044978.jpeg",
    category: "lip-collection/lip-balm"
  },
  // Eye Makeup
  {
    id: 6,
    name: "Lash Volume Mascara",
    price: "$26.99",
    rating: "⭐⭐⭐⭐⭐ (4.8)",
    description: "Clump-free mascara for dramatic volume.",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300",
    category: "eye-makeup/mascara"
  },
  {
    id: 7,
    name: "Precision Eyeliner",
    price: "$20.99",
    rating: "⭐⭐⭐⭐ (4.7)",
    description: "Liquid eyeliner with ultra-fine tip.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300",
    category: "eye-makeup/eyeliner"
  },
  {
    id: 8,
    name: "Nude Eyeshadow Palette",
    price: "$38.99",
    rating: "⭐⭐⭐⭐⭐ (4.9)",
    description: "12-shade palette for everyday to evening looks.",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300",
    category: "eye-makeup/eyeshadow-palette"
  },
  {
    id: 9,
    name: "Brow Sculpt Pencil",
    price: "$19.99",
    rating: "⭐⭐⭐⭐⭐ (4.8)",
    description: "Dual-ended brow pencil with spoolie.",
    image: "https://images.pexels.com/photos/6200499/pexels-photo-6200499.jpeg",
    category: "eye-makeup/eyebrow-pencil"
  },
  {
    id: 10,
    name: "Smokey Kajal",
    price: "$17.99",
    rating: "⭐⭐⭐⭐ (4.6)",
    description: "Long-lasting kajal for defined eyes.",
    image: "https://images.pexels.com/photos/4009625/pexels-photo-4009625.jpeg",
    category: "eye-makeup/kajal"
  },
  // Face Makeup
  {
    id: 11,
    name: "Dewy Foundation",
    price: "$42.99",
    rating: "⭐⭐⭐⭐ (4.6)",
    description: "Buildable coverage with radiant finish.",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300",
    category: "face-makeup/foundation"
  },
  {
    id: 12,
    name: "Rose BB Cream",
    price: "$32.99",
    rating: "⭐⭐⭐⭐⭐ (4.9)",
    description: "Tinted moisturizer with SPF 25.",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300",
    category: "face-makeup/bb-cream"
  },
  {
    id: 13,
    name: "Brightening Concealer",
    price: "$25.99",
    rating: "⭐⭐⭐⭐⭐ (4.8)",
    description: "Creamy concealer that brightens under eyes.",
    image: "https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg",
    category: "face-makeup/concealer"
  },
  {
    id: 14,
    name: "Silky Powder",
    price: "$28.99",
    rating: "⭐⭐⭐⭐ (4.7)",
    description: "Pressed powder for flawless matte finish.",
    image: "https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg",
    category: "face-makeup/compact-powder"
  },
  {
    id: 15,
    name: "Peach Blush",
    price: "$23.99",
    rating: "⭐⭐⭐⭐⭐ (4.8)",
    description: "Buildable powder blush for natural glow.",
    image: "https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg",
    category: "face-makeup/blush"
  },
  // Nail Collection
  {
    id: 16,
    name: "Pearl Nail Polish",
    price: "$18.99",
    rating: "⭐⭐⭐⭐⭐ (4.9)",
    description: "Shimmering polish in 15 shades.",
    image: "https://images.pexels.com/photos/7321732/pexels-photo-7321732.jpeg",
    category: "nail-collection/nail-polish"
  },
  {
    id: 17,
    name: "UV Gel Polish",
    price: "$34.99",
    rating: "⭐⭐⭐⭐ (4.7)",
    description: "Professional gel polish system.",
    image: "https://images.pexels.com/photos/1059827/pexels-photo-1059827.jpeg",
    category: "nail-collection/gel-nail-polish"
  },
  {
    id: 18,
    name: "Diamond Nail Art Kit",
    price: "$29.99",
    rating: "⭐⭐⭐⭐⭐ (4.8)",
    description: "Complete kit for salon-quality art.",
    image: "https://images.pexels.com/photos/1059827/pexels-photo-1059827.jpeg",
    category: "nail-collection/nail-art-kit"
  },
  {
    id: 19,
    name: "Soy Nail Remover",
    price: "$13.99",
    rating: "⭐⭐⭐⭐⭐ (4.9)",
    description: "Gentle, acetone-free remover.",
    image: "https://images.pexels.com/photos/7321732/pexels-photo-7321732.jpeg",
    category: "nail-collection/nail-remover"
  },
  {
    id: 20,
    name: "Argan Nail Oil",
    price: "$16.99",
    rating: "⭐⭐⭐⭐ (4.6)",
    description: "Strengthening oil with dropper.",
    image: "https://images.pexels.com/photos/1059827/pexels-photo-1059827.jpeg",
    category: "nail-collection/nail-care-oil"
  },
  // Skincare
  {
    id: 21,
    name: "Rose Face Wash",
    price: "$24.99",
    rating: "⭐⭐⭐⭐⭐ (4.9)",
    description: "Creamy cleanser with rose water.",
    image: "https://images.pexels.com/photos/28255123/pexels-photo-28255123.jpeg",
    category: "skincare/face-wash"
  },
  {
    id: 22,
    name: "Glow Serum",
    price: "$52.99",
    rating: "⭐⭐⭐⭐⭐ (4.9)",
    description: "Hyaluronic acid + vitamin C serum.",
    image: "https://images.pexels.com/photos/28255123/pexels-photo-28255123.jpeg",
    category: "skincare/serum"
  },
  {
    id: 23,
    name: "Silk Moisturizer",
    price: "$38.99",
    rating: "⭐⭐⭐⭐ (4.7)",
    description: "Lightweight moisturizer for day/night.",
    image: "https://images.pexels.com/photos/5949027/pexels-photo-5949027.jpeg",
    category: "skincare/moisturizer"
  },
  {
    id: 24,
    name: "Mineral Sunscreen",
    price: "$32.99",
    rating: "⭐⭐⭐⭐⭐ (4.8)",
    description: "SPF 50 mineral sunscreen.",
    image: "https://images.pexels.com/photos/4009625/pexels-photo-4009625.jpeg",
    category: "skincare/sunscreen"
  },
  {
    id: 25,
    name: "Gold Face Mask",
    price: "$28.99",
    rating: "⭐⭐⭐⭐⭐ (4.8)",
    description: "24k gold sheet mask.",
    image: "https://images.pexels.com/photos/28255123/pexels-photo-28255123.jpeg",
    category: "skincare/face-mask"
  }
];

export default products;
