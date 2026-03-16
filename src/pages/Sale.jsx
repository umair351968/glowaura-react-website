// src/pages/Sale.jsx
import { useState, useEffect } from 'react';
import { 
  ShoppingBag, Heart, Clock, Percent, Timer, 
  Tag, Flame, Gem, Crown, Truck, Gift, Zap,
  Bell, Megaphone, X
} from 'lucide-react';
import { addToCart as addToCartStorage, isFavorite, addToFavorites, removeFromFavorites } from '../utils/storageManager';

// Sample sale products data
const saleData = {
  flashSale: {
    title: "Flash Sale",
    icon: "⚡",
    description: "24 hours only",
    color: "#d4af37",
    products: [
      {
        id: 5001,
        name: "Velvet Matte Lipstick Set",
        category: "Lips",
        price: 29.99,
        originalPrice: 49.99,
        discount: 40,
        rating: 4.8,
        reviews: 156,
        image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg",
        shade: "3 Shades",
        inStock: 23,
        endingIn: "2h 15m"
      },
      {
        id: 5002,
        name: "Vitamin C Brightening Serum",
        category: "Skincare",
        price: 34.99,
        originalPrice: 58.99,
        discount: 41,
        rating: 4.9,
        reviews: 203,
        image: "https://images.pexels.com/photos/6621367/pexels-photo-6621367.jpeg",
        shade: "50ml",
        inStock: 15,
        endingIn: "4h 30m"
      },
      {
        id: 5003,
        name: "Eyeshadow Palette",
        category: "Eyes",
        price: 32.99,
        originalPrice: 54.99,
        discount: 40,
        rating: 4.7,
        reviews: 98,
        image: "https://images.pexels.com/photos/2533265/pexels-photo-2533265.jpeg",
        shade: "12 Colors",
        inStock: 8,
        endingIn: "1h 45m"
      },
      {
        id: 5004,
        name: "Hydrating Face Moisturizer",
        category: "Skincare",
        price: 24.99,
        originalPrice: 42.99,
        discount: 42,
        rating: 4.6,
        reviews: 167,
        image: "https://images.pexels.com/photos/3738345/pexels-photo-3738345.jpeg",
        shade: "100ml",
        inStock: 12,
        endingIn: "3h 20m"
      }
    ]
  },
  bestDeals: {
    title: "Best Deals",
    icon: "🏷️",
    description: "Top-rated at best prices",
    color: "#b76e79",
    products: [
      {
        id: 6001,
        name: "Complete Lip Kit",
        category: "Lips",
        price: 39.99,
        originalPrice: 79.99,
        discount: 50,
        rating: 4.9,
        reviews: 312,
        image: "https://images.pexels.com/photos/7810635/pexels-photo-7810635.jpeg",
        shade: "6 Pieces",
        inStock: 45
      },
      {
        id: 6002,
        name: "Mascara & Liner Duo",
        category: "Eyes",
        price: 19.99,
        originalPrice: 38.99,
        discount: 49,
        rating: 4.7,
        reviews: 89,
        image: "https://images.pexels.com/photos/1383537/pexels-photo-1383537.jpeg",
        shade: "Black",
        inStock: 67
      },
      {
        id: 6003,
        name: "BB Cream Foundation",
        category: "Face",
        price: 22.99,
        originalPrice: 44.99,
        discount: 49,
        rating: 4.6,
        reviews: 134,
        image: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg",
        shade: "Medium",
        inStock: 52
      },
      {
        id: 6004,
        name: "Nail Polish Set",
        category: "Nails",
        price: 18.99,
        originalPrice: 36.99,
        discount: 49,
        rating: 4.5,
        reviews: 76,
        image: "https://images.pexels.com/photos/10390405/pexels-photo-10390405.jpeg",
        shade: "5 Colors",
        inStock: 38
      }
    ]
  },
  clearance: {
    title: "Clearance",
    icon: "🔥",
    description: "Last chance",
    color: "#8a6d8b",
    products: [
      {
        id: 7001,
        name: "Limited Edition Palette",
        category: "Eyes",
        price: 19.99,
        originalPrice: 59.99,
        discount: 67,
        rating: 4.5,
        reviews: 45,
        image: "https://images.pexels.com/photos/2533265/pexels-photo-2533265.jpeg",
        shade: "Limited",
        inStock: 5
      },
      {
        id: 7002,
        name: "Old Stock Lipsticks",
        category: "Lips",
        price: 9.99,
        originalPrice: 29.99,
        discount: 67,
        rating: 4.3,
        reviews: 28,
        image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg",
        shade: "Random",
        inStock: 12
      },
      {
        id: 7003,
        name: "Discontinued Shades",
        category: "Nails",
        price: 7.99,
        originalPrice: 24.99,
        discount: 68,
        rating: 4.2,
        reviews: 19,
        image: "https://images.pexels.com/photos/10390405/pexels-photo-10390405.jpeg",
        shade: "Mixed",
        inStock: 8
      },
      {
        id: 7004,
        name: "Last Season Foundation",
        category: "Face",
        price: 14.99,
        originalPrice: 44.99,
        discount: 67,
        rating: 4.4,
        reviews: 34,
        image: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg",
        shade: "Various",
        inStock: 6
      }
    ]
  }
};

