// оформлення замовлення
import React from "react";
import { CartItem } from "@/components/shared/CartItem";
import { Container, Header, Title } from "../src/components/shared/index";
import { Input, Button } from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";
import { Package, Trash2, Truck } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import {
  addItem,
  removeItem,
  decreaseItem,
  clearCart,
} from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  prices: { label: string; value: string | number }[];
}

export const OrderProcessing: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleIncrease = (id: number, size?: number) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (item) {
      dispatch(addItem({ ...item, quantity: 1 }));
    }
  };

  const handleDecrease = (id: number, size?: number) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (!item) return;

    if (item.quantity > 1) {
      dispatch(decreaseItem({ id: item.id, size: item.size }));
    } else {
      dispatch(removeItem({ id: item.id, size: item.size }));
    }
  };

  const handleRemove = (id: number, size?: number) => {
    dispatch(removeItem({ id, size }));
  };

  const delivery = 120;

  return (
    <div className="bg-[#F4F1EE]">
      <Header className="bg-[#F4F1EE]" />
      <Container className="pb-6">
        <Title
          text="Оформлення замовлення"
          className="font-black mt-5"
          size="lg"
        />
        <div className=" min-h-screen mt-5 flex justify-between gap-6 items-start">
          <div className="flex-1 space-y-8">
            {/* Кошик */}
            <section>
              <div className=" rounded-3xl bg-white shadow-sm p-6 w-2xl">
                <div className="flex items-center justify-between">
                  <Title
                    text="1. Кошик"
                    className="font-bold   my-2"
                    size="sm"
                  />
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(clearCart());
                      navigate("/");
                    }}
                    className="flex items-center gap-1 text-gray-500 cursor-pointer group hover:text-primary"
                  >
                    <Trash2
                      className="text-gray-500 group-hover:text-primary"
                      size={16}
                    />
                    Очистити кошик
                  </Link>
                </div>

                <div
                  className="
                  cart-scroll 
                  flex flex-col gap-2
                  max-h-[62vh] pb-2 overflow-y-auto 
                  pr-2  
                "
                >
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      imageUrl={item.imageUrl}
                      name={item.name}
                      price={item.price}
                      count={item.quantity}
                      onIncrement={() => handleIncrease(item.id, item.size)}
                      onDecrement={() => handleDecrease(item.id, item.size)}
                      onDelete={() => handleRemove(item.id, item.size)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 2. Персональна інфа */}
            <section>
              <div className="rounded-3xl  bg-white  shadow-sm p-6 w-2xl">
                <Title
                  text="2. Персональна інформація"
                  className="font-bold pb-5 border-b"
                  size="sm"
                />
                <div className="grid grid-cols-2 gap-4 mt-10">
                  <Input className="w-full " placeholder="Ім'я" />
                  <Input className="w-full " placeholder="Прізвище" />
                  <Input className="w-full" placeholder="Email" />
                  <Input className="w-full " placeholder="Телефон" />
                </div>
              </div>
            </section>

            {/* 3. Адреса доставки */}
            <section>
              <div className="rounded-3xl  bg-white shadow-sm p-6 w-2xl ">
                <Title
                  text="3. Адрес доставки"
                  className="font-bold pb-5 border-b"
                  size="sm"
                />
                <Input className="w-full mt-10" placeholder="Введи адресу" />
                <div className="h-16">
                  <Textarea
                    className="h-full rounded-xl mt-5 border p-2 w-full resize-none  align-top"
                    placeholder="Коментар до замовлення..."
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Підсумок й оплата*/}
          <div className="w-[380px] p-6 shadow-sm rounded-3xl  space-y-4 bg-white h-fit sticky top-3">
            <div>
              <p>Підсумок:</p>
              <Title
                className="font-extrabold border-b pb-4 "
                size="lg"
                text={`${totalPrice} ₴`}
              />
            </div>

            <div className="text-sm flex flex-col gap-1 text-gray-600 space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <Package className="text-gray-500" size={15} />
                  <span>Вартість товарів:</span>
                </div>

                <div className="flex-1 border-b border-dashed border-b-neutral-300 relative -top-1 mx-2" />

                <span className="font-bold text-black">{totalPrice} ₴</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <Truck className="text-gray-500" size={15} />
                  <span>Доставка:</span>
                </div>

                <div className="flex-1 border-b border-dashed border-b-neutral-300 relative -top-1 mx-2" />
                <span className="font-bold text-black">{delivery} ₴</span>
              </div>
            </div>
            <Input
              className="rounded-xl mt-1.5 border  w-full resize-none"
              placeholder="Введи промокод"
            />
            <Button className="flex items-center h-[50px] font-bold justify-center w-full">
              Замовити
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
