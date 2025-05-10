import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on first render
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const generateItemKey = (item) => `${item.category}-${item.id}`;

  const addToCart = (item) => {
    const key = generateItemKey(item);
    const exists = cartItems.find((cartItem) => generateItemKey(cartItem) === key);
    if (exists) {
      setCartItems((prev) =>
        prev.map((cartItem) =>
          generateItemKey(cartItem) === key
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const key = generateItemKey(item);
    setCartItems((prev) => prev.filter((cartItem) => generateItemKey(cartItem) !== key));
  };

  const updateQuantity = (item, quantity) => {
    const key = generateItemKey(item);
    setCartItems((prev) =>
      prev.map((cartItem) =>
        generateItemKey(cartItem) === key ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + price * item.quantity;
    }, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
