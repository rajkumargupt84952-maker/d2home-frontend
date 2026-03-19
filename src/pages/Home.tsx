import { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
import { getRequest } from "../services/handle-apis";
import { endpoints } from "../services/urls";
import type { categoryRes, categorykeys, productRes, productkeys } from "../types/homeTypes";


const Home = () => {
  const [categories, setCategories] = useState<categorykeys[]>([]);
  const [allProducts, setAllProducts] = useState<productkeys[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [])

  async function fetchCategories() {
    try {
      const res = await getRequest<categoryRes>(endpoints.getAllCategories);
      console.log(res.data);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }

  }
  async function fetchProducts() {
    try {
      const res = await getRequest<productRes>(endpoints.getAllProducts);
      console.log(res.data);
      setAllProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }

  }

  return (
    <>
      {/* Banner */}
      <div className="m-4">
        <img
          src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/13.41.3/tr:w-1438,ar-1438-337,pr-true,f-auto,q-40,dpr-2/images/paan-corner/paan-corner-desktop-edlp.webp"
          className="rounded-xl w-full"
          alt="Banner"
        />
      </div>

      {/* Category Section */}
      <div className="py-8 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Shop by Categories
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Explore our wide range of products</p>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={scrollLeft}
              className="p-3 rounded-full bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 transition-all hover:scale-105 active:scale-95"
            >
              <FaArrowLeftLong />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-full bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 transition-all hover:scale-105 active:scale-95"
            >
              <FaArrowRightLong />
            </button>
          </div>
        </div>

        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-6 scroll-smooth no-scrollbar pb-6 pt-2 px-2 -mx-2"
          >
            {categories.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/products-by-category/${item._id}`)}
                className="flex-shrink-0 w-44 md:w-60 group/card cursor-pointer"
              >
                <div className="relative h-56 md:h-72 w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 group-hover/card:shadow-xl group-hover/card:-translate-y-2 group-hover/card:border-green-200 dark:group-hover/card:border-green-800/50 bg-white dark:bg-[#1e293b]">
                  {/* Image Container with slight zoom on hover */}
                  <div className="h-[65%] w-full bg-green-50/50 dark:bg-gray-800/50 p-5 flex items-center justify-center">
                    <img
                      src={"https://media.istockphoto.com/id/1352881713/photo/mango-fruit-with-drops-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=xNgofvhPOsksKtOMK9sbvQ2qZpMS6WQ3UC6Omv7g8-0="}
                      className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover/card:scale-110"
                      alt={item.categoryName}
                    />
                  </div>

                  {/* Category Info */}
                  <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-white dark:bg-[#1e293b] flex flex-col justify-center items-center px-4 border-t border-gray-50 dark:border-gray-800/50 transition-colors duration-300 group-hover/card:bg-green-50 dark:group-hover/card:bg-gray-800">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-[15px] md:text-lg text-center line-clamp-1 transition-colors group-hover/card:text-green-600 dark:group-hover/card:text-green-400">
                      {item.categoryName}
                    </h3>
                    <div className="mt-2 w-8 h-1 rounded-full bg-green-100 dark:bg-green-900/30 transition-all duration-300 group-hover/card:w-16 group-hover/card:bg-green-500 dark:group-hover/card:bg-green-400"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Sections */}
      <div className="p-4 space-y-10">
        <ProductCarousel
          title="Fruits & Vegetables"
          products={allProducts}
        />

      </div>
    </>
  );
};

export default Home;
