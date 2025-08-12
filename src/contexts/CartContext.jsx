import { createContext, useContext, useEffect, useState } from "react";



const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  // localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = [...prevCart];
      const index = existing.findIndex(
        (item) => item.productId === product._id
      );

      if (index !== -1) {
        existing[index].quantity += 1;
      } else {
        existing.push({
          productId: product._id,
          productName: product.productName,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        });
      }

      
      return existing;
    });
    
  };

  // remove from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId)
    );
  };

  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
