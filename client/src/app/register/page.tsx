import React from "react";
import Navbar from "../components/Navbar";
import { RegisterForm } from "./RegisterForm";
import Image from "next/image";

function Page() {
  return (
    <div>
      <Navbar />
      <div className=" h-screen ">
        <div className="grid grid-cols-6 h-[70%] bg-white max-w-7xl mx-auto mt-20 ">
          <div className="bg-blue-500 hidden col-span-2 p-5 lg:flex flex-col justify-between">
            <div>
              <div className="text-white text-2xl font-bold mt-5">Register</div>
              <div className="text-gray-300 text-lg font-bold mt-5">
                Get access to your Orders,
              </div>
              <div className="text-gray-300 text-lg font-bold ">
                Wishlist and Recommendations
              </div>
            </div>
            <Image
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
              width={300}
              height={300}
              alt=""
            />
          </div>
          <div className="lg:col-span-4 col-span-6 lg:p-10 p-4">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
