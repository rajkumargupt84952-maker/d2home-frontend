import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../Module/Product/Components/ProductCard";
import { getRequest } from "../services/handle-apis";
import { endpoints } from "../services/urls";
import type { productRes, productkeys } from "../types/homeTypes";


const FruitVegetables = () => {
  const [allProducts, setAllProducts] = useState<productkeys[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [])

  const filteredProducts = allProducts.filter(p => 
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );


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
          src="https://t3.ftcdn.net/jpg/06/33/87/22/240_F_633872253_QLM1VxbQBfLhQs0zt1gWOjHjfRw46Q3D.jpg"
          className="rounded-xl w-full"
          alt="Banner"
          height={200}
          
        />
      </div>


      {/* Search and Products Section */}
      <div className="p-4 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Fruits & Vegetables
          </h2>
          
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition-colors"
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="text-gray-400 mb-3 block text-5xl">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search term.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FruitVegetables;
