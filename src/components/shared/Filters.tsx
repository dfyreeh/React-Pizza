import { RangeSlider, Title, CheckboxFiltersGroup } from "@/components/shared";
import React from "react";
import { Input } from "../ui";
import { fetchProducts } from "../../../services/axios";
import { useSet } from "react-use";
import qs from "qs";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const location = useLocation();
  const router = useNavigate();

  // Парсим параметри з URL
  const searchParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);

  // Стан списку всіх інгредієнтів
  const [ingredients, setIngredients] = React.useState<{ text: string; value: string }[]>([]);

  // Вибрані інгредієнти (ініціалізуємо з URL)
  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(
    new Set<string>(
      searchParams.get("ingredients") ? searchParams.get("ingredients")!.split(",") : []
    )
  );

  // Вибрані розміри (ініціалізуємо з URL)
  const [sizes, { toggle: toggleSize }] = useSet(
    new Set<string>(
      searchParams.get("sizes") ? searchParams.get("sizes")!.split(",") : []
    )
  );

  // Вибрані типи тіста (ініціалізуємо з URL)
  const [pizzaTypes, { toggle: togglePizzaType }] = useSet(
    new Set<string>(
      searchParams.get("pizzaTypes") ? searchParams.get("pizzaTypes")!.split(",") : []
    )
  );

  // Стан цінового фільтру (ініціалізуємо з URL)
  const [price, setPrice] = React.useState<PriceProps>({
    priceFrom: searchParams.get("priceFrom") ? Number(searchParams.get("priceFrom")) : undefined,
    priceTo: searchParams.get("priceTo") ? Number(searchParams.get("priceTo")) : undefined,
  });

  // Функція для оновлення цін
  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({ ...price, [name]: value });
  };

  // Синхронізація вибраних фільтрів з URL
  React.useEffect(() => {
    const filters = {
      ...price,
      sizes: Array.from(sizes),
      pizzaTypes: Array.from(pizzaTypes),
      ingredients: Array.from(selectedIngredients),
    };
    const queryString = qs.stringify(filters, { arrayFormat: "comma" });
    router(`?${queryString}`, { replace: true }); // replace:true щоб не захаращувати історію
  }, [price, sizes, pizzaTypes, selectedIngredients, router]);

  // Завантажуємо список інгредієнтів з бекенду
  React.useEffect(() => {
    const loadIngredients = async () => {
      const data: any[] = await fetchProducts();
      const allIngredients: string[] = data.flatMap((pizza) => pizza.ingredients || []);
      const uniqueIngredients: string[] = Array.from(new Set(allIngredients));
      const ingredientsWithValues = uniqueIngredients.map((item, index) => ({
        text: item,
        value: (index + 1).toString(),
      }));
      setIngredients(ingredientsWithValues);
    };
    loadIngredients();
  }, []);

  return (
    <div className={className}>
      <Title text="Фільтрація" size="sm" className="mb-5 font-bold" />

      {/* Вибір типу тіста */}
      <div className="flex flex-col gap-4">
        <CheckboxFiltersGroup
          title="Тип тіста"
          name="Тип тіста"
          className="mb-5"
          onClickCheckbox={togglePizzaType}
          selected={pizzaTypes}
          items={[
            { text: "Тонке", value: "1" },
            { text: "Традиційне", value: "2" },
          ]}
        />

        {/* Вибір розмірів */}
        <CheckboxFiltersGroup
          title="Розмір"
          name="size"
          className="mb-5"
          onClickCheckbox={toggleSize}
          selected={sizes}
          items={[
            { text: "20 см", value: "20" },
            { text: "30 см", value: "30" },
            { text: "40 см", value: "40" },
          ]}
        />
      </div>

      {/* Фільтр ціни */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Ціна від і до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(price.priceFrom || "")}
            onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={0}
            max={1000}
            value={String(price.priceTo || "")}
            onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[price.priceFrom || 0, price.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
        />
      </div>

      {/* Вибір інгредієнтів */}
      <CheckboxFiltersGroup
        title="Інгредієнти"
        name="ingredients"
        className="mt-5"
        limit={5}
        defultItem={ingredients.slice(0, 5)}
        items={ingredients}
        loading={ingredients.length === 0}
        onClickCheckbox={toggleIngredient}
        selected={selectedIngredients}
      />
    </div>
  );
};
