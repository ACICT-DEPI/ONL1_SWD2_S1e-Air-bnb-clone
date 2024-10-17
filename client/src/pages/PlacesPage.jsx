import { Link } from "react-router-dom";
import PlusIcon from "../ui/icons/PlusIcon";
import { useEffect, useState } from "react";
import { getUserPlaces } from "../api/place/placeApi";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getUserPlaces()
      .then((data) => {
        setPlaces(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="text-center">
        <Link
          className="inline-flex bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <PlusIcon className={"size-6"} />
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              className="flex gap-2 bg-gray-100 p-4 rounded-2xl"
              key={place._id}
            >
              <div className="flex size-32 shrink-0 bg-gray-300 rounded-sm overflow-hidden">
                {place.photos.length > 0 && (
                  <img
                    className="object-cover w-full h-full"
                    src={`http://localhost:3000/uploads/${place.photos[0]}`}
                    alt="apt image"
                  />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
