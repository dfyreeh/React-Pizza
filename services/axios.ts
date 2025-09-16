import axios from "axios";

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(
      `https://681b789317018fe5057bb776.mockapi.io/Pizza`
    );
    return data;
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    return [];
  }
};

// Функція для отримання товарів
export const fetchGoods = async () => {
  try {
    const { data } = await axios.get(
      "https://681b789317018fe5057bb776.mockapi.io/Snacks"
    );
    return data;
  } catch (error) {
    console.error("Помилка при завантаженні товарів:", error);
    return [];
  }
};
