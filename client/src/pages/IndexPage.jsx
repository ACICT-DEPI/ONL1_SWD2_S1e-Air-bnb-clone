import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get("/places")
      .then((res) => {
        console.log(res.data);
        setPlaces(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/place/${place._id}`} key={place._id}>
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
        ))}
    </div>
  );
};

export default IndexPage;