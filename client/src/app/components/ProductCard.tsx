"use client";
import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { useShoppingCart } from "../middlewares/ContextProvider";

interface ProductCardProps {
  data: any;
  itemName: string;
  price: number;
  imgLink: StaticImageData;
  desc: string;
}

const ProductCard: FC<ProductCardProps> = ({
  itemName,
  price,
  imgLink,
  data,
  desc,
}) => {
  const { setCartItems, addToCart } = useShoppingCart();
  const add = () => {
    addToCart(data);
  };
  const remove = () => {
    addToCart(data);
  };

  return (
    <div className="m-2 p-3 lg:max-w-[450px]  overflow-hidden ">
      <div className="lg:max-h-[340px] lg:w-[300px] lg:h-[300px] w-[300px] overflow-hidden">
        <Image
          src={imgLink}
          alt={itemName}
          className="w-full "
          width={300}
          height={200}
        />
      </div>
      <motion.div className="h-[115px]">
        <motion.div
          className="max-h-[150px] bg-white p-2 "
          whileHover={{ y: -50 }}
        >
          <div className="flex justify-between">
            <div className="text-sm text-gray-400">Sponsored</div>
            <div className="text-sm text-green-500 font-semibold ">
              {data.discount}% Off
            </div>
          </div>
          <div className="text-lg font-semibold">{itemName}</div>
          <div className="text-gray-600">{desc.slice(0, 30)}...</div>
          <div className="text-xl font-bold">
            {" "}
            <span className="line-through text-sm text-gray-500">
              {" "}
              ₹{price.toFixed(2)}
            </span>{" "}
            ₹{(price * (1 - data.discount / 100)).toFixed(2)}
          </div>
          <div className="cursor-pointer" onClick={add}>
            Add to cart
          </div>{" "}
          <div className="text-gray-600">{desc}</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductCard;
