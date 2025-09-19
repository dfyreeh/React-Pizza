// оформлення замовлення
import React, { useState } from "react";
import { CartItem } from "@/components/shared/CartItem";
import { Container, Header, Title } from "../src/components/shared/index";
import { Input, Button } from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";

interface CartItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  prices: { label: string; value: string | number }[];
}

export const OrderProcessing: React.FC = () => {
  const [cart, setCart] = useState([
    { id: 1, imageUrl: '', name: 'Чизбургер-пицца', price: 965, count: 2 },
    { id: 2, imageUrl: '', name: 'Диабло', price: 1280, count: 1 },
  ]);

  const handleChange = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, count: Math.max(1, item.count + delta) }
          : item
      )
    )
  }
  const handleDelete = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }
  const allPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const delivery = 120;
  const totalPayment = cart.reduce((sum, item) => allPrice + delivery, 0);

 return ( 
 
  <div className="bg-[#F4F1EE]">
    <Header className="bg-[#F4F1EE]"/>
    <Container>
      <div className=" min-h-screen mt-10 flex justify-between gap-6 items-start">
        <div className="flex-1 space-y-8">
          <Title text="Оформлення заказу" className="font-black" size="lg"/>

          {/* Кошик */}
          <section>
            <div className="rounded-2xl bg-white shadow-sm p-6 w-2xl">
              <Title text="1. Корзина" className="font-bold pb-5  border-b my-2" size="sm" />

              {cart.map(item => (
                <CartItem
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  count={item.count}
                  onIncrement={() => handleChange(item.id, 1)}
                  onDecrement={() => handleChange(item.id, -1)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>
          </section>

          {/* 2. Персональна інфа */}
          <section>
            <div className="rounded-2xl  bg-white  shadow-sm p-6 w-2xl">
              <Title text="2. Персональна інформація" className="font-bold pb-5 border-b" size="sm" />
              <div className="grid grid-cols-2 gap-4 mt-10">
                <Input className="w-full " placeholder="Ім'я"/>
                <Input className="w-full " placeholder="Прізвище"/>
                <Input className="w-full" placeholder="Email"/>
                <Input className="w-full " placeholder="Телефон"/>
              </div>
            </div>
          </section>

          {/* 3. Адреса доставки */}
          <section>
            <div className="rounded-2xl  bg-white shadow-sm p-6 w-2xl ">
              <Title text="3. Адреса доставки" className="font-bold pb-5 border-b" size="sm" />
              <Input className="w-full mt-10" placeholder="Введи адресу"/>
              <div className="h-16">
                <Textarea  className="h-full rounded-xl mt-5 border p-2 w-full resize-none  align-top" placeholder="Коментар до заказу..."/>
              </div>
              
            </div>
          </section>
        </div>

       {/* Підсумок й оплата*/}
        <div className="w-[360px] p-6 shadow-sm rounded-2xl space-y-4 bg-white h-fit sticky top-20">
          <Title text="Оплата" className="font-bold pb-5 border-b" size="sm" />
           <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Стоимость товаров</span>
              {/* <span className="border-1 border-dashed border-gray-500  "></span> */}

              <span>{allPrice} грн</span>
            </div>
            <div className="flex justify-between">
              <span>Доставка</span>
              <span>{delivery} грн</span>
            </div>
            <div className="flex justify-between mt-5">
              <Title text="Загальна сума" className="font-bold" size="xs" />
              <span>{totalPayment} грн</span>
            </div>
           </div>
           <Input className="rounded-xl -mt-1.5 border  w-full resize-none" placeholder="Введи промокод" />
           <Button className="flex items-center justify-center w-full">Усього {totalPayment} грн</Button>
        </div>
      </div>
    </Container>
  </div>
  )
}




