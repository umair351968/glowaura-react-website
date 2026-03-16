// Storage keys
const STORAGE_KEYS = {
  CART: 'glowaura_cart',
  FAVORITES: 'glowaura_favorites'
};

// Cart functions
export const getCart = () => {
  try {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    const result = cart ? JSON.parse(cart) : [];
    console.log('📦 Getting cart from localStorage:', result);
    return result;
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

export const saveCart = (cartItems) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const addToCart = (product) => {
  try {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    saveCart(cart);
    console.log('✅ Item added to cart:', product.name, 'New cart:', cart);
    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return false;
  }
};

export const removeFromCart = (productId) => {
  try {
    const cart = getCart();
    const filtered = cart.filter(item => item.id !== productId);
    saveCart(filtered);
    return true;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return false;
  }
};

export const updateCartQuantity = (productId, quantity) => {
  try {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
        saveCart(cart);
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    return false;
  }
};

export const clearCart = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CART);
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
};

export const getCartCount = () => {
  try {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  } catch (error) {
    console.error('Error getting cart count:', error);
    return 0;
  }
};

export const getCartTotal = () => {
  try {
    const cart = getCart();
    return cart.reduce((sum, item) => {
      const price = typeof item.price === 'string' 
        ? parseFloat(item.price.replace('$', '')) 
        : item.price;
      return sum + (price * (item.quantity || 1));
    }, 0);
  } catch (error) {
    console.error('Error getting cart total:', error);
    return 0;
  }
};

// Favorites functions
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

export const addToFavorites = (product) => {
  try {
    const favorites = getFavorites();
    const exists = favorites.find(item => item.id === product.id);
    
    if (!exists) {
      favorites.push({ ...product, addedAt: new Date().toISOString() });
      saveFavorites(favorites);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
};

export const removeFromFavorites = (productId) => {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(item => item.id !== productId);
    saveFavorites(filtered);
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
};

export const isFavorite = (productId) => {
  try {
    const favorites = getFavorites();
    return favorites.some(item => item.id === productId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

export const clearFavorites = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return false;
  }
};

export const getFavoritesCount = () => {
  try {
    return getFavorites().length;
  } catch (error) {
    console.error('Error getting favorites count:', error);
    return 0;
  }
};

// Utility function
export const clearAllStorage = () => {
  try {
    clearCart();
    clearFavorites();
    return true;
  } catch (error) {
    console.error('Error clearing all storage:', error);
    return false;
  }
};
