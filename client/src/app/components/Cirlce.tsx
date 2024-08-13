import React from "react";

const Cirlce = ({ item }: { item: number }) => {
  return (
    <div className="border border-gray-600 w-5 cursor-pointer h-5 items-center flex justify-center rounded-full">
      {item}
    </div>
  );
};

export default Cirlce;
