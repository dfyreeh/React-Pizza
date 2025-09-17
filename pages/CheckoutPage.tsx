// оформлення замовлення
import React, { useState } from "react";
import { CartItem } from "@/components/shared/CartItem";
import { Header, Title } from "../src/components/shared/index";




export const OrderProcessing: React.FC = () => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Чизбургер-пицца', price: 965, count: 2 },
    { id: 2, name: 'Диабло', price: 1280, count: 1 },
  ]);

  const handleChange = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, count: Math.max(1, item.count + delta) }
          : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const tax = 240;
  const delivery = 120;

  return (
   
    
    <div className=" bg-primary/15 min-h-screen bg- text-black p-8 flex justify-between gap-6">
      <div className="flex-1 space-y-8">
        <Title text="Оформлення заказу" size="md"></Title>

        {/* Корзина */}
        <section>
          <div className=" bg- rounded-2xl p-5 w-3xl  ml-<120>">
            <Title text="1. Корзина" size="sm" ></Title>
            {cart.map(item => (
              <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                count={item.count}
                onIncrement={() => handleChange(item.id, 1)}
                onDecrement={() => handleChange(item.id, -1)}
              />
            ))}
          </div>
        </section>

        {/* 2. Персональна інфа */}
        <section>
          <h2 className="font-semibold mb-3">2. Персональная информация</h2>
          <div className="grid grid-cols-2 gap-4">
            <input className="border p-2 rounded" placeholder="Ваше имя" />
            <input className="border p-2 rounded" placeholder="Email" />
            <input className="border p-2 rounded" placeholder="Телефон" />
          </div>
        </section>

        {/* 3. Адреса доставки */}
        <section>
          <h2 className="font-semibold mb-3">3. Адрес доставки</h2>
          <input className="border p-2 rounded w-full mb-2" placeholder="Введите адрес" />
          <textarea className="border p-2 rounded w-full" placeholder="Комментарий к заказу" />
          <p className="text-sm mt-2 text-gray-500">⏰ Доставка в 11:00</p>
        </section>
      </div>

      {/* Підсумок */}
      {/* <CartSummary total={total} tax={tax} delivery={delivery} /> */}
    </div>
  );
};




