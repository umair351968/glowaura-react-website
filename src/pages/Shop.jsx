// src/pages/Shop.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { Search, ShoppingBag, Heart } from 'lucide-react';
import { addToCart as addToCartStorage, isFavorite, addToFavorites, removeFromFavorites } from '../utils/storageManager';

// Sample product data organized by categories
const productCategories = {
  lipstick: {
    title: "Lipstick Collection",
    icon: "💋",
    description: "Velvet mattes & high-shines for perfect pout",
    products: [
      {
        id: 101,
        name: "Velvet Matte Lipstick",
        category: "Matte Lipstick",
        price: 24.99,
        rating: 4.5,
        image: "https://images.pexels.com/photos/1625037/pexels-photo-1625037.jpeg",
        badge: "Bestseller",
        shade: "Rose Petal"
      },
      {
        id: 102,
        name: "Liquid Lip Stain",
        category: "Liquid Lipstick",
        price: 22.99,
        rating: 4.7,
        image: "https://images.pexels.com/photos/8145764/pexels-photo-8145764.jpeg",
        badge: "New",
        shade: "Cherry Blossom"
      },
      {
        id: 103,
        name: "High-Shine Lip Gloss",
        category: "Lip Gloss",
        price: 19.99,
        rating: 4.4,
        image: "https://images.pexels.com/photos/15854300/pexels-photo-15854300.jpeg",
        badge: null,
        shade: "Champagne"
      },
      {
        id: 104,
        name: "Watercolor Lip Tint",
        category: "Lip Tint",
        price: 21.99,
        rating: 4.6,
        image: "https://images.pexels.com/photos/3551723/pexels-photo-3551723.jpeg",
        badge: "Limited",
        shade: "Peach"
      },
      {
        id: 105,
        name: "Nourishing Lip Balm",
        category: "Lip Balm",
        price: 16.99,
        rating: 4.8,
        image: "https://images.pexels.com/photos/8399096/pexels-photo-8399096.jpeg",
        badge: "Bestseller",
        shade: "Unscented"
      }
    ]
  },
  eyes: {
    title: "Eye Makeup",
    icon: "👁️",
    description: "Mesmerizing looks that captivate",
    products: [
      {
        id: 201,
        name: "Volume Boost Mascara",
        category: "Mascara",
        price: 26.99,
        rating: 4.6,
        image: "https://images.pexels.com/photos/6713327/pexels-photo-6713327.jpeg",
        badge: "Bestseller",
        shade: "Black"
      },
      {
        id: 202,
        name: "Precision Liquid Eyeliner",
        category: "Eyeliner",
        price: 23.99,
        rating: 4.5,
        image: "https://images.pexels.com/photos/7585308/pexels-photo-7585308.jpeg",
        badge: "New",
        shade: "Deep Black"
      },
      {
        id: 203,
        name: "Sunset Eyeshadow Palette",
        category: "Eyeshadow",
        price: 45.99,
        rating: 4.9,
        image: "https://images.pexels.com/photos/11309261/pexels-photo-11309261.jpeg",
        badge: "Limited",
        shade: "12 Colors"
      },
      {
        id: 204,
        name: "Micro Brow Pencil",
        category: "Eyebrow",
        price: 21.99,
        rating: 4.4,
        image: "https://images.pexels.com/photos/8558530/pexels-photo-8558530.jpeg",
        badge: null,
        shade: "Soft Brown"
      },
      {
        id: 205,
        name: "Eye Shadow",
        category: "Eye Shadow",
        price: 18.99,
        rating: 4.7,
        image: "https://images.pexels.com/photos/7290118/pexels-photo-7290118.jpeg",
        badge: "Bestseller",
        shade: "Red"
      }
    ]
  },
  face: {
    title: "Face Makeup",
    icon: "✨",
    description: "Flawless complexion, radiant finish",
    products: [
      {
        id: 301,
        name: "Radiant Glow Foundation",
        category: "Foundation",
        price: 39.99,
        rating: 4.7,
        image: "https://images.pexels.com/photos/5141085/pexels-photo-5141085.jpeg",
        badge: "New",
        shade: "Ivory"
      },
      {
        id: 302,
        name: "Skin Tint BB Cream",
        category: "BB Cream",
        price: 32.99,
        rating: 4.5,
        image: "https://images.pexels.com/photos/7817588/pexels-photo-7817588.png",
        badge: "Bestseller",
        shade: "Light Medium"
      },
      {
        id: 303,
        name: "Brightening Concealer",
        category: "Concealer",
        price: 27.99,
        rating: 4.8,
        image: "https://images.pexels.com/photos/2633987/pexels-photo-2633987.jpeg",
        badge: "Bestseller",
        shade: "Vanilla"
      },
      {
        id: 304,
        name: "Silk Finish Compact",
        category: "Powder",
        price: 29.99,
        rating: 4.6,
        image: "https://images.pexels.com/photos/28968526/pexels-photo-28968526.jpeg",
        badge: null,
        shade: "Translucent"
      },
      {
        id: 305,
        name: "Peachy Keen Blush",
        category: "Blush",
        price: 25.99,
        rating: 4.7,
        image: "https://images.pexels.com/photos/1173981/pexels-photo-1173981.jpeg",
        badge: "Limited",
        shade: "Peach"
      }
    ]
  },
  nails: {
    title: "Nail Collection",
    icon: "💅",
    description: "Perfectly polished fingertips",
    products: [
      {
        id: 401,
        name: "Long Wear Nail Polish",
        category: "Nail Polish",
        price: 15.99,
        rating: 4.5,
        image: "https://images.pexels.com/photos/10390405/pexels-photo-10390405.jpeg",
        badge: "Bestseller",
        shade: "Rose Gold"
      },
      {
        id: 402,
        name: "Gel Effect Polish",
        category: "Gel Polish",
        price: 19.99,
        rating: 4.6,
        image: "https://images.pexels.com/photos/6135696/pexels-photo-6135696.jpeg",
        badge: "New",
        shade: "Ruby Red"
      },
      {
        id: 403,
        name: "Pro Nail Art Kit",
        category: "Nail Art",
        price: 34.99,
        rating: 4.4,
        image: "https://images.pexels.com/photos/3892371/pexels-photo-3892371.jpeg",
        badge: "Limited",
        shade: "5 Pieces"
      },
      {
        id: 404,
        name: "Gentle Nail Remover",
        category: "Remover",
        price: 12.99,
        rating: 4.5,
        image: "https://images.pexels.com/photos/14438226/pexels-photo-14438226.jpeg",
        badge: null,
        shade: "Acetone-free"
      },
      {
        id: 405,
        name: "Cuticle Nourishing Oil",
        category: "Nail Care",
        price: 22.99,
        rating: 4.8,
        image: "https://images.pexels.com/photos/28223044/pexels-photo-28223044.jpeg",
        badge: "Bestseller",
        shade: "Vitamin E"
      }
    ]
  },
  skincare: {
    title: "Skincare",
    icon: "🌸",
    description: "Nourish your natural glow",
    products: [
      {
        id: 501,
        name: "Gentle Foaming Face Wash",
        category: "Face Wash",
        price: 28.99,
        rating: 4.7,
        image: "https://images.pexels.com/photos/36078637/pexels-photo-36078637.jpeg",
        badge: "Bestseller",
        shade: "For all skin"
      },
      {
        id: 502,
        name: "Vitamin C Brightening Serum",
        category: "Serum",
        price: 48.99,
        rating: 4.9,
        image: "https://images.pexels.com/photos/6496457/pexels-photo-6496457.jpeg",
        badge: "New",
        shade: "Brightening"
      },
      {
        id: 503,
        name: "Hydrating Gel Moisturizer",
        category: "Moisturizer",
        price: 38.99,
        rating: 4.8,
        image: "https://images.pexels.com/photos/14798289/pexels-photo-14798289.jpeg",
        badge: "Bestseller",
        shade: "24H Hydration"
      },
      {
        id: 504,
        name: "Mineral Sunscreen SPF 50",
        category: "Sunscreen",
        price: 32.99,
        rating: 4.7,
        image: "https://images.pexels.com/photos/16443631/pexels-photo-16443631.jpeg",
        badge: "Limited",
        shade: "Reef-safe"
      },
      {
        id: 505,
        name: "Clay Detox Face Mask",
        category: "Face Mask",
        price: 35.99,
        rating: 4.6,
        image: "https://images.pexels.com/photos/6167443/pexels-photo-6167443.jpeg",
        badge: "Bestseller",
        shade: "Purifying"
      }
    ]
  }
};

