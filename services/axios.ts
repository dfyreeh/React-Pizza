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
