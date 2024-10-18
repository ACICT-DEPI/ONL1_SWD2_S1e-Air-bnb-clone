const SkeletonLoader = () => {
  return (
    <div className="max-w-2xl bg-gray-50 p-4 rounded-lg">
      <div className="flex gap-3">
        {/* Skeleton for image */}
        <div className="w-20 h-20 bg-gray-200 rounded-sm relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>

        {/* Skeleton for text content */}
        <div className="flex flex-col justify-center space-y-2">
          {/* Title skeleton */}
          <div className="h-4 w-32 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>

          {/* Description skeleton */}
          <div className="h-3 w-24 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SkeletonLoader;
// Add keyframes for the shimmer animation
