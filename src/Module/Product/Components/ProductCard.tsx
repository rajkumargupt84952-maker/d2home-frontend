import { useCartContext } from "../../../contexts/cartContext";
import type { productkeys } from "../../../types/homeTypes";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }: { product: productkeys }) => {
    const { addToCart } = useCartContext();
    const navigate = useNavigate();


    return (
        <div
            className="w-full flex-1 flex flex-col justify-between bg-[rgb(var(--bg-secondary))] p-3 rounded-xl shadow-sm border border-[rgb(var(--border-color))] cursor-pointer h-full transition-transform hover:-translate-y-1 hover:shadow-md"
        >
            <div onClick={() => navigate(`/product/${product._id}`)}>


                {/* Discount */}
                <span className="bg-green-700 text-white text-xs px-2 py-1 rounded-md">
                    {((product.maxPrice - product.sellPrice) / product.maxPrice) * 100 >= 10 ? `${Math.round(((product.maxPrice - product.sellPrice) / product.maxPrice) * 100)}% off` : "New"}
                </span>

                {/* Image */}
                <div className="h-36 flex justify-center p-2">
                    <img
                        src={
                            product.productImage?.[0]

                        }
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://media.gettyimages.com/id/185071735/photo/red-apple-with-droplet.jpg?s=612x612&w=gi&k=20&c=0tybCsUgMrmbLja8UcKPrzm9XwLIAmxm8InbcmOYfhQ=";
                        }}
                        className="object-contain h-full"
                        alt={product.productName}

                    />
                </div>

                {/* Details */}
                <p className="text-sm font-semibold mb-2 leading-tight">{product.productName}</p>

                <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">₹{product.sellPrice} kg</span>
                    {product.maxPrice > product.sellPrice && (
                        <p className="line-through text-gray-400 text-sm">₹{product.maxPrice}</p>
                    )}
                </div>

                {/* Add to Cart / Quantity Controls */}

            </div>

            <button
                onClick={() => {
                    addToCart(product._id, 1)
                }}
                className="bg-green-600 dark:bg-green-700 text-white w-full py-2.5 mt-auto rounded-lg font-semibold cursor-pointer hover:bg-green-700 dark:hover:bg-green-600 transition-colors shadow-sm"
            >
                ADD
            </button>
        </div>
    );
};

export default ProductCard;
