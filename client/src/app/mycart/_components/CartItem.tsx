"use client";
import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import { useShoppingCart } from "@/app/middlewares/ContextProvider";
import { Minus, Plus, Trash } from "lucide-react";
import toast from "react-hot-toast";

interface ProductCardProps {
  quantity: number;
  data: any;
  id: number;
  itemName: string;
  price: number;
  imgLink: StaticImageData;
  desc: string;
  AddCartItem: any;
}

const CartItem: FC<ProductCardProps> = ({
  data,
  quantity,
  id,
  itemName,
  price,
  imgLink,
  desc,
  AddCartItem,
}) => {
  const { addToCart, removeFromCart, removeAllSelectedItem } =
    useShoppingCart(); // functions being pulled from the shopping cart context for adding removing items
  const increment = () => {
    addToCart(data);
  };
  const decrement = () => {
    removeFromCart(data);
  };
  const completlyRemove = () => {
    removeAllSelectedItem(data);
    toast.success("Item removed Completely");
  };
  return (
    <div className="flex flex-col lg:flex-row gap-5 bg-white p-5 w-full max-w-5xl mx-auto">
      <div className="">
        <Image
          className="w-full lg:w-[170px] h-auto"
          src={imgLink}
          alt={itemName}
        />
      </div>
      <div className="flex lg:flex-row flex-col justify-between w-full ">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold">{itemName}</div>
          <div className="text-sm text-gray-600">{desc}</div>
          <div className="text-sm text-gray-500">Seller: Dukan</div>
          <div className="mt-4 flex flex-col lg:flex-row gap-4 lg:items-center">
            <div className="flex gap-2 items-center">
              <span className="line-through text-gray-500"> ₹{price}</span>
              <span className="text-xl font-semibold text-black">
                {" "}
                ₹{(price * (1 - data.discount / 100)).toFixed(2)}{" "}
              </span>
            </div>
            <span className="text-sm text-green-600">
              {data.discount} % Off
            </span>
            <span className="text-sm text-green-600 font-semibold">
              2 offers applied
            </span>
          </div>

          <div className="mt-4 flex gap-5 items-center border border-gray-200 w-[130px] justify-center rounded-2xl">
            <span className="cursor-pointer" onClick={decrement}>
              <Minus />
            </span>
            <div className="text-lg">{quantity}</div>
            <span className="cursor-pointer" onClick={increment}>
              <Plus />
            </span>
          </div>
          <div className=""></div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="mt-4 text-sm text-gray-600">
            Delivery by 11pm (Tomorrow)
          </div>
          <div
            className="flex gap-2 mt-2 hover:bg-red-600 cursor-pointer bg-red-500 text-white p-2 max-w-[160px] items-center justify-center"
            onClick={completlyRemove}
          >
            Remove Item <Trash />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
