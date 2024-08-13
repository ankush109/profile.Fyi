"use client";
import { StaticImageData } from "next/image";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import {
  ProductCardArrayProps,
  productData,
} from "../../../productsData/productData";
import toast from "react-hot-toast";
import { useUser } from "./UserContext";

interface CartItem {
  discount?: number;
  id: number;
  itemName: string;
  imgLink: StaticImageData;
  desc: string;
  price: number;
  quantity: number;
  productType: string;
}

interface ShoppingCartContextType {
  cartItems: CartItem[];
  removeAllSelectedItem: (product: CartItem) => void;
  productsList: ProductCardArrayProps[];
  addToCart: (product: ProductCardArrayProps) => void;

  syncLocalStorage: any;
  removeFromCart: (product: CartItem) => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
);

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [productsList, setProductList] =
    useState<ProductCardArrayProps[]>(productData);
  const { user } = useUser(); // -> I have maintained diff context for user which is a better practice

  // this function below is reponsible for synching the cart items state to local storage
  // i have used the ID (userID of loggedIn User) : [...cartitems] so your cart items will be stored in your chrome local storage
  // also can be fetched from backend or any other caching service like redis
  // I did this as was mentioned in the doc !

  const syncLocalStorage = (userId: string, arr?: any) => {
    console.log(arr, "hi i am from synclocalstorage");
    if (userId) {
      const mycartItems = JSON.stringify(arr);
      console.log(mycartItems, "a");
      localStorage.setItem(userId, mycartItems);
    }
  };
  // finds the capacity of any Item Id provided

  const findInventoryCapacity = (cartProductId: number) => {
    const inv = productsList.find((u) => u.id == cartProductId);
    return inv?.capacity;
  };

  // this below function  adds the product which the user has selected
  // a certain checks :
  // 1) do we have the quanity which the user has select it so I check the cart item quanity with my JSON'S capcaity which is the total capacity
  // 2) if the item is already in the cartItems array just increase its qunantity
  // 3) if not add with quantity one
  const addToCart = (product: ProductCardArrayProps) => {
    const itemCapacity = findInventoryCapacity(product.id);

    const finditem = cartItems.find((u) => u.id === product.id);
    console.log(finditem?.quantity == itemCapacity, "curr");
    let updatedCartItems = [];
    if (finditem) {
      if (finditem?.quantity >= itemCapacity!) {
        console.log("no more");
        toast.error("No more item left in Inventory");
        return;
      }
      updatedCartItems = cartItems.map((u) =>
        u.id === product.id ? { ...u, quantity: u.quantity + 1 } : u
      );
      setCartItems(updatedCartItems);

      toast.success("Item added to your Cart");
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  // now this is what fetches the previous cart items when a user logs in from its local storage

  useEffect(() => {
    if (user?.id!) {
      // sync the cart items data and map to its id in the localstorage
      const availableData = localStorage.getItem(user.id!);
      if (availableData) {
        const parsedData = JSON.parse(availableData);
        console.log(parsedData, "pars");
        setCartItems(parsedData);
      } else {
        console.log("No cart data found for user");
        setCartItems([]);
      }
    }
  }, [user]);
  // -> calls the syncLocalStorage fn() to update the local state to store the updated cart items
  useEffect(() => {
    console.log(user?.id, "cart");
    syncLocalStorage(user?.id!, cartItems);
  }, [cartItems]);
  const removeAllSelectedItem = (product: CartItem) => {
    const up = cartItems.filter((u) => u.id !== product.id);
    setCartItems(up);
  };
  // fn() to remove the selected item from user cart
  const removeFromCart = (product: CartItem) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        syncLocalStorage,
        setCartItems,
        addToCart,
        removeFromCart,
        removeAllSelectedItem,
        productsList,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
// i have used this everywhere to pull the current state
export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
}
