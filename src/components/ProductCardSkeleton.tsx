const ProductCardSkeleton = () => {
  return (
    <div className="min-w-[220px] p-3 rounded-xl border bg-[rgb(var(--bg-secondary))] animate-pulse">
      <div className="h-5 w-16 bg-gray-500 rounded mb-3" />

      <div className="h-36 bg-gray-500 rounded mb-3" />

      <div className="h-4 w-full bg-gray-500 rounded mb-2" />
      <div className="h-4 w-2/3 bg-gray-500 rounded mb-4" />

      <div className="flex justify-between items-center">
        <div className="h-5 w-16 bg-gray-500 rounded" />
        <div className="h-4 w-12 bg-gray-500 rounded" />
      </div>

      <div className="h-9 w-full bg-gray-500 rounded mt-4" />
    </div>
  );
};

export default ProductCardSkeleton;
