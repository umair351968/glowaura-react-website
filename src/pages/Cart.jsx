// src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Trash2, Heart, ChevronRight, ChevronLeft,
  Tag, Shield, Truck, Gift, CreditCard, ArrowRight,
  Minus, Plus, X, Lock, Sparkles
} from 'lucide-react';
import { 
  getCart, 
  saveCart, 
  removeFromCart, 
  updateCartQuantity,
  getFavorites,
  addToFavorites,
  removeFromFavorites 
} from '../utils/storageManager';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '' });

  // Load cart and favorites from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = getCart();
      const storedFavorites = getFavorites();
      
      setCartItems(storedCart);
      setSavedForLater(storedFavorites);
      setLoading(false);
    } catch (error) {
      console.error('Error loading cart data:', error);
      setLoading(false);
    }
  }, []);

  // Listen for storage changes from other tabs/windows or ProductCard
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = getCart();
      const updatedFavorites = getFavorites();
      
      setCartItems(updatedCart);
      setSavedForLater(updatedFavorites);
    };

    // Listen for storage events (from other tabs)
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom cart update event (from ProductCard in same tab)
    window.addEventListener('cartUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price;
    return sum + (price * (item.quantity || 1));
  }, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount if promo applied
  const total = subtotal + shipping + tax - discount;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const item = cartItems.find(item => item.id === id);
    if (!item) return;
    
    if (newQuantity > (item.maxQuantity || 10)) {
      showNotification(`Maximum ${item.maxQuantity || 10} items allowed`);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    saveCart(updatedCart);
    removeFromCart(id);
    showNotification('Item removed from cart');
  };

  const handleSaveForLater = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;
    
    const updatedCart = cartItems.filter(item => item.id !== id);
    const updatedFavorites = [...savedForLater, { ...item, quantity: undefined }];
    
    setCartItems(updatedCart);
    setSavedForLater(updatedFavorites);
    
    saveCart(updatedCart);
    addToFavorites({ ...item, quantity: undefined });
    
    showNotification('Item saved for later');
  };

  const handleMoveToCart = (id) => {
    const item = savedForLater.find(item => item.id === id);
    if (!item) return;
    
    const updatedFavorites = savedForLater.filter(item => item.id !== id);
    const updatedCart = [...cartItems, { ...item, quantity: 1, maxQuantity: 5 }];
    
    setSavedForLater(updatedFavorites);
    setCartItems(updatedCart);
    
    saveCart(updatedCart);
    removeFromFavorites(id);
    
    showNotification('Item moved to cart');
  };

  const handleRemoveSaved = (id) => {
    const updatedFavorites = savedForLater.filter(item => item.id !== id);
    setSavedForLater(updatedFavorites);
    removeFromFavorites(id);
    showNotification('Item removed');
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'glow20') {
      setPromoApplied(true);
      setPromoError('');
      showNotification('Promo code applied! 20% off');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  // Recommended products
  const recommended = [
    {
      id: 101,
      name: "Lip Gloss Set",
      price: 29.99,
      image: "https://images.pexels.com/photos/7810635/pexels-photo-7810635.jpeg",
      category: "Lips"
    },
    {
      id: 102,
      name: "Mascara Volume Boost",
      price: 26.99,
      image: "https://images.pexels.com/photos/1383537/pexels-photo-1383537.jpeg",
      category: "Eyes"
    },
    {
      id: 103,
      name: "BB Cream",
      price: 32.99,
      image: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg",
      category: "Face"
    },
    {
      id: 104,
      name: "Face Mask",
      price: 35.99,
      image: "https://images.pexels.com/photos/3738345/pexels-photo-3738345.jpeg",
      category: "Skincare"
    }
  ];

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Notification */}
      {notification.show && (
        <div style={styles.notification}>
          {notification.message}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.loader}></div>
          <p>Loading your cart...</p>
        </div>
      )}

      {/* Hero Section */}
      <div style={styles.hero}>
        <ShoppingBag size={32} color="#b76e79" />
        <h1 style={styles.heroTitle}>Your Cart</h1>
        <p style={styles.heroSubtitle}>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
      </div>

      {!loading && (
        <>
          {cartItems.length === 0 && savedForLater.length === 0 ? (
            // Empty Cart
            <div style={styles.emptyCart}>
          <ShoppingBag size={64} color="#d4af37" style={styles.emptyIcon} />
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptyText}>Looks like you haven't added anything to your cart yet</p>
          <button 
            style={styles.shopBtn}
            onClick={() => window.location.href = '/shop'}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Main Cart Section */}
          <div style={styles.cartGrid}>
            {/* Cart Items */}
            <div style={styles.cartItems}>
              {cartItems.map(item => (
                <div key={item.id} style={styles.cartItem}>
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                  
                  <div style={styles.itemDetails}>
                    <div style={styles.itemHeader}>
                      <div>
                        <p style={styles.itemCategory}>{item.category || 'Product'}</p>
                        <h3 style={styles.itemName}>{item.name}</h3>
                        <p style={styles.itemShade}>{item.shade || 'Default'}</p>
                      </div>
                      <p style={styles.itemPrice}>
                        ${((typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price) * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                    
                    <div style={styles.itemActions}>
                      <div style={styles.quantityControl}>
                        <button 
                          style={styles.quantityBtn}
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={styles.quantity}>{item.quantity}</span>
                        <button 
                          style={styles.quantityBtn}
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div style={styles.actionButtons}>
                        <button 
                          style={styles.actionBtn}
                          onClick={() => handleSaveForLater(item.id)}
                        >
                          <Heart size={16} />
                          Save
                        </button>
                        <button 
                          style={styles.actionBtn}
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {item.quantity === item.maxQuantity && (
                      <p style={styles.maxWarning}>Max quantity reached</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Continue Shopping Link */}
              <a href="/shop" style={styles.continueLink}>
                <ChevronLeft size={16} />
                Continue Shopping
              </a>
            </div>

            {/* Order Summary */}
            <div style={styles.summary}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>
              
              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div style={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              <div style={styles.summaryRow}>
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              {promoApplied && (
                <div style={{...styles.summaryRow, color: '#28a745'}}>
                  <span>Discount (10%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div style={styles.summaryTotal}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div style={styles.promoSection}>
                <div style={styles.promoInputGroup}>
                  <Tag size={18} color="#b76e79" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={styles.promoInput}
                    disabled={promoApplied}
                  />
                  <button 
                    style={styles.promoBtn}
                    onClick={handleApplyPromo}
                    disabled={promoApplied}
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p style={styles.promoError}>{promoError}</p>}
                {promoApplied && (
                  <p style={styles.promoSuccess}>✓ Promo code applied!</p>
                )}
              </div>

              {/* Checkout Button */}
              <button style={styles.checkoutBtn}>
                <Lock size={18} />
                Proceed to Checkout
              </button>

              {/* Payment Icons */}
              <div style={styles.paymentIcons}>
                <CreditCard size={20} color="#666" />
                <span style={styles.paymentText}>Secure Checkout</span>
                <Shield size={20} color="#666" />
              </div>

              {/* Shipping Info */}
              <div style={styles.shippingInfo}>
                <Truck size={16} color="#b76e79" />
                <span>Free shipping on orders over $50</span>
              </div>
            </div>
          </div>

          {/* Saved for Later Section */}
          {savedForLater.length > 0 && (
            <div style={styles.savedSection}>
              <h2 style={styles.savedTitle}>Saved for Later ({savedForLater.length})</h2>
              <div style={styles.savedGrid}>
                {savedForLater.map(item => (
                  <div key={item.id} style={styles.savedCard}>
                    <img src={item.image} alt={item.name} style={styles.savedImage} />
                    <button 
                      style={styles.removeSavedBtn}
                      onClick={() => handleRemoveSaved(item.id)}
                    >
                      <X size={14} />
                    </button>
                    <div style={styles.savedInfo}>
                      <p style={styles.savedCategory}>{item.category}</p>
                      <h3 style={styles.savedName}>{item.name}</h3>
                      <p style={styles.savedShade}>{item.shade}</p>
                      <p style={styles.savedPrice}>${item.price.toFixed(2)}</p>
                      <button 
                        style={styles.moveToCartBtn}
                        onClick={() => handleMoveToCart(item.id)}
                      >
                        Move to Cart
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Products */}
          <div style={styles.recommendedSection}>
            <h2 style={styles.recommendedTitle}>You May Also Like</h2>
            <div style={styles.recommendedGrid}>
              {recommended.map(item => (
                <div key={item.id} style={styles.recommendedCard}>
                  <img src={item.image} alt={item.name} style={styles.recommendedImage} />
                  <p style={styles.recommendedCategory}>{item.category}</p>
                  <h3 style={styles.recommendedName}>{item.name}</h3>
                  <p style={styles.recommendedPrice}>${item.price.toFixed(2)}</p>
                  <button style={styles.recommendedBtn}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Cards */}
          <div style={styles.benefitsGrid}>
            <div style={styles.benefitCard}>
              <Truck size={24} color="#b76e79" />
              <h4 style={styles.benefitTitle}>Free Shipping</h4>
              <p style={styles.benefitText}>On orders over $50</p>
            </div>
            <div style={styles.benefitCard}>
              <Gift size={24} color="#b76e79" />
              <h4 style={styles.benefitTitle}>Free Samples</h4>
              <p style={styles.benefitText}>With every order</p>
            </div>
            <div style={styles.benefitCard}>
              <Shield size={24} color="#b76e79" />
              <h4 style={styles.benefitTitle}>Secure Payment</h4>
              <p style={styles.benefitText}>100% protected</p>
            </div>
            <div style={styles.benefitCard}>
              <Sparkles size={24} color="#b76e79" />
              <h4 style={styles.benefitTitle}>Easy Returns</h4>
              <p style={styles.benefitText}>30-day return policy</p>
            </div>
          </div>
        </>
      )}
      </>
      )}
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
  notification: {
    position: 'fixed',
    top: '100px',
    right: '20px',
    background: '#b76e79',
    color: 'white',
    padding: '0.8rem 1.5rem',
    borderRadius: '30px',
    fontSize: '0.9rem',
    zIndex: 1000,
    animation: 'slideIn 0.3s ease',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.3)',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '3rem',
    animation: 'fadeIn 0.8s ease',
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2.5rem',
    color: '#b76e79',
    margin: '0.5rem 0 0.2rem',
    fontWeight: 600,
  },
  heroSubtitle: {
    fontSize: '1rem',
    color: '#666',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'white',
    borderRadius: '24px',
    maxWidth: '500px',
    margin: '0 auto',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 20px rgba(183, 110, 121, 0.08)',
  },
  emptyIcon: {
    marginBottom: '1.5rem',
    opacity: 0.8,
  },
  emptyTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.8rem',
    color: '#b76e79',
    marginBottom: '1rem',
  },
  emptyText: {
    color: '#666',
    marginBottom: '2rem',
  },
  shopBtn: {
    background: 'linear-gradient(135deg, #b76e79, #d4af37)',
    color: 'white',
    border: 'none',
    padding: '1rem 2.5rem',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(183, 110, 121, 0.3)',
    },
  },
  cartGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '2rem',
    marginBottom: '3rem',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
    },
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cartItem: {
    display: 'flex',
    gap: '1.5rem',
    background: 'white',
    padding: '1.5rem',
    borderRadius: '20px',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.05)',
    animation: 'fadeIn 0.5s ease',
    transition: 'all 0.3s ease',
    ':hover': {
      boxShadow: '0 8px 25px rgba(183, 110, 121, 0.1)',
    },
    '@media (max-width: 568px)': {
      flexDirection: 'column',
    },
  },
  itemImage: {
    width: '120px',
    height: '120px',
    borderRadius: '16px',
    objectFit: 'cover',
    '@media (max-width: 568px)': {
      width: '100%',
      height: '200px',
    },
  },
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    '@media (max-width: 568px)': {
      flexDirection: 'column',
      gap: '0.5rem',
    },
  },
  itemCategory: {
    fontSize: '0.8rem',
    color: '#b76e79',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '0.3rem',
  },
  itemName: {
    fontSize: '1.1rem',
    color: '#5a4e4a',
    fontWeight: 600,
    marginBottom: '0.3rem',
  },
  itemShade: {
    fontSize: '0.85rem',
    color: '#999',
  },
  itemPrice: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#b76e79',
  },
  itemActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: '#f5f5f5',
    padding: '0.3rem',
    borderRadius: '30px',
  },
  quantityBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: 'none',
    background: 'white',
    color: '#b76e79',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      background: '#b76e79',
      color: 'white',
    },
  },
  quantity: {
    minWidth: '30px',
    textAlign: 'center',
    fontSize: '0.95rem',
    fontWeight: 500,
  },
  actionButtons: {
    display: 'flex',
    gap: '0.5rem',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    background: 'none',
    border: 'none',
    color: '#666',
    fontSize: '0.85rem',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    transition: 'all 0.2s ease',
    ':hover': {
      background: '#fce4e8',
      color: '#b76e79',
    },
  },
  maxWarning: {
    fontSize: '0.8rem',
    color: '#dc3545',
    marginTop: '0.5rem',
  },
  continueLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    color: '#b76e79',
    textDecoration: 'none',
    fontSize: '0.9rem',
    marginTop: '1rem',
    transition: 'all 0.2s ease',
    ':hover': {
      gap: '0.5rem',
      color: '#d4af37',
    },
  },
  summary: {
    background: 'white',
    padding: '2rem',
    borderRadius: '20px',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.05)',
    height: 'fit-content',
    position: 'sticky',
    top: '100px',
  },
  summaryTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.3rem',
    color: '#b76e79',
    marginBottom: '1.5rem',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontSize: '0.95rem',
    color: '#666',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(183, 110, 121, 0.1)',
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#b76e79',
  },
  promoSection: {
    marginTop: '1.5rem',
  },
  promoInputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: '#f5f5f5',
    padding: '0.3rem',
    borderRadius: '50px',
  },
  promoInput: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    padding: '0.5rem',
    fontSize: '0.9rem',
    outline: 'none',
    color: '#5a4e4a',
    ':disabled': {
      opacity: 0.5,
    },
  },
  promoBtn: {
    background: '#b76e79',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1.2rem',
    borderRadius: '50px',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      background: '#d4af37',
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  promoError: {
    fontSize: '0.8rem',
    color: '#dc3545',
    marginTop: '0.3rem',
  },
  promoSuccess: {
    fontSize: '0.8rem',
    color: '#28a745',
    marginTop: '0.3rem',
  },
  checkoutBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    background: 'linear-gradient(135deg, #b76e79, #d4af37)',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '1.5rem',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(183, 110, 121, 0.3)',
    },
  },
  paymentIcons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  paymentText: {
    fontSize: '0.85rem',
    color: '#666',
  },
  shippingInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
    padding: '0.8rem',
    background: '#fce4e8',
    borderRadius: '12px',
    fontSize: '0.85rem',
    color: '#b76e79',
  },
  savedSection: {
    marginTop: '3rem',
    marginBottom: '3rem',
  },
  savedTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    color: '#b76e79',
    marginBottom: '1.5rem',
  },
  savedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  savedCard: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.05)',
    position: 'relative',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(183, 110, 121, 0.1)',
    },
  },
  savedImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  removeSavedBtn: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    ':hover': {
      background: '#dc3545',
      color: 'white',
    },
  },
  savedInfo: {
    padding: '1rem',
  },
  savedCategory: {
    fontSize: '0.7rem',
    color: '#b76e79',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '0.3rem',
  },
  savedName: {
    fontSize: '1rem',
    color: '#5a4e4a',
    fontWeight: 600,
    marginBottom: '0.3rem',
  },
  savedShade: {
    fontSize: '0.75rem',
    color: '#999',
    marginBottom: '0.5rem',
  },
  savedPrice: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#b76e79',
    marginBottom: '0.8rem',
  },
  moveToCartBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.3rem',
    background: 'transparent',
    border: '1px solid #b76e79',
    color: '#b76e79',
    padding: '0.5rem',
    borderRadius: '25px',
    fontSize: '0.8rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      background: '#b76e79',
      color: 'white',
    },
  },
  recommendedSection: {
    marginTop: '3rem',
    marginBottom: '3rem',
  },
  recommendedTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    color: '#b76e79',
    marginBottom: '1.5rem',
  },
  recommendedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '1.5rem',
  },
  recommendedCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '1rem',
    textAlign: 'center',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.05)',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(183, 110, 121, 0.1)',
    },
  },
  recommendedImage: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '0.8rem',
  },
  recommendedCategory: {
    fontSize: '0.7rem',
    color: '#b76e79',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '0.3rem',
  },
  recommendedName: {
    fontSize: '0.95rem',
    color: '#5a4e4a',
    fontWeight: 600,
    marginBottom: '0.3rem',
  },
  recommendedPrice: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#b76e79',
    marginBottom: '0.8rem',
  },
  recommendedBtn: {
    width: '100%',
    padding: '0.5rem',
    background: 'transparent',
    border: '1px solid #b76e79',
    color: '#b76e79',
    borderRadius: '25px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      background: '#b76e79',
      color: 'white',
    },
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    marginTop: '3rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
    },
  },
  benefitCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid rgba(183, 110, 121, 0.1)',
    boxShadow: '0 4px 15px rgba(183, 110, 121, 0.05)',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(183, 110, 121, 0.1)',
    },
  },
  benefitTitle: {
    fontSize: '1rem',
    color: '#b76e79',
    margin: '0.8rem 0 0.3rem',
    fontWeight: 600,
  },
  benefitText: {
    fontSize: '0.85rem',
    color: '#666',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    gap: '1rem',
  },
  loader: {
    border: '4px solid #f5f5f5',
    borderTop: '4px solid #b76e79',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
};

export default Cart;