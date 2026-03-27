import { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import {  useParams } from "react-router-dom";
import { getRequest } from "../services/handle-apis";
import { endpoints } from "../services/urls";
import type {
  productRes,
  productkeys,
} from "../types/homeTypes";
import ProductCarousel from "../components/ProductCarousel";

const ProductByCategory = () => {
  const { id } = useParams(); 
  const scrollRef = useRef<HTMLDivElement>(null);
  const [allProducts, setAllProducts] = useState<productkeys[]>([]);

  // =========================
  // Scroll Functions
  // =========================
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };



  useEffect(() => {
    if (id) {
      fetchProductsByCategory(id);
    }
  }, [id]);


 

  const fetchProductsByCategory = async (categoryId: string) => {
    try {

      const res = await getRequest<productRes>(
        `${endpoints.getProductsByCategoryId}/?id=${categoryId}`
      );

      setAllProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } 
  };

  return (
    <>
      {/* =========================
           Banner
      ========================== */}
      <div className="m-4">
        <img
          src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/13.41.3/tr:w-1438,ar-1438-337,pr-true,f-auto,q-40,dpr-2/images/paan-corner/paan-corner-desktop-edlp.webp"
          className="rounded-xl w-full"
          alt="Banner"
        />
      </div>

      {/* =========================
           Category Carousel
      ========================== */}
      <div className="relative w-full py-4">
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow"
        >
          <FaArrowLeftLong />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 scroll-smooth no-scrollbar px-10"
        >
           <div className="p-4 space-y-10">
                  <ProductCarousel
                    title="Fruits & Vegetables"
                    products={allProducts}
                  />
                
                </div>
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow"
        >
          <FaArrowRightLong />
        </button>
      </div>

      {/* =========================
           Product Section
      ========================== */}
    

     
    </>
  );
};

export default ProductByCategory;
