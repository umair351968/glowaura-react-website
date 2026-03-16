// src/pages/NewArrival.jsx
import { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, Heart, Clock, Sparkles, 
  Calendar, TrendingUp, Gift, Bell, ChevronRight,
  Star, Filter, X, Megaphone, PartyPopper, Timer,
  Percent, Truck, Gem, Award, Zap, Crown
} from 'lucide-react';
import { addToCart as addToCartStorage, isFavorite, addToFavorites, removeFromFavorites } from '../utils/storageManager';

// Sample new arrivals data with more products and details
const newArrivalsData = {
  featured: {
    title: "Featured New Arrivals",
    icon: "👑",
    description: "The most anticipated launches of the season",
    color: "#d4af37",
    products: [
      {
        id: 1001,
        name: "Rose Gold Highlighter Palette",
        category: "Face",
        price: 42.99,
        originalPrice: 54.99,
        rating: 5.0,
        reviews: 24,
        image: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg",
        badge: "Just In",
        shade: "3 Shades",
        launchDate: "March 2024",
        isLimited: true,
        inStock: 15
      },
      {
        id: 1002,
        name: "Cherry Blossom Lip Set",
        category: "Lips",
        price: 39.99,
        originalPrice: 49.99,
        rating: 5.0,
        reviews: 18,
        image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg",
        badge: "Limited",
        shade: "3 Pieces",
        launchDate: "March 2024",
        isLimited: true,
        inStock: 8
      },
      {
        id: 1003,
        name: "Glass Skin Serum",
        category: "Skincare",
        price: 54.99,
        originalPrice: 69.99,
        rating: 5.0,
        reviews: 32,
        image: "https://images.pexels.com/photos/6621367/pexels-photo-6621367.jpeg",
        badge: "Bestseller",
        shade: "50ml",
        launchDate: "Feb 2024",
        isLimited: false,
        inStock: 42
      },
      {
        id: 1004,
        name: "Crystal Eye Palette",
        category: "Eyes",
        price: 48.99,
        originalPrice: null,
        rating: 4.5,
        reviews: 12,
        image: "https://images.pexels.com/photos/2533265/pexels-photo-2533265.jpeg",
        badge: "New",
        shade: "8 Shades",
        launchDate: "March 2024",
        isLimited: false,
        inStock: 25
      }
    ]
  },
  thisWeek: {
    title: "This Week's Launches",
    icon: "🌟",
    description: "Fresh drops you don't want to miss",
    color: "#8a6d8b",
    products: [
      {
        id: 2001,
        name: "Velvet Matte Liquid Lipstick",
        category: "Lips",
        price: 26.99,
        originalPrice: null,
        rating: 4.5,
        reviews: 8,
        image: "https://images.pexels.com/photos/7810635/pexels-photo-7810635.jpeg",
        badge: "New",
        shade: "5 Shades",
        launchDate: "This Week",
        isLimited: false,
        inStock: 35
      },
      {
        id: 2002,
        name: "24H Hydrating Face Mist",
        category: "Skincare",
        price: 29.99,
        originalPrice: 36.99,
        rating: 4.5,
        reviews: 6,
        image: "https://images.pexels.com/photos/3738345/pexels-photo-3738345.jpeg",
        badge: "New",
        shade: "100ml",
        launchDate: "This Week",
        isLimited: false,
        inStock: 28
      },
      {
        id: 2003,
        name: "Waterproof Gel Eyeliner",
        category: "Eyes",
        price: 21.99,
        originalPrice: null,
        rating: 4.5,
        reviews: 5,
        image: "https://images.pexels.com/photos/1383537/pexels-photo-1383537.jpeg",
        badge: "New",
        shade: "Black/Brown",
        launchDate: "This Week",
        isLimited: false,
        inStock: 45
      },
      {
        id: 2004,
        name: "Peach Blush Stick",
        category: "Face",
        price: 24.99,
        originalPrice: 29.99,
        rating: 4.5,
        reviews: 4,
        image: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg",
        badge: "New",
        shade: "Peach",
        launchDate: "This Week",
        isLimited: false,
        inStock: 22
      }
    ]
  },
  thisMonth: {
    title: "This Month's Arrivals",
    icon: "📅",
    description: "Discovered this month",
    color: "#b76e79",
    products: [
      {
        id: 3001,
        name: "Vitamin C Brightening Cream",
        category: "Skincare",
        price: 48.99,
        originalPrice: 58.99,
        rating: 4.5,
        reviews: 15,
        image: "https://images.pexels.com/photos/3738345/pexels-photo-3738345.jpeg",
        badge: "New",
        shade: "50ml",
        launchDate: "March 2024",
        isLimited: false,
        inStock: 18
      },
      {
        id: 3002,
        name: "Gel Nail Polish Set",
        category: "Nails",
        price: 34.99,
        originalPrice: 42.99,
        rating: 4.5,
        reviews: 9,
        image: "https://images.pexels.com/photos/10390405/pexels-photo-10390405.jpeg",
        badge: "New",
        shade: "6 Colors",
        launchDate: "March 2024",
        isLimited: true,
        inStock: 12
      },
      {
        id: 3003,
        name: "Silk Pressed Powder",
        category: "Face",
        price: 32.99,
        originalPrice: null,
        rating: 4.5,
        reviews: 7,
        image: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg",
        badge: "New",
        shade: "Translucent",
        launchDate: "Feb 2024",
        isLimited: false,
        inStock: 31
      },
      {
        id: 3004,
        name: "Lip & Cheek Tint",
        category: "Lips",
        price: 22.99,
        originalPrice: 27.99,
        rating: 4.5,
        reviews: 11,
        image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg",
        badge: "New",
        shade: "2 Shades",
        launchDate: "Feb 2024",
        isLimited: false,
        inStock: 24
      },
      {
        id: 3005,
        name: "Magnetic Lashes",
        category: "Eyes",
        price: 28.99,
        originalPrice: 34.99,
        rating: 4.5,
        reviews: 6,
        image: "https://images.pexels.com/photos/1383537/pexels-photo-1383537.jpeg",
        badge: "New",
        shade: "Pair",
        launchDate: "Feb 2024",
        isLimited: false,
        inStock: 15
      }
    ]
  },
  comingSoon: {
    title: "Coming Soon",
    icon: "⏳",
    description: "Preview what's on the horizon",
    color: "#5a4e4a",
    products: [
      {
        id: 4001,
        name: "Summer Glow Collection",
        category: "Limited Edition",
        price: 89.99,
        originalPrice: 109.99,
        rating: 5.0,
        reviews: 0,
        image: "https://images.pexels.com/photos/2533265/pexels-photo-2533265.jpeg",
        badge: "Pre-order",
        shade: "Full Set",
        launchDate: "April 2024",
        isLimited: true,
        inStock: 0
      },
      {
        id: 4002,
        name: "Matte Perfector Primer",
        category: "Face",
        price: 36.99,
        originalPrice: 42.99,
        rating: 5.0,
        reviews: 0,
        image: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg",
        badge: "Soon",
        shade: "30ml",
        launchDate: "April 2024",
        isLimited: false,
        inStock: 0
      },
      {
        id: 4003,
        name: "Tropical Scent Perfume",
        category: "Fragrance",
        price: 79.99,
        originalPrice: 95.99,
        rating: 5.0,
        reviews: 0,
        image: "https://images.pexels.com/photos/6621367/pexels-photo-6621367.jpeg",
        badge: "Pre-order",
        shade: "50ml",
        launchDate: "May 2024",
        isLimited: true,
        inStock: 0
      }
    ]
  }
};

