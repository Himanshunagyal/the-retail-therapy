const CART_KEY = 'minimal-store-cart';

export const getCart = () => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item._id === product._id);
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  
  saveCart(cart);
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item._id !== productId);
  saveCart(updatedCart);
  return updatedCart;
};

export const updateCartItemQuantity = (productId, quantity) => {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item._id === productId);
  
  if (itemIndex > -1) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    cart[itemIndex].quantity = quantity;
    saveCart(cart);
  }
  
  return cart;
};

export const clearCart = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_KEY);
};

export const getCartTotal = (cart) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartCount = (cart) => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};