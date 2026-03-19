import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaStar,
  FaHeart,
  FaMinus,
  FaPlus,
  FaShareAlt,
  FaTruck,
  FaShieldAlt,
  FaUndoAlt,
} from "react-icons/fa";
import { getRequest } from "../services/handle-apis";
import { endpoints } from "../services/urls";
import type { productkeys } from "../types/homeTypes";
import { useCartContext } from "../contexts/cartContext";
import LoginModal from "../Module/Auth/Pages/Login";

interface SingleProductRes {
  data: productkeys;
  success: boolean;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartContext();

  const [product, setProduct] = useState<productkeys | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [wishlisted, setWishlisted] = useState<boolean>(false);
  const [openLogin, setOpenLogin] = useState<boolean>(false);


  useEffect(() => {
    if (id) fetchSingleProduct(id);
  }, [id]);

  const fetchSingleProduct = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getRequest<SingleProductRes>(
        `${endpoints.getSingleProduct}/?id=${productId}`
      );
      setProduct(res.data);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };


  const productAddTocart = (productId: string, quantity: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setOpenLogin(true);
      return;
    }
    addToCart(productId, quantity);
  }


  // ─── Loading skeleton ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg-primary))] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-[rgb(var(--text-muted))] font-medium animate-pulse">
            Loading product…
          </p>
        </div>
      </div>
    );
  }

  // ─── Error state ─────────────────────────────────────────────────────────────
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg-primary))] flex flex-col items-center justify-center gap-6">
        <div className="text-6xl">😕</div>
        <p className="text-xl font-semibold text-[rgb(var(--text-primary))]">
          {error ?? "Product not found"}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  const images =
    product.productImage && product.productImage.length > 0
      ? product.productImage
      : [
        "https://cdn.zeptonow.com/production/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/932c742f-53be-4ebe-bd60-e698775c70c0.jpeg",
      ];

  // ─── Main UI ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] pb-20">
      <LoginModal show={openLogin} setShow={setOpenLogin} />
      {/* ── Top Bar ─────────────────────────────────── */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-[rgb(var(--bg-primary)/0.85)] border-b border-[rgb(var(--border-color))] px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[rgb(var(--text-secondary))] hover:text-green-600 transition-colors font-medium"
        >
          <FaArrowLeft className="text-lg" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h1 className="text-sm sm:text-base font-semibold text-[rgb(var(--text-primary))] truncate max-w-[200px] sm:max-w-xs">
          {product.productName}
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setWishlisted((w) => !w)}
            className={`text-xl transition-all duration-300 ${wishlisted ? "text-red-500 scale-110" : "text-[rgb(var(--text-muted))]"
              }`}
          >
            <FaHeart />
          </button>
          <button className="text-[rgb(var(--text-muted))] hover:text-green-600 text-xl transition-colors">
            <FaShareAlt />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── Left: Image Gallery ─────────────────── */}
          <div className="lg:w-[45%] flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative bg-[rgb(var(--bg-secondary))] rounded-2xl overflow-hidden border border-[rgb(var(--border-color))] shadow-lg group">
              {10 > 0 && (
                <span className="absolute top-4 left-4 z-10 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {((product.maxPrice - product.sellPrice) / product.maxPrice) * 100 >= 10 ? `${Math.round(((product.maxPrice - product.sellPrice) / product.maxPrice) * 100)}% OFF` : "New"}
                </span>
              )}
              <button
                onClick={() => setWishlisted((w) => !w)}
                className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${wishlisted
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-400 hover:text-red-400"
                  }`}
              >
                <FaHeart />
              </button>
              <div className="h-72 sm:h-96 flex items-center justify-center p-6">
                <img
                  src={images[selectedImage] ?? ""}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://media.gettyimages.com/id/185071735/photo/red-apple-with-droplet.jpg?s=612x612&w=gi&k=20&c=0tybCsUgMrmbLja8UcKPrzm9XwLIAmxm8InbcmOYfhQ=";
                  }}
                  alt={product.productName}
                  className="object-contain h-full w-full drop-shadow-xl transition-all duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`min-w-[72px] h-[72px] rounded-xl border-2 overflow-hidden transition-all duration-200 ${selectedImage === idx
                      ? "border-green-500 shadow-md scale-105"
                      : "border-[rgb(var(--border-color))] opacity-60 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={img}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://media.gettyimages.com/id/185071735/photo/red-apple-with-droplet.jpg?s=612x612&w=gi&k=20&c=0tybCsUgMrmbLja8UcKPrzm9XwLIAmxm8InbcmOYfhQ=";
                      }}
                      alt={`thumb-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { icon: <FaTruck />, label: "Free Delivery", sub: "Above ₹499" },
                { icon: <FaShieldAlt />, label: "100% Genuine", sub: "Assured Quality" },
                { icon: <FaUndoAlt />, label: "Easy Return", sub: "7-day policy" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-1 bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-color))] rounded-xl p-3 text-center"
                >
                  <span className="text-green-600 text-lg">{badge.icon}</span>
                  <p className="text-xs font-semibold text-[rgb(var(--text-primary))]">
                    {badge.label}
                  </p>
                  <p className="text-[10px] text-[rgb(var(--text-muted))]">
                    {badge.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Product Info ─────────────────── */}
          <div className="lg:w-[55%] flex flex-col gap-6">
            {/* Name & Rating */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--text-primary))] leading-tight mb-2">
                {product.productName}
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                {/* <div className="flex items-center gap-1 bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  <FaStar className="text-yellow-300" />
                  <span>4.3</span>
                </div>
                <span className="text-sm text-[rgb(var(--text-muted))]">
                  128 ratings
                </span> */}
                <span className="text-sm text-green-600 font-medium">
                  ✓ In Stock: {product.quantity}
                </span>
              </div>
            </div>

            {/* Price Block */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/10 border border-green-200 dark:border-green-800 rounded-2xl p-5">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-extrabold text-green-700">
                  ₹{product.sellPrice}
                </span>
                <span className="text-xl text-[rgb(var(--text-muted))] line-through">
                  ₹{product.maxPrice}
                </span>
                {/* {10 > 0 && (
                  <span className="text-green-600 font-bold text-sm">
                    {10}% off
                  </span>
                )} */}
              </div>
              {/* <p className="text-xs text-[rgb(var(--text-muted))]">
                Inclusive of all taxes. Free shipping on orders over ₹499.
              </p> */}
            </div>



            {/* Description */}
            {product.description && (
              <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-color))] rounded-2xl p-5">
                <h3 className="text-base font-bold text-[rgb(var(--text-primary))] mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-green-500 rounded-full inline-block" />
                  Description
                </h3>
                <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity + Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-0 bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-color))] rounded-xl overflow-hidden">
                <button
                  onClick={() => { productAddTocart(product._id, -1) }}
                  className="cursor-pointer px-4 py-3 text-[rgb(var(--text-primary))] hover:bg-green-600 hover:text-white transition-colors"
                >
                  <FaMinus />
                </button>
                <span className="px-5 py-3 text-base font-bold text-[rgb(var(--text-primary))] border-x border-[rgb(var(--border-color))] min-w-[48px] text-center">
                  1
                </span>
                <button
                  onClick={() => { productAddTocart(product._id, 1) }}
                  className="cursor-pointer px-4 py-3 text-[rgb(var(--text-primary))] hover:bg-green-600 hover:text-white transition-colors"
                >
                  <FaPlus />
                </button>
              </div>

              {/* Add to Cart */}



              <button
                onClick={() => { productAddTocart(product._id, 1) }}
                className="cursor-pointer flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-md bg-green-600 hover:bg-green-700 text-white hover:shadow-green-400/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                <FaShoppingCart className="text-lg " />
                Add to Cart
              </button>
            </div>

            {/* Buy Now */}
            {/* <button className="w-full py-4 rounded-xl font-bold text-base border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
              Buy Now
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
