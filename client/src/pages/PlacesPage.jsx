import { Link } from "react-router-dom";
import PlusIcon from "../ui/icons/PlusIcon";
import { useEffect, useState } from "react";
import { deletePlace, getUserPlaces } from "../api/place/placeApi";
import SkeletonLoader from "../ui/SkeletonLoader";
import toast from "react-hot-toast";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserPlaces()
      .then((data) => {
        setPlaces(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    deletePlace(id)
      .then(() => {
        toast.success("Place deleted successfully");
        setPlaces((prev) => prev.filter((place) => place._id !== id));
      })
      .catch(() => {
        toast.error("Error deleting place");
      });
  };

  if (loading) return <SkeletonLoader />;
  if (places.length === 0)
    return <div className="text-3xl text-center">No places, Add one</div>;
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
      <div className="mt-4 flex flex-col gap-2">
        {places.length > 0 &&
          places.map((place) => (
            <div
              className="flex gap-4 justify-between bg-gray-100 p-4 rounded-2xl max-h-[200px] overflow-hidden"
              key={place._id}
            >
              <div className="flex size-40  shrink-0 bg-gray-300 rounded-sm overflow-hidden">
                {place.photos.length > 0 && (
                  <img
                    className="object-cover w-full h-full"
                    src={`http://localhost:3000/uploads/${place.photos[0]}`}
                    alt="apt image"
                  />
                )}
              </div>
              <div className="grow">
                <h2 className="text-xl font-semibold">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
              <div className="me-6 flex gap-2 items-end">
                <Link
                  to={`/account/places/${place._id}`}
                  className="bg-green-500 rounded-2xl px-4 py-2 text-white "
                >
                  Edit
                </Link>
                <button
                  className="bg-primary rounded-2xl px-4 py-2 text-white "
                  onClick={() => handleDelete(place._id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
