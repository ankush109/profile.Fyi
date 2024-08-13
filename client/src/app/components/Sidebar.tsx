import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { CircleCheckBig } from "lucide-react";

function Sidebar({
  changeFilter,
  priceFilter,
  pricestatus,
  lowToHighPrice,
  highToLowPrice,
}: {
  changeFilter: any;
  priceFilter: any;
  highToLowPrice: any;
  pricestatus: any;
  lowToHighPrice: any;
}) {
  const [sliderValue, setSliderValue] = useState([6000]);

  const handleSliderChange = (value: any) => {
    setSliderValue(value);
    priceFilter(value[0]);
  };

  return (
    <div className="bg-white hidden lg:flex flex-col justify-between m-10 h-[600px]">
      <div className="p-3">
        <div className="text-2xl font-semibold">Filters</div>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>CATEGORIES</AccordionTrigger>
            <AccordionContent>
              <div className="flex gap-4 flex-col">
                <div
                  onClick={() => changeFilter("electronics")}
                  className="text-xl font-semibold cursor-pointer"
                >
                  Electronics
                </div>
                <div
                  className="text-xl font-semibold cursor-pointer"
                  onClick={() => changeFilter("wearables")}
                >
                  Wearables
                </div>
                <div
                  onClick={() => changeFilter("all")}
                  className="text-xl font-semibold cursor-pointer"
                >
                  All
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Slider
          defaultValue={[6000]}
          onValueChange={handleSliderChange}
          max={200000}
          step={100}
        />

        <div className="mt-5 text-md font-semibold">
          Selected Price Range: ₹ {sliderValue[0]}
        </div>
        <div className="mt-5">
          <div
            onClick={() => highToLowPrice()}
            className="flex gap-3 cursor-pointer"
          >
            High to Low{" "}
            {pricestatus == "high" ? (
              <CircleCheckBig className="text-green-500" />
            ) : (
              ""
            )}
          </div>
          <div
            onClick={() => lowToHighPrice()}
            className="flex gap-3 cursor-pointer"
          >
            Low to High{" "}
            {pricestatus == "low" ? (
              <CircleCheckBig className="text-green-500" />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto py-4 px-6 bg-blue-500 text-white text-center">
        <div className="text-lg font-semibold mb-2">
          Made by Ankush Banerjee
        </div>
        <Link
          target="_blank"
          href="https://ankush-port3-0.vercel.app/"
          className="text-white  hover:text-black transition-colors duration-300"
        >
          (About me)
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
