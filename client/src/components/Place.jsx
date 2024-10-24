import { Link } from "react-router-dom";

const Place = ({ place }) => {
  return (
    <Link to={`/place/${place._id}`}>
      {place.photos?.[0] && (
        <div className="bg-gray-500 mb-2 rounded-2xl overflow-hidden flex ">
          <img
            className="object-cover aspect-square"
            src={`http://localhost:3000/uploads/${place.photos[0]}`}
          />
        </div>
      )}
      <h2 className="font-bold">{place.address}</h2>
      <h3 className="text-sm text-gray-500">{place.title}</h3>
      <div className="mt-1">
        <span className="font-bold">${place.price}</span> per night
      </div>
    </Link>
  );
};

export default Place;
