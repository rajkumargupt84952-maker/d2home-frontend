import { useRef, useState, useEffect } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import ProductCard from "../Module/Product/Components/ProductCard";

interface ProductCarouselProps {
  title: string;
  products: any[];
}

export default function ProductCarousel({
  title,
  products,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    checkButtons();
  }, [products]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    setTimeout(checkButtons, 300);
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(checkButtons, 300);
  };

  return (
    <div className="relative w-full my-10">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button className="text-green-500 font-semibold flex items-center gap-1">
          View All <FaArrowRightLong />
        </button>
      </div>

      {/* Left Button */}
      {showLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[rgb(var(--bg-secondary))] p-3 rounded-full shadow-md"
        >
          <FaArrowLeftLong />
        </button>
      )}

      {/* Products */}
      <div
        ref={scrollRef}
        onScroll={checkButtons}
        className="flex overflow-x-auto gap-5 scroll-smooth no-scrollbar"
      >
        {products.map((product) => (
          <div key={product._id} className="min-w-[220px] shrink-0 flex">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Right Button */}
      {showRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[rgb(var(--bg-secondary))] p-3 rounded-full shadow-md"
        >
          <FaArrowRightLong />
        </button>
      )}
    </div>
  );
}
