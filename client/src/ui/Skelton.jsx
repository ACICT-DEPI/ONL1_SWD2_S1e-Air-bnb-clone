import ShimmerEffect from "./Shimmer";

const Skelton = () => {
  return (
    <div>
      <div className="w-full h-full">
        <div className="relative w-full aspect-square overflow-hidden bg-gray-200">
          <ShimmerEffect />
        </div>
        <div className="py-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-1/2 h-6 bg-gray-200 rounded">
              <ShimmerEffect />
            </div>
          </div>
          <div className="relative w-2/3 h-4 bg-gray-200 rounded">
            <ShimmerEffect />
          </div>
          <div className="relative w-1/3 h-6 bg-gray-200 rounded">
            <ShimmerEffect />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skelton;
