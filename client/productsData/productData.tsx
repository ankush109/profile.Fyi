import { StaticImageData } from "next/image";
import item1 from "@/app/assets/item1.webp";
import item2 from "@/app/assets/item2.webp";
import item3 from "@/app/assets/item3.webp";
import item4 from "@/app/assets/item3.webp";
import item5 from "@/app/assets/item5.webp";
import item6 from "@/app/assets/item6.webp";
import item7 from "@/app/assets/iphone.webp";
import item8 from "@/app/assets/keyboard.webp";
import item9 from "@/app/assets/mouse.webp";
import item10 from "@/app/assets/shoes.jpg";
import item11 from "@/app/assets/earphones.jpg";

export interface ProductCardArrayProps {
  id: number;
  itemName: string;
  price: number;
  capacity: number;
  imgLink: StaticImageData;
  desc: string;
  productType: string;
  discount?: number;
}

export const productData: ProductCardArrayProps[] = [
  {
    id: 1,
    capacity: 2,
    itemName: "Boult Earphones Pro 1",
    price: 3000,
    imgLink: item1,
    productType: "electronics",
    desc: "High-quality sound with deep bass.",
    discount: 10,
  },
  {
    id: 2,
    itemName: "Boult Wireless Headphones",
    price: 4500,
    capacity: 2,
    imgLink: item2,
    productType: "electronics",
    desc: "Experience true wireless freedom.",
    discount: 20,
  },
  {
    id: 3,
    itemName: "Boult Wired Earbuds",
    price: 2000,
    capacity: 2,
    productType: "electronics",
    imgLink: item3,
    desc: "Comfortable fit with crystal-clear sound.",
    discount: 10,
  },
  {
    id: 4,
    itemName: "iphone 12 pro Max",
    price: 106000,
    productType: "electronics",
    capacity: 2,
    imgLink: item7,
    desc: "Designed for an immersive gaming experience.",
    discount: 20,
  },
  {
    id: 5,
    itemName: "Mechancial Keyboard",
    price: 10000,
    productType: "electronics",
    capacity: 2,
    imgLink: item8,
    desc: "Designed for an immersive gaming experience.",
    discount: 15,
  },
  {
    id: 6,
    itemName: "Mouse",
    price: 10000,
    productType: "electronics",
    capacity: 2,
    imgLink: item9,
    desc: "Designed for an immersive gaming experience.",
    discount: 10,
  },
  {
    id: 7,
    itemName: "iphone 12 pro Max",
    price: 106000,
    productType: "electronics",
    capacity: 2,
    imgLink: item7,
    desc: "Designed for an immersive gaming experience.",
    discount: 20,
  },
  {
    id: 8,
    itemName: "Mechancial Keyboard",
    price: 10000,
    productType: "electronics",
    capacity: 2,
    imgLink: item8,
    desc: "Designed for an immersive gaming experience.",
    discount: 15,
  },
  {
    id: 9,
    itemName: "Mouse",
    price: 10000,
    productType: "electronics",
    capacity: 2,
    imgLink: item9,
    desc: "Designed for an immersive gaming experience.",
    discount: 10,
  },
  {
    id: 10,
    itemName: "Mouse",
    price: 10000,
    productType: "electronics",
    capacity: 2,
    imgLink: item9,
    desc: "Designed for an immersive gaming experience.",
    discount: 10,
  },
  {
    id: 11,
    itemName: "keyboard 1111",
    price: 10000,
    productType: "electronics",
    capacity: 2,
    imgLink: item8,
    desc: "Designed for an immersive gaming experience.",
    discount: 15,
  },
  {
    id: 12,
    itemName: "watch 111",
    price: 10000,
    productType: "electronics",
    capacity: 2,
    imgLink: item6,
    desc: "Designed for an immersive gaming experience.",
    discount: 10,
  },
  {
    id: 13,
    itemName: "shoes",
    price: 10000,
    productType: "wearables",
    capacity: 2,
    imgLink: item10,
    desc: "Designed for an immersive gaming experience.",
    discount: 20,
  },
  {
    id: 14,
    itemName: "boat 1",
    price: 10000,
    productType: "electronics",
    capacity: 2,
    imgLink: item11,
    desc: "Designed for an immersive gaming experience.",
    discount: 15,
  },
  {
    id: 15,
    itemName: "keyboard 1111",
    price: 10000,
    productType: "electronics",
    capacity: 2,
    imgLink: item8,
    desc: "Designed for an immersive gaming experience.",
    discount: 15,
  },
  {
    id: 16,
    itemName: "watch 111",
    price: 10000,
    productType: "electronics",
    capacity: 2,
    imgLink: item6,
    desc: "Designed for an immersive gaming experience.",
    discount: 10,
  },
  {
    id: 17,
    itemName: "shoes",
    price: 10000,
    productType: "wearables",
    capacity: 2,
    imgLink: item10,
    desc: "Designed for an immersive gaming experience.",
    discount: 20,
  },
  {
    id: 18,
    itemName: "boat 1",
    price: 10000,
    productType: "electronics",
    capacity: 2,
    imgLink: item11,
    desc: "Designed for an immersive gaming experience.",
    discount: 15,
  },
];
