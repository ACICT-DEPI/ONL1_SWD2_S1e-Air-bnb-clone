import { Link } from "react-router-dom";

const PlaceAcc = ({ place, handleDelete }) => {
  return (
    <div className="flex gap-4 justify-between bg-gray-100 p-4 rounded-2xl max-h-[200px] overflow-hidden">
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
  );
};

export default PlaceAcc;
