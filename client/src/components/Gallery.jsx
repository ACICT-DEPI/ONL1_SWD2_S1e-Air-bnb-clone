import { useState } from "react";
import PhotoIcon from "../ui/icons/PhotoIcon";
import CloseIcon from "../ui/icons/CloseIcon";

const Gallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-36">Photos of {place.title}</h2>
            <button
              className="fixed right-12 top-8 flex items-center gap-1 text-sm py-2 px-4 bg-white rounded-2xl shadow shadow-black text-black"
              onClick={() => setShowAllPhotos(false)}
            >
              <CloseIcon className={"size-4"} />
              Close Photos
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {place?.photos?.length > 0 &&
              place.photos.map((photo, index) => (
                <div key={index} className="max-h-[800px]  aspect-square w-fit">
                  <img
                    className="object-cover w-full h-full"
                    src={`http://localhost:3000/uploads/${photo}`}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative mt-4">
      <div className="grid gap-2 grid-cols-[2fr_1fr] md:grid-cols-[2fr_1fr_1fr] rounded-2xl overflow-hidden">
        <div className=" row-span-full overflow-hidden">
          {place.photos?.[0] && (
            <div
              onClick={() => setShowAllPhotos(true)}
              className="size-full overflow-hidden cursor-pointer"
            >
              <img
                className="w-full h-full object-cover"
                src={`http://localhost:3000/uploads/${place.photos[0]}`}
              />
            </div>
          )}
        </div>
        <div className="grid gap-y-2 ">
          {place.photos?.[1] && (
            <div
              onClick={() => setShowAllPhotos(true)}
              className="size-full overflow-hidden cursor-pointer"
            >
              <img
                className="w-full h-full object-cover"
                src={`http://localhost:3000/uploads/${place.photos[1]}`}
              />
            </div>
          )}
          {place.photos?.[2] && (
            <div
              onClick={() => setShowAllPhotos(true)}
              className="cursor-pointer"
            >
              <img
                className="w-full h-full object-cover"
                src={`http://localhost:3000/uploads/${place.photos[2]}`}
              />
            </div>
          )}
        </div>
        <div className="gap-y-2 hidden md:grid">
          {place.photos?.[3] && (
            <div
              onClick={() => setShowAllPhotos(true)}
              className="cursor-pointer"
            >
              <img
                className="w-full h-full object-cover"
                src={`http://localhost:3000/uploads/${place.photos[3]}`}
              />
            </div>
          )}
          {place.photos?.[4] && (
            <div className="cursor-pointer">
              <img
                className="w-full h-full object-cover"
                src={`http://localhost:3000/uploads/${place.photos[4]}`}
              />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="absolute flex items-center gap-1 bottom-2 text-sm right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-300"
      >
        <PhotoIcon className="size-4" />
        Show more photos
      </button>
    </div>
  );
};

export default Gallery;
