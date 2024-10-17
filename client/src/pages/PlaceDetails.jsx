import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingBox from "../components/BookingBox";
import Gallery from "../components/Gallery";
import AddressLink from "../components/AddressLink";
import { getPlace } from "../api/place/placeApi";

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) return;

    getPlace(id)
      .then((data) => {
        setPlace(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  if (!place) return <div>Loading...</div>;

  return (
    <div className="mt-4 bg-gray-100 -mx-8 pt-8 px-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <Gallery place={place} />
      <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <p className="text-lg font-semibold">Check-in: {place.checkIn} PM</p>
          <p className="text-lg font-semibold">
            Check-out: {place.checkOut} PM
          </p>
          <p className="text-lg font-semibold">
            max number of guests: {place.maxGuests}
          </p>
        </div>
        <div>
          <BookingBox place={place} />
        </div>
      </div>

      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <h2 className="text-2xl font-semibold">Extra Info</h2>
        <p className="text-sm text-gray-700 leading-5 mt-2 mb-4">
          {place.extraInfo}
        </p>
      </div>
    </div>
  );
};

export default PlaceDetails;
