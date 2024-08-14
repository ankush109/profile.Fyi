"use client";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useCallback, useEffect, useState } from "react";
import { useShoppingCart } from "./middlewares/ContextProvider";
import toast from "react-hot-toast";
import ProductListPage from "./components/ProductListPage";
import { ProductCardArrayProps } from "../../productsData/productData";
import { GetUserQuery } from "@/api/user";
import Pagination from "./components/Pagination";
import MobileSidebar from "./components/MobileController";

export default function Home() {
  // all the states : -
  const { productsList } = useShoppingCart(); // get the products from the context
  const [pageCount, setPageCount] = useState(0);
  const [currentPageNo, setCurrentPageNo] = useState(0);
  const [priceRange, setPriceRange] = useState(6000); // initial price range is set to 6000
  const [products, setProducts] = useState<ProductCardArrayProps[]>([]);
  const [type, setType] = useState("all"); // filter for category wise
  const [userSearch, setUserSearch] = useState("");
  const [priceStatus, setPriceStatus] = useState("");

  const { data: userData } = GetUserQuery(); // we could also have pulled the user info from the context but also can do this
  const filterProducts = useCallback(() => {
    // filter price
    let filteredProducts = productsList.filter(
      (u: ProductCardArrayProps) => u.price < priceRange
    );
    // filter category

    if (type === "electronics") {
      filteredProducts = filteredProducts.filter(
        (u: ProductCardArrayProps) => u.productType === "electronics"
      );
    } else if (type === "wearables") {
      filteredProducts = filteredProducts.filter(
        (u: ProductCardArrayProps) => u.productType === "wearables"
      );
    }

    return filteredProducts;
  }, [productsList, priceRange, type]); // compute when dependency changes
  // returns the product list with paginated slices
  const paginateProducts = (filteredProducts: ProductCardArrayProps[]) => {
    const numberOfPages = Math.ceil(filteredProducts.length / 6);
    setPageCount(numberOfPages);

    const startInd = currentPageNo * 6;
    const endInd = startInd + 6;
    return filteredProducts.slice(startInd, endInd);
  };

  const updateProductList = () => {
    const filteredProducts = filterProducts();
    const paginatedProducts = paginateProducts(filteredProducts);
    setProducts(paginatedProducts);
  };
  // the below useEffect is run when the any thing changes in the dependency arr
  // for eg -> if the user tries to search it will search based on the current saved filters
  useEffect(() => {
    const data = setTimeout(() => {
      if (userSearch.trim() != "") {
        console.log(products, "after search filters .. ");
        const up = filterProducts();
        const filterBySearchQuery = up.filter((u: ProductCardArrayProps) =>
          u.itemName.includes(userSearch)
        );
        setProducts(filterBySearchQuery);
      }
    }, 3000);
    return () => clearTimeout(data);
  }, [currentPageNo, type, productsList, priceRange, userSearch]);

  // when the component renders all the applied filters will be applied to the products

  useEffect(() => {
    if (productsList && productsList.length > 0) {
      updateProductList(); // <- takes care for all the filters like price , category
    }
  }, [currentPageNo, type, productsList, priceRange, userData]);

  // filter functions for diff cases

  const priceFilter = (value: number) => {
    setPriceRange(value);
  };
  const highToLowPrice = () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedProducts);
    console.log(sortedProducts, "after sorting high to low");
    toast.success("Sorted Products Price High to Low");
    setPriceStatus("high");
  };

  const lowToHighPrice = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
    console.log(sortedProducts, "after sorting low to high");
    toast.success("Sorted Products Price Low to High");
    setPriceStatus("low");
  };

  const categoryFilter = (type: string) => {
    setType(type);
    toast.success(`${type} Selected`);
  };

  const inputFilter = (val: string) => {
    console.log(val, "input s");
    setUserSearch(val);
  };

  return (
    <div className="h-screen bg-gray-100">
      <Navbar inputFilter={inputFilter} />
      <div className="grid lg:grid-cols-4 bg-gray-100 w-full">
        <Sidebar
          lowToHighPrice={lowToHighPrice}
          highToLowPrice={highToLowPrice}
          changeFilter={categoryFilter}
          pricestatus={priceStatus}
          priceFilter={priceFilter}
        />{" "}
        <MobileSidebar
          lowToHighPrice={lowToHighPrice}
          highToLowPrice={highToLowPrice}
          changeFilter={categoryFilter}
          pricestatus={priceStatus}
          priceFilter={priceFilter}
        />
        {products.length > 0 ? (
          <div className="lg:col-span-3 bg-white mt-10 lg:w-[90%]">
            <div className="bg-blue-100 text-center p-2">
              <div className="text-2xl font-semibold">
                {type === "all"
                  ? `Available Options for Category "ALL"`
                  : `Available Options for Category "${
                      type.charAt(0).toUpperCase() + type.slice(1)
                    }"`}
              </div>
            </div>
            <ProductListPage products={products} />
            <Pagination
              setCurrentPageNo={setCurrentPageNo}
              currentPageNo={currentPageNo}
              pageCount={pageCount}
            />
          </div>
        ) : (
          "Product Not Available for selected filters"
        )}
      </div>
    </div>
  );
}
