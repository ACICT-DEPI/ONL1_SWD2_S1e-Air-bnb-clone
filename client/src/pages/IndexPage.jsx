import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaces } from "../api/place/placeApi";
import Skelton from "../ui/Skelton";
import Search from "../components/Search";

const searchPlaces = (places, search) => {
  return places.filter((place) => {
    return (
      place.title.toLowerCase().includes(search.toLowerCase()) ||
      place.address.toLowerCase().includes(search.toLowerCase())
    );
  });
};

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPlaces()
      .then((data) => {
        setPlaces(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  if (loading)
    return (
      <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skelton key={index} />
        ))}
      </div>
    );

  const filteredPlaces = searchPlaces(places, search);

  if (places.length === 0)
    return <div className="text-3xl text-center">No places found</div>;
  return (
    <>
      <div className="flex flex-col items-center ">
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {filteredPlaces.length > 0 ? (
          <>
            {filteredPlaces.map((place) => (
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
          </>
        ) : (
          <div className="text-3xl text-center">No places found</div>
        )}
      </div>
    </>
  );
};

export default IndexPage;
