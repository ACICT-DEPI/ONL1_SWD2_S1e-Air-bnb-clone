import { Link } from "react-router-dom";
import PlusIcon from "../ui/icons/PlusIcon";
import { useEffect, useState } from "react";
import { deletePlace, getUserPlaces } from "../api/place/placeApi";
import SkeletonLoader from "../ui/SkeletonLoader";
import toast from "react-hot-toast";
import PlaceAcc from "../components/PlaceAcc";

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
        {places.length === 0 && (
          <div className="text-3xl text-center">No places, Add one</div>
        )}
        {places.length > 0 &&
          places.map((place) => (
            <PlaceAcc
              key={place._id}
              place={place}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
