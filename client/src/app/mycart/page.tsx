"use client";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CartItem from "./_components/CartItem";
import { useShoppingCart } from "../middlewares/ContextProvider";
import { StaticImageData } from "next/image";
import Lottie from "react-lottie-player";
import animationdata from "@/app/assets/empty_cart.json";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useUser } from "../middlewares/UserContext";
import toast from "react-hot-toast";

interface CartItemType {
  id: number;
  itemName: string;
  price: number;
  desc: string;
  imgLink: StaticImageData;
  quantity?: number;
}

interface ItemCountMap {
  [id: string]: number;
}

function Page() {
  const { cartItems, setCartItems } = useShoppingCart();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [currentCartItems, setCurrentCartItems] = useState<CartItemType[]>([]);
  const [totalprice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  // helper function to calc the ammounts of user cart items
  const findTotalDiscount = useCallback(() => {
    // useCallback caches the fn() btw re-renders
    const totalDiscount = cartItems.reduce((acc, item) => {
      const itemDiscount = item.price * (1 - item.discount! / 100);
      const itemDiscountFixed = item.price;

      return acc + (itemDiscountFixed - itemDiscount) * item.quantity;
    }, 0);

    setTotalDiscount(totalDiscount);
  }, [cartItems]);

  const findTotalPrice = useCallback(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity!,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);
  useEffect(() => {
    const filteredItems = cartItems?.filter((u) => u.quantity! > 0);
    setCurrentCartItems(filteredItems);
    findTotalPrice();
    findTotalDiscount();
    setLoading(false);
    console.log(cartItems, "from mycarts page"); // so when the cart page renders it pulls the data from the context and sets it here
  }, [cartItems]);

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoaderCircle className="animate-spin w-16 h-16" />
        </div>
      ) : (
        <div className="p-4">
          <div className="grid md:grid-cols-4 grid-cols-1 max-w-7xl  justify-between gap-10 mx-auto">
            <div className="flex flex-col  col-span-3 gap-5 items-center">
              {currentCartItems?.length > 0 ? (
                <>
                  <div className="flexflex-col w-full items-center">
                    {currentCartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        quantity={item.quantity!}
                        AddCartItem={setCartItems}
                        id={item.id}
                        itemName={item.itemName}
                        price={item.price}
                        desc={item.desc}
                        imgLink={item.imgLink}
                        data={item}
                      />
                    ))}
                  </div>
                  <div className="bg-white w-full  p-5 flex items-end justify-end">
                    <div
                      onClick={() =>
                        toast.success("Looks like you found your intern")
                      }
                      className="bg-orange-400 w-[140px] cursor-pointer  text-white flex items-center  justify-center p-2"
                    >
                      Place Order
                    </div>
                  </div>
                </>
              ) : user ? (
                <div className="w-full flex flex-col items-center">
                  <Lottie
                    loop
                    animationData={animationdata}
                    play
                    style={{ width: 350, height: 350 }}
                  />
                  <div className="text-3xl font-bold">Your Cart is empty</div>
                  <Link
                    href="/"
                    className="bg-blue-500 p-2 text-white rounded-lg mt-5"
                  >
                    Go to Home{" "}
                  </Link>
                </div>
              ) : (
                "Please Login to add to Cart"
              )}
            </div>

            {currentCartItems.length > 0 && (
              <div className="bg-white p-4 mx-auto min-w-[90%] max-h-[300px] md:mx-0">
                <div className="text-lg font-semibold mb-4">PRICE DETAILS</div>
                <hr className="my-2" />
                <div className="flex justify-between gap-4">
                  <div>
                    <div className="mb-2">Price ({cartItems.length} items)</div>
                    <div className="mb-2">Discount</div>
                    <div className="mb-2">Delivery Charges</div>
                    <div className="mb-2">Secured Packaging Fee</div>
                  </div>
                  <div>
                    <div className="mb-2">₹ {totalprice}</div>
                    <div className="text-green-500 mb-2">-₹{totalDiscount}</div>
                    <div className="flex items-center mb-2">
                      <div className="line-through mr-2">₹120</div>
                      <span className="text-green-500">Free</span>
                    </div>
                    <div className="mb-4">₹120</div>
                  </div>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-semibold mt-4">
                  <div>Total Amount</div>
                  <div>₹ {totalprice - totalDiscount + 120}</div>
                </div>{" "}
                <div className="text-sm text-gray-600">
                  (With Packaging Fee)
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
