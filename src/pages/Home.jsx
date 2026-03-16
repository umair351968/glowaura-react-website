// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { 
  Leaf, Droplets, LeafyGreen, Award, Sparkles, Star, Heart, ShoppingBag 
} from 'lucide-react';
import products from "../data/products.js";
import { addToCart as addToCartStorage, isFavorite, addToFavorites, removeFromFavorites } from '../utils/storageManager';

const collections = [
  { name: "Lip Collection", description: "Velvet mattes & high-shines", img: "https://images.pexels.com/photos/7810635/pexels-photo-7810635.jpeg", color: "#b76e79" },
  { name: "Eye Makeup", description: "Mesmerizing looks", img: "https://images.pexels.com/photos/1383537/pexels-photo-1383537.jpeg", color: "#8a6d8b" },
  { name: "Face Makeup", description: "Flawless complexion", img: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg", color: "#e8b4b8" },
  { name: "Nail Collection", description: "Perfectly polished", img: "https://images.pexels.com/photos/10390405/pexels-photo-10390405.jpeg", color: "#c49a9c" },
  { name: "Skincare", description: "Nourish your glow", img: "https://images.pexels.com/photos/4841454/pexels-photo-4841454.jpeg", color: "#f7cac9" },
  { name: "Cream Collection", description: "Luxurious hydration", img: "https://images.pexels.com/photos/16667096/pexels-photo-16667096.jpeg", color: "#d4af37" },
];

function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCollection, setHoveredCollection] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});

  const heroSlides = [
    {
      title: 'GlowAura Beauty',
      subtitle: 'Where Radiance Meets Luxury',
      description: 'Discover our curated collection of premium cosmetics',
      img: 'https://images.pexels.com/photos/3148938/pexels-photo-3148938.jpeg',
      btnText: 'Shop Collection',
      btnLink: '/shop',
    },
    {
      title: 'Lip Collection',
      subtitle: 'Velvet Matte Perfection',
      description: 'Long-lasting, creamy formulas for every occasion',
      img: 'https://images.pexels.com/photos/1625037/pexels-photo-1625037.jpeg',
      btnText: 'Explore Lips',
      btnLink: '/shop?category=lips',
    },
    {
      title: 'New Arrivals',
      subtitle: 'Spring 2024 Collection',
      description: 'Fresh shades and innovative formulas',
      img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1400&fit=crop',
      btnText: 'Discover Now',
      btnLink: '/shop?filter=new',
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Velvet Matte Lipstick",
      category: "Lipstick",
      price: 24.99,
      originalPrice: 32.99,
      rating: 4.5,
      reviews: 128,
      image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg",
      badge: "Bestseller",
      shade: "Rose Petal"
    },
    {
      id: 2,
      name: "Vitamin C Serum",
      category: "Skincare",
      price: 48.99,
      originalPrice: 62.99,
      rating: 4.8,
      reviews: 345,
      image: "https://images.pexels.com/photos/6621367/pexels-photo-6621367.jpeg",
      badge: "New",
      shade: "Brightening"
    },
    {
      id: 3,
      name: "Eyeshadow Palette",
      category: "Eyes",
      price: 45.99,
      originalPrice: 58.99,
      rating: 4.7,
      reviews: 312,
      image: "https://images.pexels.com/photos/2533265/pexels-photo-2533265.jpeg",
      badge: "Limited",
      shade: "Sunset Glow"
    },
    {
      id: 4,
      name: "Hydrating Moisturizer",
      category: "Skincare",
      price: 38.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 278,
      image: "https://images.pexels.com/photos/3738345/pexels-photo-3738345.jpeg",
      badge: "Bestseller",
      shade: "24H Hydration"
    },
    {
      id: 5,
      name: "Liquid Lipstick",
      category: "Lipstick",
      price: 22.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 94,
      image: "https://images.pexels.com/photos/7810635/pexels-photo-7810635.jpeg",
      badge: "New",
      shade: "Cherry Blossom"
    },
    {
      id: 6,
      name: "Mascara Volume Boost",
      category: "Eyes",
      price: 26.99,
      originalPrice: 34.99,
      rating: 4.6,
      reviews: 203,
      image: "https://images.pexels.com/photos/1383537/pexels-photo-1383537.jpeg",
      badge: "Bestseller",
      shade: "Black"
    },
    {
      id: 7,
      name: "BB Cream",
      category: "Face",
      price: 32.99,
      originalPrice: null,
      rating: 4.5,
      reviews: 134,
      image: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg",
      badge: null,
      shade: "Light Medium"
    },
    {
      id: 8,
      name: "Nail Polish",
      category: "Nails",
      price: 15.99,
      originalPrice: 19.99,
      rating: 4.5,
      reviews: 67,
      image: "https://images.pexels.com/photos/10390405/pexels-photo-10390405.jpeg",
      badge: "Sale",
      shade: "Rose Gold"
    }
  ];
  
  const benefits = [
    { icon: Sparkles, title: "Clean Beauty", desc: "Formulated without harmful ingredients", color: "#b76e79" },
    { icon: Droplets, title: "Hydrating Power", desc: "Deep moisture for lasting results", color: "#8a6d8b" },
    { icon: Leaf, title: "Cruelty Free", desc: "Never tested on animals", color: "#e8b4b8" },
    { icon: Award, title: "Award Winning", desc: "Recognized by beauty experts", color: "#d4af37" },
  ];

  const testimonials = [
    { name: "Sarah J.", text: "The best lipsticks I've ever tried! Long-lasting and so comfortable.", rating: 5, product: "Velvet Matte Lipstick" },
    { name: "Emma R.", text: "My skin has never looked better. The Vitamin C serum is magic!", rating: 5, product: "Vitamin C Serum" },
    { name: "Olivia P.", text: "Luxurious packaging and amazing quality. Worth every penny.", rating: 5, product: "Eyeshadow Palette" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (productId) => {
    // Find the product
    const product = products.find(p => p.id === productId);
    
    if (product) {
      // Add to localStorage using storage manager
      addToCartStorage(product);
      
      // Dispatch event to update cart
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Show "Added!" feedback
      setAddedToCart({ ...addedToCart, [productId]: true });
      setTimeout(() => {
        setAddedToCart({ ...addedToCart, [productId]: false });
        console.log(`✅ Product ${productId} added to cart from Home`);
      }, 500);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className="home">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap');

        :root {
          --primary-pink: #b76e79;
          --primary-gold: #d4af37;
          --primary-beige: #f5f0e8;
          --primary-white: #ffffff;
          --primary-dark: #5a4e4a;
          --secondary-mauve: #8a6d8b;
          --secondary-blush: #e8b4b8;
          --secondary-peach: #f7cac9;
          --gradient-1: linear-gradient(135deg, #b76e79, #d4af37);
          --gradient-2: linear-gradient(135deg, #f8d7da, #fff0f0);
          --gradient-3: linear-gradient(135deg, #fff5f5, #ffffff);
          --shadow-sm: 0 4px 12px rgba(183, 110, 121, 0.1);
          --shadow-md: 0 8px 24px rgba(183, 110, 121, 0.15);
          --shadow-lg: 0 16px 40px rgba(183, 110, 121, 0.2);
          --border-radius-sm: 12px;
          --border-radius-md: 20px;
          --border-radius-lg: 30px;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .home {
          background: linear-gradient(135deg, #fff9f9 0%, #fff5f5 100%);
          color: var(--primary-dark);
          font-family: 'Poppins', sans-serif;
          overflow-x: hidden;
        }

        /* Hero Slider */
        .hero-slider {
          height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .hero-slide {
          height: 100%;
          width: 100%;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 1s ease;
        }

        .hero-slide.active {
          opacity: 1;
        }

        .hero-slide::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1));
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 900px;
          padding: 0 2rem;
          animation: fadeInUp 1s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-subtitle {
          font-size: 1.2rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 8vw, 5.5rem);
          margin-bottom: 1rem;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .hero-description {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-btn {
          padding: 1rem 3rem;
          background: var(--gradient-1);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(183, 110, 121, 0.4);
          border: 1px solid rgba(255,255,255,0.3);
        }

        .hero-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4);
        }

        .slide-indicators {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
          z-index: 10;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: white;
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }

        /* Sections */
        .section {
          padding: 6rem 5%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-subtitle {
          color: var(--primary-pink);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 2.5rem);
          color: var(--primary-dark);
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        /* Collections Grid */
        .collections-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .collection-card {
          background: white;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .collection-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-lg);
        }

        .collection-image {
          position: relative;
          height: 280px;
          overflow: hidden;
        }

        .collection-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .collection-card:hover .collection-image img {
          transform: scale(1.1);
        }

        .collection-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
        }

        .collection-content {
          padding: 2rem;
          text-align: center;
        }

        .collection-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: var(--primary-dark);
          margin-bottom: 0.5rem;
        }

        .collection-description {
          color: var(--primary-pink);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .explore-btn {
          padding: 0.8rem 2rem;
          background: transparent;
          border: 2px solid var(--primary-pink);
          color: var(--primary-pink);
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .explore-btn:hover {
          background: var(--primary-pink);
          color: white;
        }

        /* Benefits Grid */
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }

        .benefit-card {
          background: white;
          padding: 2.5rem;
          border-radius: var(--border-radius-md);
          text-align: center;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }

        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .benefit-icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: var(--gradient-2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .benefit-icon {
          width: 40px;
          height: 40px;
          color: var(--primary-pink);
        }

        .benefit-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          color: var(--primary-dark);
          margin-bottom: 0.5rem;
        }

        .benefit-desc {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        /* Featured Products - Styled Cards */
        .featured-section {
          background: var(--gradient-3);
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }

        .product-card {
          background: white;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }

        .product-image-container {
          position: relative;
          padding-top: 100%;
          overflow: hidden;
          background: var(--gradient-2);
        }

        .product-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.1);
        }

        .product-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.3rem 1rem;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 600;
          z-index: 2;
          box-shadow: var(--shadow-sm);
        }

        .badge-bestseller {
          background: var(--gradient-1);
          color: white;
        }

        .badge-new {
          background: var(--secondary-mauve);
          color: white;
        }

        .badge-limited {
          background: var(--primary-gold);
          color: white;
        }

        .badge-sale {
          background: var(--primary-pink);
          color: white;
        }

        .product-wishlist {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: white;
          border: none;
          color: var(--primary-pink);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 2;
          box-shadow: var(--shadow-sm);
        }

        .product-wishlist:hover {
          background: var(--primary-pink);
          color: white;
          transform: scale(1.1);
        }

        .product-shade {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(5px);
          padding: 0.3rem 1rem;
          border-radius: 50px;
          font-size: 0.7rem;
          color: var(--primary-dark);
          font-weight: 500;
          z-index: 2;
          box-shadow: var(--shadow-sm);
        }

        .product-info {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-category {
          color: var(--primary-pink);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.3rem;
        }

        .product-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          color: var(--primary-dark);
          margin-bottom: 0.5rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .stars {
          display: flex;
          gap: 2px;
        }

        .star {
          font-size: 1rem;
        }

        .star.filled {
          color: var(--primary-gold);
        }

        .star.half {
          color: var(--primary-gold);
          position: relative;
        }

        .star.empty {
          color: #ddd;
        }

        .rating-count {
          color: #999;
          font-size: 0.75rem;
        }

        .product-price-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .product-price {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--primary-pink);
        }

        .product-original-price {
          font-size: 0.9rem;
          color: #999;
          text-decoration: line-through;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 0.8rem;
          background: transparent;
          border: 2px solid var(--primary-pink);
          color: var(--primary-pink);
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          margin-top: auto;
        }

        .add-to-cart-btn:hover {
          background: var(--gradient-1);
          color: white;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(183, 110, 121, 0.3);
        }

        .add-to-cart-btn.added {
          background: var(--gradient-1);
          color: white;
          border-color: transparent;
        }

        .add-to-cart-btn svg {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .add-to-cart-btn:hover svg {
          transform: translateX(3px);
        }

        /* Testimonials */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .testimonial-card {
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-sm);
          position: relative;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: -20px;
          left: 20px;
          font-size: 5rem;
          color: var(--primary-pink);
          opacity: 0.2;
          font-family: 'Playfair Display', serif;
        }

        .testimonial-rating {
          color: var(--primary-gold);
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .testimonial-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #666;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonial-author {
          font-weight: 600;
          color: var(--primary-dark);
        }

        .testimonial-product {
          font-size: 0.85rem;
          color: var(--primary-pink);
        }

        /* Newsletter */
        .newsletter-section {
          background: var(--gradient-1);
          color: white;
          text-align: center;
          padding: 5rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .newsletter-section::before {
          content: '✨';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 15rem;
          opacity: 0.1;
          pointer-events: none;
        }

        .newsletter-content {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .newsletter-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .newsletter-text {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .newsletter-form {
          display: flex;
          gap: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .newsletter-input {
          flex: 1;
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          outline: none;
          background: rgba(255,255,255,0.9);
        }

        .newsletter-btn {
          padding: 1rem 2rem;
          background: white;
          color: var(--primary-pink);
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .newsletter-btn:hover {
          background: var(--primary-dark);
          color: white;
        }

        /* Announcement Bar */
        .announcement-bar {
          background: var(--gradient-1);
          color: white;
          text-align: center;
          padding: 0.75rem;
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          position: relative;
          z-index: 999;
          animation: slideDown 0.5s ease;
        }

        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .collections-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .featured-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .section {
            padding: 4rem 5%;
          }

          .collections-grid {
            grid-template-columns: 1fr;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .newsletter-form {
            flex-direction: column;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
          }
          
          .featured-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.8rem;
          }

          .collection-card {
            margin: 0 1rem;
          }
          
          .product-info {
            padding: 1rem;
          }
          
          .product-name {
            font-size: 1rem;
          }
        }
      `}</style>

      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>✨ Free Shipping on Orders $50+ | 20% Off First Order with Code: GLOW20 ✨</span>
      </div>

      {/* Hero Slider */}
      <section className="hero-slider">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="hero-content">
              <p className="hero-subtitle">{slide.subtitle}</p>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-description">{slide.description}</p>
              <button 
                className="hero-btn"
                onClick={() => navigate(slide.btnLink)}
              >
                {slide.btnText}
              </button>
            </div>
          </div>
        ))}
        
        <div className="slide-indicators">
          {heroSlides.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="section">
        <div className="section-header">
          <p className="section-subtitle">Explore</p>
          <h2 className="section-title">Our Collections</h2>
        </div>

        <div className="collections-grid">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="collection-card"
              onMouseEnter={() => setHoveredCollection(index)}
              onMouseLeave={() => setHoveredCollection(null)}
              onClick={() => navigate('/shop')}
            >
              <div className="collection-image">
                <img src={collection.img} alt={collection.name} />
                <div className="collection-overlay" />
              </div>
              <div className="collection-content">
                <h3 className="collection-name">{collection.name}</h3>
                <p className="collection-description">{collection.description}</p>
                <button className="explore-btn">Explore Collection</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: 'var(--gradient-2)' }}>
        <div className="section-header">
          <p className="section-subtitle">Why Choose Us</p>
          <h2 className="section-title">The GlowAura Difference</h2>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon-wrapper">
                <benefit.icon className="benefit-icon" />
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-desc">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products - Styled Cards */}
      <section className="section featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
        </div>

        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                
                {/* Badge */}
                {product.badge && (
                  <span className={`product-badge badge-${product.badge.toLowerCase()}`}>
                    {product.badge}
                  </span>
                )}
                
                {/* Wishlist Button */}
                <button className="product-wishlist">
                  <Heart size={16} />
                </button>
                
                {/* Shade */}
                {product.shade && (
                  <span className="product-shade">
                    {product.shade}
                  </span>
                )}
              </div>
              
              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3 className="product-name">{product.name}</h3>
                
                <div className="product-rating">
                  <div className="stars">
                    {renderStars(product.rating)}
                  </div>
                  <span className="rating-count">({product.reviews})</span>
                </div>
                
                <div className="product-price-container">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="product-original-price">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                
                <button 
                  className={`add-to-cart-btn ${addedToCart[product.id] ? 'added' : ''}`}
                  onClick={() => handleAddToCart(product.id)}
                >
                  {addedToCart[product.id] ? 'Added!' : 'Add to Cart'}
                  <ShoppingBag size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="section-header">
          <p className="section-subtitle">Happy Customers</p>
          <h2 className="section-title">Loved by Thousands</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {'★'.repeat(testimonial.rating)}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-author">- {testimonial.name}</p>
              <p className="testimonial-product">{testimonial.product}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Join the GlowAura Family</h2>
          <p className="newsletter-text">Subscribe for exclusive offers, beauty tips, and early access to new collections</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.8 }}>
            By subscribing, you agree to our Privacy Policy
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;