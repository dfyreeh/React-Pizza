import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../../services/axios";
import { ReactTyped } from "react-typed";

interface Props {
  className?: string;
}

interface Product {
  id: string;
  name: string;
  img: string;
  category: string;
}
export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();

      const allItems: Product[] = [
        ...(data[0].pizzas || []).map((item: Product) => ({
          ...item,
          category: "pizza",
        })),
        ...(data[0].snacks || []).map((item: Product) => ({
          ...item,
          category: "snacks",
        })),
        ...(data[0].desserts || []).map((item: Product) => ({
          ...item,
          category: "desserts",
        })),
        ...(data[0].sauces || []).map((item: Product) => ({
          ...item,
          category: "sauces",
        })),
        ...(data[0].coffees || []).map((item: Product) => ({
          ...item,
          category: "coffees",
        })),
        ...(data[0].drinks || []).map((item: Product) => ({
          ...item,
          category: "drinks",
        })),
        ...(data[0].coffee || []).map((item: Product) => ({
          ...item,
          category: "coffee",
        })),
      ];

      setProducts(allItems);
    };

    loadProducts();
  }, []);

  // Фільтруємо товари з пошуку
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
  };

  return (
    <>
      {focused && (
        <div
          onClick={() => setFocused(false)}
          className="fixed inset-0 bg-black/50 z-30"
        />
      )}

      <div
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-31",
          className
        )}
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <ReactTyped
          className="block w-full h-full"
          strings={[
            "Пеппероні",
            "Креветки",
            "Карамельний чізкейк",
            "Соус сирний",
            "Мінеральна вода негазована",
            "Coca-Cola",
            "Кокосовий латте",
          ]}
          typeSpeed={250}
          backSpeed={100}
          attr="placeholder"
          loop
        >
          <input
            className="rounded-2xl outline-none w-full h-full bg-gray-200 pl-11"
            type="text"
            onFocus={() => setFocused(true)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </ReactTyped>

        <div
          className={cn(
            "absolute left-0 right-0 bg-white rounded-xl py-2 shadow-md transition-all duration-200 z-40 max-h-100 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            focused
              ? "visible opacity-100 top-12"
              : "invisible opacity-0 top-14"
          )}
        >
          {filteredProducts.length > 0
            ? filteredProducts.map((product) => (
                <Link
                  onClick={onClickItem}
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10"
                >
                  <img
                    className="rounded-sm"
                    src={product.img}
                    alt={product.name}
                    width={32}
                    height={32}
                  />
                  <span>{product.name}</span>
                </Link>
              ))
            : "Немає результатів"}
        </div>
      </div>
    </>
  );
};
