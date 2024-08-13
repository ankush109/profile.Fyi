"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../middlewares/ContextProvider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CircleUser,
  CircleUserRound,
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "../middlewares/UserContext";

function Navbar({ inputFilter }: { inputFilter?: any }) {
  const { cartItems } = useShoppingCart();
  const { user } = useUser();
  const router = useRouter();
  const [serarchQuery, setSearchQuery] = useState("");

  const typing = (val: string) => {
    setSearchQuery(val);
    inputFilter(val);
  };
  return (
    <div className=" bg-blue-500  h-16 flex gap-20  items-center p-1 lg:justify-center ">
      <Link href="/" className="hidden md:block text-white text-2xl ">
        <Image
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
          alt=""
          width={100}
          height={100}
        />
      </Link>{" "}
      <div className="relative  lg:w-[650px]">
        <input
          placeholder="search by product name"
          value={serarchQuery}
          onChange={(e) => typing(e.target.value)}
          className="rounded-xl w-full  h-10 p-2 pl-10"
        />
        <Search className="absolute top-2 right-2 w-6 h-6" />
      </div>
      <div className="hidden md:flex gap-10">
        {user ? (
          <div className="text-white flex gap-2">
            Hello, {user?.name} <CircleUserRound />
          </div>
        ) : (
          <Link href="/login" className="text-white text-lg">
            Login
          </Link>
        )}

        <Link href="/mycart" className="text-white  text-lg lg:flex gap-2">
          <ShoppingCart /> Cart ({cartItems.length})
        </Link>
      </div>{" "}
      <div className="hidden lg:block">
        {user ? (
          <div
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="text-white text-lg cursor-pointer"
          >
            Logout
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="md:hidden flex gap-2">
        <MobileNav router={router} user={user} />
      </div>
    </div>
  );
}
export default Navbar;

const MobileNav = ({ user, router }: { user: any; router: any }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {" "}
            <div>Welcome {user?.name}</div>
          </SheetTitle>
          <SheetDescription>
            YES Sir, I am I can work in a high paced startup and deliver all my
            responsibilities
          </SheetDescription>
        </SheetHeader>
        <>
          <div className="p-2 mt-5 rounded-2xl ">
            {user ? (
              <>
                <div
                  onClick={() => {
                    localStorage.removeItem("token");
                    router.push("/login");
                  }}
                  className="text-black text-lg cursor-pointer"
                >
                  Logout
                </div>
                <Link
                  href="/mycart"
                  className="text-black text-lg flex items-center gap-2"
                >
                  My cart <ShoppingCart />
                </Link>
                <Link
                  href="/"
                  className="text-black text-lg flex items-center gap-2"
                >
                  home
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <div
                  onClick={() => {
                    router.push("/login");
                  }}
                  className="text-black text-lg cursor-pointer"
                >
                  Login
                </div>
              </div>
            )}
          </div>
        </>
      </SheetContent>
    </Sheet>
  );
};