// Announcements data
const announcements = [
  {
    id: 1,
    icon: <Percent size={16} />,
    text: "Extra 20% off on flash sale items",
    color: "#d4af37"
  },
  {
    id: 2,
    icon: <Truck size={16} />,
    text: "Free shipping on orders $50+",
    color: "#b76e79"
  },
  {
    id: 3,
    icon: <Gift size={16} />,
    text: "Free sample with every purchase",
    color: "#8a6d8b"
  },
  {
    id: 4,
    icon: <Crown size={16} />,
    text: "VIP members get extra 10% off",
    color: "#d4af37"
  }
];

function Sale() {
  const [addedToCart, setAddedToCart] = useState({});
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [showFloatingAnnouncement, setShowFloatingAnnouncement] = useState(true);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Rotate announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (productId) => {
    // Find the product from saleData
    let product = null;
    for (const category in saleData) {
      if (saleData[category].products) {
        product = saleData[category].products.find(p => p.id === productId);
        if (product) break;
      }
    }
    
    if (product) {
      // Add to localStorage using storage manager
      addToCartStorage(product);
      
      // Dispatch event to update cart
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Show "Added!" feedback
      setAddedToCart({ ...addedToCart, [productId]: true });
      showNotification('✅ Added to cart');
      setTimeout(() => {
        setAddedToCart({ ...addedToCart, [productId]: false });
        console.log(`✅ Product ${productId} added to cart from Sale`);
      }, 500);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} style={{color: '#d4af37'}}>★</span>);
      } else {
        stars.push(<span key={i} style={{color: '#ddd'}}>☆</span>);
      }
    }
    return stars;
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>

      {/* Floating Sale Indicator */}
      {showFloatingAnnouncement && (
        <div style={styles.floatingIndicator}>
          <button 
            style={styles.closeFloating}
            onClick={() => setShowFloatingAnnouncement(false)}
          >
            <X size={14} />
          </button>
          <Megaphone size={18} color="#d4af37" />
          <div style={styles.floatingContent}>
            <span style={styles.floatingTitle}>FLASH SALE!</span>
            <span style={styles.floatingText}>Up to 70% off ends in</span>
            <div style={styles.floatingTimer}>
              <Timer size={12} />
              <span>{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Announcement Bar */}
      <div style={styles.topAnnouncement}>
        <Bell size={16} color="#d4af37" />
        <div style={styles.announcementSlider}>
          <div key={currentAnnouncement} style={styles.announcementSlide}>
            <span style={{color: announcements[currentAnnouncement].color}}>
              {announcements[currentAnnouncement].icon}
            </span>
            <span style={styles.announcementText}>
              {announcements[currentAnnouncement].text}
            </span>
          </div>
        </div>
        <div style={styles.announcementDots}>
          {announcements.map((_, i) => (
            <span
              key={i}
              style={{
                ...styles.dot,
                backgroundColor: i === currentAnnouncement ? '#b76e79' : '#ddd'
              }}
              onClick={() => setCurrentAnnouncement(i)}
            />
          ))}
        </div>
      </div>

      {/* Simple Notification */}
      {notification.show && (
        <div style={{
          ...styles.notification,
          backgroundColor: notification.type === 'success' ? '#b76e79' : '#dc3545'
        }}>
          {notification.message}
        </div>
      )}

      {/* Minimal Hero */}
      <div style={styles.hero}>
        <Percent size={32} color="#b76e79" />
        <h1 style={styles.heroTitle}>Sale</h1>
        <p style={styles.heroSubtitle}>Up to 70% off</p>
        
        {/* Timer with pulse effect */}
        <div style={styles.timer}>
          <Timer size={16} color="#b76e79" />
          <span style={styles.timerText}>
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Sales Indicators Bar */}
      <div style={styles.salesIndicators}>
        <div style={styles.indicator}>
          <Flame size={16} color="#d4af37" />
          <span>24 Flash Deals</span>
        </div>
        <div style={styles.indicator}>
          <Tag size={16} color="#b76e79" />
          <span>40-70% Off</span>
        </div>
        <div style={styles.indicator}>
          <Gem size={16} color="#8a6d8b" />
          <span>50+ Products</span>
        </div>
        <div style={styles.indicator}>
          <Clock size={16} color="#c49a9c" />
          <span>Limited Time</span>
        </div>
      </div>

      {/* VIP Banner */}
      <div style={styles.vipBanner}>
        <Crown size={18} color="#d4af37" />
        <span>VIP extra 10% off • </span>
        <span style={styles.vipCode}>VIP10</span>
      </div>

      {/* Product Sections */}
      {Object.entries(saleData).map(([key, section]) => (
        <div key={section.title} style={styles.section}>
          {/* Section Header with Sale Indicator */}
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitleGroup}>
              <span style={styles.sectionIcon}>{section.icon}</span>
              <div>
                <h2 style={styles.sectionTitle}>{section.title}</h2>
                <p style={styles.sectionDescription}>{section.description}</p>
              </div>
            </div>
            {section.timer && (
              <div style={styles.sectionTimer}>
                <Timer size={14} color="#b76e79" />
                <span>{timeLeft.hours}h {timeLeft.minutes}m</span>
              </div>
            )}
            <div style={styles.sectionIndicator}>
              <Tag size={14} />
              <span>Save up to 70%</span>
            </div>
          </div>

          {/* Products Grid */}
          <div style={styles.grid}>
            {section.products.map((product) => (
              <div key={product.id} style={styles.card}>
                <div style={styles.imageContainer}>
                  <img src={product.image} alt={product.name} style={styles.image} />
                  
                  {/* Discount Badge with Pulse */}
                  <span style={styles.discountBadge}>-{product.discount}%</span>
                  
                  {/* Flash Sale Timer */}
                  {product.endingIn && (
                    <span style={styles.flashTimer}>
                      <Timer size={10} /> {product.endingIn}
                    </span>
                  )}
                  
                  {/* Stock Indicator */}
                  {product.inStock < 10 && (
                    <span style={styles.stockIndicator}>
                      {product.inStock} left
                    </span>
                  )}
                  
                  {/* Hot Deal Indicator */}
                  {product.discount >= 50 && (
                    <span style={styles.hotDeal}>HOT</span>
                  )}
                  
                  <button style={styles.wishlistBtn}>
                    <Heart size={16} color="#b76e79" />
                  </button>
                </div>
                
                <div style={styles.info}>
                  <p style={styles.category}>{product.category}</p>
                  <h3 style={styles.name}>{product.name}</h3>
                  
                  <div style={styles.rating}>
                    <div style={styles.stars}>{renderStars(product.rating)}</div>
                    <span style={styles.ratingCount}>({product.reviews})</span>
                  </div>
                  
                  <div style={styles.priceRow}>
                    <div>
                      <span style={styles.salePrice}>${product.price}</span>
                      <span style={styles.originalPrice}>${product.originalPrice}</span>
                    </div>
                    <span style={styles.shadeInfo}>{product.shade}</span>
                  </div>
                  
                  {/* Savings Badge */}
                  <div style={styles.savingsBadge}>
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </div>
                  
                  <button 
                    style={{
                      ...styles.addBtn,
                      backgroundColor: addedToCart[product.id] ? '#b76e79' : 'transparent',
                      color: addedToCart[product.id] ? 'white' : '#b76e79',
                    }}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    {addedToCart[product.id] ? 'Added' : 'Add to Cart'}
                    <ShoppingBag size={14} style={{marginLeft: '5px'}} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Tips with Icons */}
      <div style={styles.tips}>
        <h3 style={styles.tipsTitle}>Sale Tips</h3>
        <div style={styles.tipsGrid}>
          <div style={styles.tipItem}>
            <Zap size={16} color="#d4af37" />
            <span>New deals every 24h</span>
          </div>
          <div style={styles.tipItem}>
            <Truck size={16} color="#b76e79" />
            <span>Free shipping $50+</span>
          </div>
          <div style={styles.tipItem}>
            <Gift size={16} color="#8a6d8b" />
            <span>Free samples</span>
          </div>
          <div style={styles.tipItem}>
            <Crown size={16} color="#d4af37" />
            <span>VIP extra 10%</span>
          </div>
        </div>
      </div>

      {/* Newsletter with Bell Icon */}
      <div style={styles.newsletter}>
        <Bell size={24} color="white" style={{marginBottom: '1rem'}} />
        <h3 style={styles.newsletterTitle}>Get Sale Alerts</h3>
        <div style={styles.newsletterForm}>
          <input type="email" placeholder="Email" style={styles.newsletterInput} />
          <button style={styles.newsletterBtn}>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: '#fff9f9',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
    padding: '2rem 5%',
    position: 'relative',
  },
  floatingIndicator: {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    background: 'white',
    padding: '0.8rem 1.2rem',
    borderRadius: '40px',
    boxShadow: '0 4px 20px rgba(183, 110, 121, 0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    zIndex: 1000,
    animation: 'slideInLeft 0.5s ease, pulse 2s infinite',
    border: '1px solid rgba(212, 175, 55, 0.3)',
  },
  closeFloating: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: '#b76e79',
    border: 'none',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white',
  },
  floatingContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  floatingTitle: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#b76e79',
  },
  floatingText: {
    fontSize: '0.7rem',
    color: '#666',
  },
  floatingTimer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.8rem',
    color: '#d4af37',
    fontWeight: 600,
  },
  topAnnouncement: {
    background: 'white',
    padding: '0.8rem 1.5rem',
    borderRadius: '40px',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
    border: '1px solid rgba(183, 110, 121, 0.1)',
  },
  announcementSlider: {
    flex: 1,
    overflow: 'hidden',
  },
  announcementSlide: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    animation: 'fadeIn 0.5s ease',
  },
  announcementText: {
    fontSize: '0.9rem',
    color: '#5a4e4a',
  },
  announcementDots: {
    display: 'flex',
    gap: '0.3rem',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  notification: {
    position: 'fixed',
    top: '100px',
    right: '20px',
    padding: '0.8rem 1.5rem',
    borderRadius: '30px',
    color: 'white',
    zIndex: 1000,
    animation: 'slideIn 0.3s ease',
    fontSize: '0.9rem',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    padding: '1rem',
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2.5rem',
    color: '#b76e79',
    margin: '0.5rem 0 0.2rem',
  },
  heroSubtitle: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '1rem',
  },
  timer: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'white',
    padding: '0.5rem 1.2rem',
    borderRadius: '30px',
    fontSize: '0.9rem',
    color: '#b76e79',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    animation: 'pulse 2s infinite',
  },
  timerText: {
    fontWeight: 600,
  },
  salesIndicators: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  indicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.85rem',
    color: '#5a4e4a',
    background: 'white',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    border: '1px solid rgba(183, 110, 121, 0.1)',
  },
  vipBanner: {
    background: 'white',
    padding: '0.8rem 1.5rem',
    borderRadius: '30px',
    marginBottom: '2rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#5a4e4a',
    border: '1px solid rgba(212, 175, 55, 0.2)',
  },
  vipCode: {
    color: '#d4af37',
    fontWeight: 600,
  },
  section: {
    marginBottom: '3rem',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    padding: '0 0.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  sectionTitleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  sectionIcon: {
    fontSize: '1.8rem',
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.3rem',
    color: '#b76e79',
    marginBottom: '0.1rem',
  },
  sectionDescription: {
    fontSize: '0.8rem',
    color: '#999',
  },
  sectionTimer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.8rem',
    color: '#b76e79',
    background: '#fce4e8',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
  },
  sectionIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.8rem',
    color: '#28a745',
    background: '#e8f5e9',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    border: '1px solid rgba(183, 110, 121, 0.1)',
  },
  imageContainer: {
    position: 'relative',
    paddingTop: '100%',
    background: '#faf0f0',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: '0.8rem',
    left: '0.8rem',
    background: '#dc3545',
    color: 'white',
    padding: '0.2rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 600,
    zIndex: 2,
    animation: 'pulse 2s infinite',
  },
  flashTimer: {
    position: 'absolute',
    bottom: '0.8rem',
    left: '0.8rem',
    background: 'rgba(212, 175, 55, 0.9)',
    color: 'white',
    padding: '0.2rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.7rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.2rem',
    zIndex: 2,
  },
  stockIndicator: {
    position: 'absolute',
    bottom: '0.8rem',
    right: '0.8rem',
    background: '#dc3545',
    color: 'white',
    padding: '0.2rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.7rem',
    zIndex: 2,
  },
  hotDeal: {
    position: 'absolute',
    top: '0.8rem',
    right: '3rem',
    background: '#d4af37',
    color: 'white',
    padding: '0.2rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: 600,
    zIndex: 2,
  },
  wishlistBtn: {
    position: 'absolute',
    top: '0.8rem',
    right: '0.8rem',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 2,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  info: {
    padding: '1.2rem',
  },
  category: {
    fontSize: '0.7rem',
    color: '#b76e79',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '0.3rem',
  },
  name: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1rem',
    color: '#5a4e4a',
    marginBottom: '0.5rem',
    fontWeight: 500,
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.8rem',
  },
  stars: {
    display: 'flex',
    gap: '2px',
  },
  ratingCount: {
    fontSize: '0.7rem',
    color: '#999',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  salePrice: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#dc3545',
    marginRight: '0.5rem',
  },
  originalPrice: {
    fontSize: '0.8rem',
    color: '#999',
    textDecoration: 'line-through',
  },
  shadeInfo: {
    fontSize: '0.7rem',
    color: '#666',
    background: '#f5f5f5',
    padding: '0.2rem 0.6rem',
    borderRadius: '20px',
  },
  savingsBadge: {
    fontSize: '0.8rem',
    color: '#28a745',
    marginBottom: '1rem',
    padding: '0.2rem 0',
    borderBottom: '1px dashed #28a745',
  },
  addBtn: {
    width: '100%',
    padding: '0.7rem',
    border: '1px solid #b76e79',
    borderRadius: '30px',
    background: 'transparent',
    color: '#b76e79',
    fontSize: '0.9rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  tips: {
    marginTop: '3rem',
    padding: '1.5rem',
    background: 'white',
    borderRadius: '16px',
    border: '1px solid rgba(183, 110, 121, 0.1)',
  },
  tipsTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.2rem',
    color: '#b76e79',
    marginBottom: '1rem',
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },
  tipItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#5a4e4a',
  },
  newsletter: {
    marginTop: '2rem',
    padding: '2rem',
    background: 'linear-gradient(135deg, #b76e79, #d4af37)',
    borderRadius: '16px',
    textAlign: 'center',
    color: 'white',
  },
  newsletterTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.3rem',
    marginBottom: '1rem',
  },
  newsletterForm: {
    display: 'flex',
    gap: '0.5rem',
    maxWidth: '400px',
    margin: '0 auto',
  },
  newsletterInput: {
    flex: 1,
    padding: '0.8rem 1.2rem',
    border: 'none',
    borderRadius: '30px',
    fontSize: '0.9rem',
    outline: 'none',
  },
  newsletterBtn: {
    padding: '0.8rem 1.5rem',
    background: 'white',
    color: '#b76e79',
    border: 'none',
    borderRadius: '30px',
    fontWeight: 500,
    cursor: 'pointer',
  },
};

export default Sale;