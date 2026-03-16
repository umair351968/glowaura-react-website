import { ShoppingCart, Heart } from 'lucide-react';
import { addToCart, isFavorite, addToFavorites, removeFromFavorites } from '../utils/storageManager';
import { useState } from 'react';

function ProductCard({product}) {
  const [isFav, setIsFav] = useState(isFavorite(product.id));
  
  const handleAddToCart = () => {
    const success = addToCart(product);
    if (success) {
      showNotification(`${product.name} added to cart!`);
      // Dispatch custom event to notify Cart component
      window.dispatchEvent(new Event('cartUpdated'));
    } else {
      showNotification('Failed to add item to cart');
    }
  };

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFromFavorites(product.id);
      setIsFav(false);
      showNotification('Removed from favorites');
    } else {
      addToFavorites(product);
      setIsFav(true);
      showNotification('Added to favorites');
    }
    // Dispatch custom event to notify Cart component
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.innerHTML = `<span>${message}</span>`;
    notification.className = 'cart-toast';
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #b76e79;
      color: white;
      padding: 0.8rem 1.5rem;
      border-radius: 30px;
      font-size: 0.9rem;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(183, 110, 121, 0.3);
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img loading="lazy" src={product.image} alt={product.name} />
        <div className="card-badges">
          <span className="new-badge">New</span>
        </div>
      </div>
      <h3>{product.name}</h3>
      {product.description && (
        <p className="product-description">{product.description}</p>
      )}
      <div className="product-meta">
        <p className="price">{product.price}</p>
        <p className="rating">{product.rating}</p>
      </div>
      <div className="product-actions">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={20} />
          Add to Cart
        </button>
        <div className="quick-actions">
          <button 
            className="quick-btn"
            onClick={handleToggleFavorite}
            style={{ color: isFav ? '#b76e79' : '#999' }}
          >
            <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
          </button>
          <button className="quick-btn">Quick View</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