// Announcements data
const announcements = [
  {
    id: 1,
    type: "sale",
    icon: <Percent size={20} />,
    title: "Early Bird Special",
    message: "Get 20% off on all new arrivals this week!",
    code: "NEW20",
    color: "#d4af37",
    bgColor: "#fef5e7"
  },
  {
    id: 2,
    type: "shipping",
    icon: <Truck size={20} />,
    title: "Free Shipping",
    message: "Free shipping on orders over $50",
    code: "FREESHIP",
    color: "#b76e79",
    bgColor: "#fce4e8"
  },
  {
    id: 3,
    type: "limited",
    icon: <Gem size={20} />,
    title: "Limited Edition",
    message: "New Crystal Collection launching tomorrow",
    code: null,
    color: "#8a6d8b",
    bgColor: "#ede7f6"
  },
  {
    id: 4,
    type: "reward",
    icon: <Award size={20} />,
    title: "Double Points",
    message: "Earn double loyalty points on new items",
    code: "DOUBLE",
    color: "#c49a9c",
    bgColor: "#fce4e8"
  },
  {
    id: 5,
    type: "flash",
    icon: <Zap size={20} />,
    title: "Flash Sale",
    message: "Next 24 hours: Extra 15% off select items",
    code: "FLASH15",
    color: "#d4af37",
    bgColor: "#fef5e7"
  },
  {
    id: 6,
    type: "vip",
    icon: <Crown size={20} />,
    title: "VIP Early Access",
    message: "Members get 24h early access to launches",
    code: "VIPACCESS",
    color: "#b76e79",
    bgColor: "#fce4e8"
  }
];

