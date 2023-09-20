import { createSlice } from "@reduxjs/toolkit";

// Obtener el estado inicial del carrito desde el local storage o un array vacío
const initialCartState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({
          ...product,
          quantity: 1,
          nombre: product.nombre,
          imagen: product.imagen,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      return state.filter((item) => item.id !== productId);
    },
    adjustQuantity: (state, action) => {
      const { id, change } = action.payload;
      const product = state.find((item) => item.id === id);

      if (product) {
        const newQuantity = product.quantity + change;

        if (newQuantity === 0) {
          return state.filter((item) => item.id !== id);
        }

        if (newQuantity < 0) {
          return state; // No realizar cambios en el estado
        }

        product.quantity = newQuantity;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: () => {
      localStorage.removeItem("cart");
      return [];
    },
    closeCart: (state) => {
      state.isOpen = false; // Cierra el carrito
    },
  },
});

export const { addToCart, removeFromCart, adjustQuantity, clearCart, closeCart } =
  cartSlice.actions;

// Agrega la función getTotalItemsInCart aquí
export const getTotalItemsInCart = (cart) => {
  return cart.reduce((total, product) => total + product.quantity, 0);
};

// Agrega la función getTotalPrice aquí
export const getTotalPrice = (cart) => {
  return cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
};

export default cartSlice.reducer;
