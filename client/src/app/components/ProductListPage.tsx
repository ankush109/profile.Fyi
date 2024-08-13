import React, { FC } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { StaticImageData } from "next/image";

interface ProductListPageProps {
  products: ProductCardArrayProps[];
}

interface ProductCardArrayProps {
  id: number;
  itemName: string;
  price: number;
  quantity?: number;
  imgLink: StaticImageData;
  desc: string;
  productType: string;
}

const ProductListPage: FC<ProductListPageProps> = ({ products }) => {
  return (
    <div className="grid p-5 lg:grid-cols-3 mx-auto md:grid-cols-2 items-center mb-10">
      {products.map((product, ind) => (
        <motion.div
          key={product.id}
          initial={{ y: "15%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 * ind }}
        >
          <ProductCard
            data={product}
            itemName={product.itemName}
            imgLink={product.imgLink}
            desc={product.desc}
            price={product.price}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProductListPage;