function NewArrivals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [addedToCart, setAddedToCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);

  // Auto-rotate announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = ['all', 'Lips', 'Eyes', 'Face', 'Skincare', 'Nails', 'Fragrance'];

  const handleAddToCart = (productId) => {
    // Find the product
    let product = null;
    for (const cat of categories) {
      const products = newArrivals[cat === 'all' ? Object.keys(newArrivals)[0] : cat];
      if (products) {
        product = products.find(p => p.id === productId);
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
      showNotification('✅ Added to cart! ✨');
      setTimeout(() => {
        setAddedToCart({ ...addedToCart, [productId]: false });
        console.log(`✅ Product ${productId} added to cart from NewArrival`);
      }, 500);
    }
  };

  const handleNotifyMe = (productName) => {
    if (notifyEmail) {
      showNotification(`We'll notify you when ${productName} is available! 📧`);
      setNotifyEmail('');
    } else {
      showNotification('Please enter your email', 'error');
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showNotification(`Code ${code} copied! 📋`);
    setTimeout(() => setCopiedCode(null), 2000);
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

  // Filter function for search and category
  const filterProducts = (products) => {
    let filtered = products;
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shade.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    return filtered;
  };

  // Calculate stats
  const totalProducts = Object.values(newArrivalsData).reduce(
    (acc, section) => acc + section.products.length, 0
  );
  
  const limitedEditions = Object.values(newArrivalsData).reduce(
    (acc, section) => acc + section.products.filter(p => p.isLimited).length, 0
  );

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(183, 110, 121, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(183, 110, 121, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(183, 110, 121, 0);
          }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Floating Announcement Bar */}
      {showAnnouncementBar && (
        <div style={styles.floatingAnnouncement}>
          <button 
            style={styles.closeAnnouncement}
            onClick={() => setShowAnnouncementBar(false)}
          >
            <X size={16} />
          </button>
          <div style={styles.announcementContent}>
            <Megaphone size={20} style={styles.announcementIcon} />
            <div style={styles.announcementText}>
              <span style={styles.announcementTitle}>🎉 SPRING LAUNCH! </span>
              New collections just dropped. Shop now and get free shipping!
            </div>
          </div>
        </div>
      )}

      {/* Rotating Announcements Bar */}
      <div style={styles.announcementsBar}>
        <Timer size={18} style={styles.announcementsIcon} />
        <div style={styles.announcementsSlider}>
          <div 
            key={currentAnnouncement}
            style={styles.announcementSlide}
          >
            <span style={{...styles.announcementType, color: announcements[currentAnnouncement].color}}>
              {announcements[currentAnnouncement].icon}
              {announcements[currentAnnouncement].title}:
            </span>
            <span style={styles.announcementMessage}>
              {announcements[currentAnnouncement].message}
            </span>
            {announcements[currentAnnouncement].code && (
              <button
                style={styles.codeButton}
                onClick={() => handleCopyCode(announcements[currentAnnouncement].code)}
              >
                {copiedCode === announcements[currentAnnouncement].code ? 'Copied!' : announcements[currentAnnouncement].code}
              </button>
            )}
          </div>
        </div>
        <div style={styles.announcementDots}>
          {announcements.map((_, index) => (
            <span
              key={index}
              style={{
                ...styles.dot,
                backgroundColor: index === currentAnnouncement ? '#b76e79' : '#ddd'
              }}
              onClick={() => setCurrentAnnouncement(index)}
            />
          ))}
        </div>
      </div>

      {/* Promotional Cards Grid */}
      <div style={styles.promoGrid}>
        <div style={styles.promoCard}>
          <Gift size={24} color="#d4af37" />
          <h4 style={styles.promoTitle}>Free Gift</h4>
          <p style={styles.promoText}>On orders over $75</p>
        </div>
        <div style={styles.promoCard}>
          <Truck size={24} color="#b76e79" />
          <h4 style={styles.promoTitle}>Free Shipping</h4>
          <p style={styles.promoText}>On all orders $50+</p>
        </div>
        <div style={styles.promoCard}>
          <Zap size={24} color="#8a6d8b" />
          <h4 style={styles.promoTitle}>Flash Sale</h4>
          <p style={styles.promoText}>24h left! 15% off</p>
        </div>
        <div style={styles.promoCard}>
          <Gem size={24} color="#c49a9c" />
          <h4 style={styles.promoTitle}>Limited Stock</h4>
          <p style={styles.promoText}>Only few left!</p>
        </div>
      </div>

      {/* Notification Toast */}
      {notification.show && (
        <div style={{
          ...styles.notification,
          backgroundColor: notification.type === 'success' ? '#b76e79' : '#dc3545'
        }}>
          {notification.message}
        </div>
      )}

      {/* Hero Banner - Reduced height with black text */}
      <div style={styles.heroBanner}>
        <div style={styles.heroContent}>
          <Sparkles style={styles.heroIcon} size={36} color="#000" />
          <h1 style={styles.heroTitle}>New Arrivals</h1>
          <p style={styles.heroSubtitle}>Discover the latest additions to our collection</p>
          
          {/* Stats Cards - Black text */}
          <div style={styles.heroStats}>
            <div style={styles.statCard}>
              <Calendar size={20} color="#000" />
              <span style={styles.statNumber}>15+</span>
              <span style={styles.statLabel}>New This Month</span>
            </div>
            <div style={styles.statCard}>
              <TrendingUp size={20} color="#000" />
              <span style={styles.statNumber}>This Week</span>
              <span style={styles.statLabel}>Fresh Drops</span>
            </div>
            <div style={styles.statCard}>
              <Gift size={20} color="#000" />
              <span style={styles.statNumber}>{limitedEditions}</span>
              <span style={styles.statLabel}>Limited</span>
            </div>
          </div>

          {/* Countdown Timer - Black text */}
          <div style={styles.countdownTimer}>
            <Timer size={16} color="#000" />
            <span style={styles.countdownText}>Spring Sale ends in: </span>
            <span style={styles.countdownTime}>2d 14h 32m</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div style={styles.searchFilterBar}>
        <div style={styles.searchWrapper}>
          <Search style={styles.searchIcon} size={20} />
          <input 
            style={styles.searchInput}
            placeholder="Search new arrivals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button 
          style={styles.filterToggle}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} />
          Filter
        </button>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div style={styles.categoryFilters}>
          {categories.map(cat => (
            <button
              key={cat}
              style={{
                ...styles.categoryFilterBtn,
                backgroundColor: selectedCategory === cat ? '#b76e79' : 'white',
                color: selectedCategory === cat ? 'white' : '#5a4e4a',
                borderColor: selectedCategory === cat ? '#b76e79' : 'rgba(183, 110, 121, 0.2)'
              }}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      )}

      {/* Count Display */}
      <div style={styles.countDisplay}>
        <span>Showing {Object.values(newArrivalsData).reduce(
          (acc, section) => acc + filterProducts(section.products).length, 0
        )} of {totalProducts} products</span>
      </div>

      {/* Sections */}
      {Object.entries(newArrivalsData).map(([key, section]) => {
        const filteredProducts = filterProducts(section.products);
        if (filteredProducts.length === 0) return null;

        return (
          <div key={section.title} style={styles.section}>
            {/* Section Header */}
            <div style={styles.sectionHeader}>
              <div style={styles.sectionTitleWrapper}>
                <span style={{
                  ...styles.sectionIcon,
                  backgroundColor: section.color + '20',
                  color: section.color
                }}>{section.icon}</span>
                <div>
                  <h2 style={styles.sectionTitle}>{section.title}</h2>
                  <p style={styles.sectionDescription}>{section.description}</p>
                </div>
              </div>
              <div style={styles.sectionBadge}>
                <Clock size={16} style={{marginRight: '5px'}} />
                {filteredProducts.length} Products
              </div>
            </div>

            {/* Products Grid */}
            <div style={styles.grid}>
              {filteredProducts.map((product) => (
                <div key={product.id} style={styles.card}>
                  <div style={styles.imageContainer}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={styles.image} 
                    />
                    
                    {/* Badge */}
                    <span style={{
                      ...styles.badge,
                      backgroundColor: 
                        product.badge === 'Just In' ? '#d4af37' :
                        product.badge === 'Limited' ? '#b76e79' :
                        product.badge === 'Bestseller' ? '#8a6d8b' :
                        product.badge === 'Pre-order' ? '#5a4e4a' : 
                        product.badge === 'Soon' ? '#c49a9c' : '#b76e79'
                    }}>
                      {product.badge}
                    </span>
                    
                    {/* Wishlist Button */}
                    <button style={styles.wishlistBtn}>
                      <Heart size={16} color="#b76e79" />
                    </button>
                    
                    {/* Launch Date */}
                    <span style={styles.launchDate}>
                      <Clock size={12} style={{marginRight: '3px'}} />
                      {product.launchDate}
                    </span>

                    {/* Stock Status */}
                    {product.inStock > 0 && product.inStock < 10 && (
                      <span style={styles.stockWarning}>
                        Only {product.inStock} left!
                      </span>
                    )}
                  </div>
                  
                  <div style={styles.info}>
                    <p style={styles.category}>{product.category}</p>
                    <h3 style={styles.name}>{product.name}</h3>
                    
                    <div style={styles.rating}>
                      <div style={styles.stars}>
                        {renderStars(product.rating)}
                      </div>
                      <span style={styles.ratingCount}>({product.reviews})</span>
                    </div>
                    
                    <div style={styles.priceContainer}>
                      <div>
                        <span style={styles.price}>${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span style={styles.originalPrice}>
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {product.shade && (
                        <span style={styles.shadeInfo}>{product.shade}</span>
                      )}
                    </div>
                    
                    {product.badge === 'Pre-order' || product.badge === 'Soon' ? (
                      <div style={styles.notifyContainer}>
                        <input
                          type="email"
                          placeholder="Email for notification"
                          style={styles.notifyInput}
                          value={notifyEmail}
                          onChange={(e) => setNotifyEmail(e.target.value)}
                        />
                        <button 
                          style={styles.notifyBtn}
                          onClick={() => handleNotifyMe(product.name)}
                        >
                          <Bell size={14} />
                          Notify Me
                        </button>
                      </div>
                    ) : (
                      <button 
                        style={{
                          ...styles.addBtn,
                          backgroundColor: addedToCart[product.id] ? '#b76e79' : 'transparent',
                          color: addedToCart[product.id] ? 'white' : '#b76e79',
                          borderColor: addedToCart[product.id] ? '#b76e79' : '#b76e79'
                        }}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        {addedToCart[product.id] ? 'Added!' : 'Add to Cart'}
                        <ShoppingBag size={14} style={{marginLeft: '5px'}} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* No Results Message */}
      {Object.values(newArrivalsData).every(section => filterProducts(section.products).length === 0) && (
        <div style={styles.noProducts}>
          <h3>No New Arrivals Found</h3>
          <p>We couldn't find any products matching "{searchTerm}"</p>
          <button 
            style={styles.clearBtn}
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Announcements Grid */}
      <div style={styles.announcementsGrid}>
        <h3 style={styles.announcementsGridTitle}>Latest Offers & Announcements</h3>
        <div style={styles.announcementsGridContainer}>
          {announcements.map((announcement) => (
            <div 
              key={announcement.id}
              style={{
                ...styles.announcementCard,
                backgroundColor: announcement.bgColor,
                borderLeft: `4px solid ${announcement.color}`
              }}
            >
              <div style={styles.announcementCardIcon}>
                {announcement.icon}
              </div>
              <div style={styles.announcementCardContent}>
                <h4 style={styles.announcementCardTitle}>{announcement.title}</h4>
                <p style={styles.announcementCardMessage}>{announcement.message}</p>
                {announcement.code && (
                  <button
                    style={styles.announcementCardCode}
                    onClick={() => handleCopyCode(announcement.code)}
                  >
                    {copiedCode === announcement.code ? '✓ Copied!' : `Use code: ${announcement.code}`}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Banner */}
      <div style={styles.newsletterBanner}>
        <div style={styles.newsletterContent}>
          <h3 style={styles.newsletterTitle}>Be the First to Know</h3>
          <p style={styles.newsletterText}>Subscribe to get notified about new arrivals and exclusive launches</p>
          <div style={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={styles.newsletterInput}
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
            />
            <button 
              style={styles.newsletterBtn}
              onClick={() => {
                if (notifyEmail) {
                  showNotification('Subscribed successfully! 🎉');
                  setNotifyEmail('');
                }
              }}
            >
              Notify Me
            </button>
          </div>
          <p style={styles.newsletterNote}>
            Join 10,000+ subscribers • No spam, unsubscribe anytime
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div style={styles.quickLinks}>
        <h4 style={styles.quickLinksTitle}>Quick Links</h4>
        <div style={styles.quickLinksGrid}>
          <a href="/shop?category=lips" style={styles.quickLink}>
            Lip Collection <ChevronRight size={14} />
          </a>
          <a href="/shop?category=eyes" style={styles.quickLink}>
            Eye Makeup <ChevronRight size={14} />
          </a>
          <a href="/shop?category=face" style={styles.quickLink}>
            Face Makeup <ChevronRight size={14} />
          </a>
          <a href="/shop?category=skincare" style={styles.quickLink}>
            Skincare <ChevronRight size={14} />
          </a>
          <a href="/shop?category=nails" style={styles.quickLink}>
            Nail Collection <ChevronRight size={14} />
          </a>
          <a href="/sale" style={styles.quickLink}>
            Sale <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #fff9f9 0%, #fff5f5 100%)',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
    padding: '2rem 5%',
    position: 'relative'
  },
  floatingAnnouncement: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: 'linear-gradient(135deg, #b76e79, #d4af37)',
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '50px',
    boxShadow: '0 10px 30px rgba(183, 110, 121, 0.3)',
    zIndex: 1000,
    animation: 'slideIn 0.5s ease, bounce 2s infinite',
    maxWidth: '350px',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  closeAnnouncement: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white',
    position: 'absolute',
    top: '-10px',
    right: '-10px'
  },
  announcementContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    flex: 1
  },
  announcementIcon: {
    animation: 'pulse 2s infinite'
  },
  announcementText: {
    fontSize: '0.9rem',
    fontWeight: 500
  },
  announcementTitle: {
    fontWeight: 700
  },
  announcementsBar: {
    background: 'white',
    padding: '0.8rem 1.5rem',
    borderRadius: '50px',
    marginBottom: '2rem',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    border: '1px solid rgba(183, 110, 121, 0.1)'
  },
  announcementsIcon: {
    color: '#b76e79',
    animation: 'pulse 2s infinite'
  },
  announcementsSlider: {
    flex: 1,
    overflow: 'hidden'
  },
  announcementSlide: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
    animation: 'fadeIn 0.5s ease'
  },
  announcementType: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontWeight: 600,
    fontSize: '0.9rem'
  },
  announcementMessage: {
    color: '#666',
    fontSize: '0.9rem'
  },
  codeButton: {
    background: 'linear-gradient(135deg, #b76e79, #d4af37)',
    border: 'none',
    padding: '0.3rem 1rem',
    borderRadius: '50px',
    color: 'white',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  announcementDots: {
    display: 'flex',
    gap: '0.3rem'
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  promoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  promoCard: {
    background: 'white',
    padding: '1rem',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(183, 110, 121, 0.1)',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(183, 110, 121, 0.15)'
    }
  },
  promoTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1rem',
    color: '#5a4e4a',
    margin: '0.5rem 0 0.2rem'
  },
  promoText: {
    fontSize: '0.8rem',
    color: '#b76e79',
    fontWeight: 500
  },
  notification: {
    position: 'fixed',
    top: '100px',
    right: '20px',
    padding: '1rem 2rem',
    borderRadius: '50px',
    color: 'white',
    zIndex: 1000,
    animation: 'slideIn 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  // Hero Banner - Reduced height
  heroBanner: {
    background: 'linear-gradient(135deg, #f8d7da, #fff0f0)',
    borderRadius: '20px',
    padding: '2rem 2rem',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#000',
    animation: 'fadeIn 1s ease',
    boxShadow: '0 5px 20px rgba(183, 110, 121, 0.15)'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  heroIcon: {
    marginBottom: '0.5rem',
    animation: 'pulse 2s infinite'
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
    marginBottom: '0.5rem',
    fontWeight: 700,
    color: '#000'
  },
  heroSubtitle: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    opacity: 0.8,
    color: '#000'
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap'
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(5px)',
    padding: '1rem 1.5rem',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.3rem',
    minWidth: '120px',
    color: '#000',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#000'
  },
  statLabel: {
    fontSize: '0.8rem',
    opacity: 0.8,
    color: '#000'
  },
  countdownTimer: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '0.6rem 1.2rem',
    borderRadius: '50px',
    fontSize: '0.85rem',
    backdropFilter: 'blur(5px)',
    marginTop: '0.5rem',
    color: '#000',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  countdownText: {
    opacity: 0.8,
    color: '#000'
  },
  countdownTime: {
    fontWeight: 700,
    color: '#b76e79'
  },
  searchFilterBar: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  },
  searchWrapper: {
    flex: 1,
    position: 'relative',
    minWidth: '280px'
  },
  searchIcon: {
    position: 'absolute',
    left: '1.2rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#b76e79'
  },
  searchInput: {
    width: '100%',
    padding: '1rem 1.5rem 1rem 3.5rem',
    borderRadius: '60px',
    border: '1px solid rgba(183, 110, 121, 0.2)',
    background: 'white',
    fontSize: '1rem',
    outline: 'none',
    boxShadow: '0 4px 12px rgba(183, 110, 121, 0.1)',
    color: '#5a4e4a'
  },
  filterToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0 2rem',
    background: 'white',
    border: '1px solid rgba(183, 110, 121, 0.2)',
    borderRadius: '60px',
    color: '#5a4e4a',
    fontWeight: 500,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(183, 110, 121, 0.1)',
    transition: 'all 0.3s ease'
  },
  categoryFilters: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    padding: '1rem',
    background: 'white',
    borderRadius: '60px',
    boxShadow: '0 4px 12px rgba(183, 110, 121, 0.1)'
  },
  categoryFilterBtn: {
    padding: '0.5rem 1.5rem',
    border: '1px solid',
    borderRadius: '50px',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem'
  },
  countDisplay: {
    textAlign: 'right',
    marginBottom: '2rem',
    color: '#666',
    fontSize: '0.9rem'
  },
  section: {
    marginBottom: '4rem',
    animation: 'fadeIn 0.8s ease'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    padding: '1rem 1.5rem',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 4px 12px rgba(183, 110, 121, 0.1)',
    border: '1px solid rgba(183, 110, 121, 0.1)'
  },
  sectionTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  sectionIcon: {
    fontSize: '2rem',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    color: '#b76e79',
    marginBottom: '0.25rem'
  },
  sectionDescription: {
    color: '#666',
    fontSize: '0.85rem'
  },
  sectionBadge: {
    display: 'flex',
    alignItems: 'center',
    color: '#b76e79',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #f8d7da, #fff0f0)',
    padding: '0.5rem 1.5rem',
    borderRadius: '50px',
    fontSize: '0.9rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem'
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(183, 110, 121, 0.1)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 8px 24px rgba(183, 110, 121, 0.2)'
    }
  },
  imageContainer: {
    position: 'relative',
    paddingTop: '100%',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #f8d7da, #fff0f0)'
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
  },
  badge: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    padding: '0.3rem 1rem',
    borderRadius: '50px',
    color: 'white',
    fontSize: '0.7rem',
    fontWeight: '600',
    zIndex: 2,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  wishlistBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    background: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 2
  },
  launchDate: {
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '0.3rem 1rem',
    borderRadius: '50px',
    fontSize: '0.7rem',
    color: '#5a4e4a',
    fontWeight: '500',
    zIndex: 2,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center'
  },
  stockWarning: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    background: '#dc3545',
    color: 'white',
    padding: '0.3rem 1rem',
    borderRadius: '50px',
    fontSize: '0.7rem',
    fontWeight: '600',
    zIndex: 2,
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    animation: 'pulse 2s infinite'
  },
  info: {
    padding: '1.5rem'
  },
  category: {
    color: '#b76e79',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '0.3rem'
  },
  name: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.1rem',
    color: '#5a4e4a',
    marginBottom: '0.5rem',
    fontWeight: 600
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem'
  },
  stars: {
    display: 'flex',
    gap: '2px'
  },
  ratingCount: {
    color: '#999',
    fontSize: '0.75rem'
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#b76e79',
    marginRight: '0.5rem'
  },
  originalPrice: {
    fontSize: '0.9rem',
    color: '#999',
    textDecoration: 'line-through'
  },
  shadeInfo: {
    color: '#666',
    fontSize: '0.8rem',
    background: '#f5f5f5',
    padding: '0.2rem 0.8rem',
    borderRadius: '50px'
  },
  addBtn: {
    width: '100%',
    padding: '0.8rem',
    border: '2px solid #b76e79',
    borderRadius: '50px',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  notifyContainer: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  notifyInput: {
    flex: 1,
    padding: '0.8rem',
    border: '1px solid rgba(183, 110, 121, 0.2)',
    borderRadius: '50px',
    fontSize: '0.8rem',
    outline: 'none',
    minWidth: '140px'
  },
  notifyBtn: {
    padding: '0.8rem 1rem',
    background: 'linear-gradient(135deg, #b76e79, #d4af37)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    whiteSpace: 'nowrap'
  },
  noProducts: {
    textAlign: 'center',
    padding: '5rem 2rem',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 4px 12px rgba(183, 110, 121, 0.1)',
    marginTop: '2rem'
  },
  clearBtn: {
    background: 'linear-gradient(135deg, #b76e79, #d4af37)',
    color: 'white',
    border: 'none',
    padding: '0.8rem 2rem',
    borderRadius: '50px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  announcementsGrid: {
    marginTop: '4rem',
    marginBottom: '4rem'
  },
  announcementsGridTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.8rem',
    color: '#b76e79',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  announcementsGridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  announcementCard: {
    display: 'flex',
    gap: '1rem',
    padding: '1.5rem',
    borderRadius: '15px',
    background: 'white',
    boxShadow: '0 4px 12px rgba(183, 110, 121, 0.1)',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(183, 110, 121, 0.15)'
    }
  },
  announcementCardIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  announcementCardContent: {
    flex: 1
  },
  announcementCardTitle: {
    fontSize: '1rem',
    color: '#5a4e4a',
    marginBottom: '0.3rem',
    fontWeight: 600
  },
  announcementCardMessage: {
    fontSize: '0.85rem',
    color: '#666',
    marginBottom: '0.5rem'
  },
  announcementCardCode: {
    background: 'none',
    border: '1px dashed #b76e79',
    padding: '0.3rem 1rem',
    borderRadius: '50px',
    color: '#b76e79',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  newsletterBanner: {
    background: 'linear-gradient(135deg, #b76e79, #d4af37)',
    borderRadius: '30px',
    padding: '4rem 2rem',
    marginTop: '4rem',
    textAlign: 'center',
    color: 'white'
  },
  newsletterContent: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  newsletterTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  newsletterText: {
    fontSize: '1rem',
    marginBottom: '2rem',
    opacity: 0.9
  },
  newsletterForm: {
    display: 'flex',
    gap: '1rem',
    maxWidth: '500px',
    margin: '0 auto',
    flexWrap: 'wrap'
  },
  newsletterInput: {
    flex: 1,
    padding: '1rem 1.5rem',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1rem',
    outline: 'none',
    minWidth: '250px'
  },
  newsletterBtn: {
    padding: '1rem 2rem',
    background: 'white',
    color: '#b76e79',
    border: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  newsletterNote: {
    fontSize: '0.8rem',
    marginTop: '1rem',
    opacity: 0.8
  },
  quickLinks: {
    marginTop: '3rem',
    padding: '2rem',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 4px 12px rgba(183, 110, 121, 0.1)'
  },
  quickLinksTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.2rem',
    color: '#b76e79',
    marginBottom: '1.5rem'
  },
  quickLinksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem'
  },
  quickLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.8rem 1rem',
    background: 'linear-gradient(135deg, #f8d7da, #fff0f0)',
    borderRadius: '10px',
    color: '#5a4e4a',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateX(5px)',
      background: 'linear-gradient(135deg, #b76e79, #d4af37)',
      color: 'white'
    }
  }
};

export default NewArrivals;