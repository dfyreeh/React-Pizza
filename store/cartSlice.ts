import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Тип одного товару у кошику
interface CartItem {
  id: number;
  size?: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Тип стану кошика
interface CartState {
  items: CartItem[];
}

// Функція для завантаження кошика з localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Функція для збереження кошика в localStorage
const saveCartToLocalStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch {}
};

// Початковий стан кошика
const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

// Створення slice для кошика
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const { id, size } = action.payload;
      const existing = state.items.find((i) => i.id === id && i.size === size);

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      saveCartToLocalStorage(state.items);
    },

    // Зменшення кількості товару
    decreaseItem: (
      state,
      action: PayloadAction<{ id: number; size?: number }>
    ) => {
      const { id, size } = action.payload;
      const item = state.items.find((i) => i.id === id && i.size === size);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (i) => !(i.id === id && i.size === size)
        );
      }
      saveCartToLocalStorage(state.items);
    },

    // Повне видалення товару з кошика
    removeItem: (
      state,
      action: PayloadAction<{ id: number; size?: number }>
    ) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        (i) => !(i.id === id && i.size === size)
      );
      saveCartToLocalStorage(state.items);
    },

    // Очищення всього кошика
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addItem, decreaseItem, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