function Shop() {
  const navigate = useNavigate(); // Initialize navigate
  const [searchTerm, setSearchTerm] = useState('');
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (productId) => {
    // Find the product
    let productToAdd = null;
    for (const category in productCategories) {
      const product = productCategories[category].products.find(p => p.id === productId);
      if (product) {
        productToAdd = product;
        break;
      }
    }
    
    if (productToAdd) {
      // Add to localStorage using storage manager
      addToCartStorage(productToAdd);
      
      // Dispatch event to update cart
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Show "Added!" feedback
      setAddedToCart({ ...addedToCart, [productId]: true });
      
      // Navigate to cart after 500ms
      setTimeout(() => {
        setAddedToCart({ ...addedToCart, [productId]: false });
        console.log(`✅ Product ${productId} added to cart from Shop`);
        // Navigate to cart page (uncomment if you want auto-redirect)
        // navigate('/cart');
      }, 500);
    }
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

  // Filter function for search
  const filterProducts = (products) => {
    if (!searchTerm) return products;
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap');
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>GlowAura Beauty Shop</h1>
        
        {/* Search Bar */}
        <div style={styles.searchWrapper}>
          <Search style={styles.searchIcon} size={20} />
          <input 
            style={styles.searchInput}
            placeholder="Search products across all categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Sections */}
      {Object.values(productCategories).map((category) => {
        const filteredProducts = filterProducts(category.products);
        if (filteredProducts.length === 0) return null;

        return (
          <div key={category.title} style={styles.categorySection}>
            {/* Category Header */}
            <div style={styles.categoryHeader}>
              <div style={styles.categoryTitleWrapper}>
                <span style={styles.categoryIcon}>{category.icon}</span>
                <div>
                  <h2 style={styles.categoryTitle}>{category.title}</h2>
                  <p style={styles.categoryDescription}>{category.description}</p>
                </div>
              </div>
              <span style={styles.productCount}>{filteredProducts.length} Products</span>
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
                    {product.badge && (
                      <span style={{
                        ...styles.badge,
                        backgroundColor: 
                          product.badge === 'Bestseller' ? '#b76e79' :
                          product.badge === 'New' ? '#8a6d8b' :
                          product.badge === 'Limited' ? '#d4af37' : 
                          product.badge === 'Sale' ? '#b76e79' : '#b76e79'
                      }}>
                        {product.badge}
                      </span>
                    )}
                    
                    {/* Wishlist Button */}
                    <button style={styles.wishlistBtn}>
                      <Heart size={16} color="#b76e79" />
                    </button>
                    
                    {/* Shade */}
                    {product.shade && (
                      <span style={styles.shade}>
                        {product.shade}
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
                      <span style={styles.ratingCount}>({product.rating})</span>
                    </div>
                    
                    <div style={styles.priceContainer}>
                      <span style={styles.price}>${product.price.toFixed(2)}</span>
                    </div>
                    
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* No Results Message */}
      {Object.values(productCategories).every(cat => filterProducts(cat.products).length === 0) && (
        <div style={styles.noProducts}>
          <h3>No Products Found</h3>
          <p>We couldn't find any products matching "{searchTerm}"</p>
          <button 
            style={styles.clearBtn}
            onClick={() => setSearchTerm('')}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #fff9f9 0%, #fff5f5 100%)',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
    padding: '2rem 5%'
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    color: '#5a4e4a',
    marginBottom: '2rem',
    position: 'relative',
    display: 'inline-block'
  },
  searchWrapper: {
    maxWidth: '600px',
    margin: '0 auto',
    position: 'relative'
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
    padding: '1.2rem 1.5rem 1.2rem 3.5rem',
    borderRadius: '60px',
    border: '1px solid rgba(183, 110, 121, 0.2)',
    background: 'white',
    fontSize: '1rem',
    outline: 'none',
    boxShadow: '0 4px 12px rgba(183, 110, 121, 0.1)',
    color: '#5a4e4a'
  },
  categorySection: {
    marginBottom: '4rem'
  },
  categoryHeader: {
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
  categoryTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  categoryIcon: {
    fontSize: '2.5rem',
    background: 'linear-gradient(135deg, #f8d7da, #fff0f0)',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(183, 110, 121, 0.1)'
  },
  categoryTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.8rem',
    color: '#b76e79',
    marginBottom: '0.25rem'
  },
  categoryDescription: {
    color: '#666',
    fontSize: '0.9rem'
  },
  productCount: {
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
  shade: {
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
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
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
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#b76e79'
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
  }
};

export default Shop;