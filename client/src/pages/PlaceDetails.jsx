import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingBox from "../components/BookingBox";
import Gallery from "../components/Gallery";
import AddressLink from "../components/AddressLink";
import { getPlace } from "../api/place/placeApi";
import GridSkelton from "../ui/GridSkelton";

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getPlace(id)
      .then((data) => {
        setPlace(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <GridSkelton />;
  if (!place)
    return <div className="text-3xl text center">Booking not found</div>;
  return (
    <div className="mt-4 bg-gray-100 -mx-8 pt-8 px-8">
      <h1 className="text-3xl font-semibold">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <Gallery place={place} />
      <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-bold text-2xl ">Description</h2>
            <p className="font-openSans">{place.description}</p>
          </div>
          <h2 className="font-bold text-2xl">Booking Details</h2>
          <table className="min-w-full border-collapse border border-gray-200 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Details</th>
                <th className="border border-gray-300 p-2">Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Check-in</td>
                <td className="border border-gray-300 p-2">{place.checkIn}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Check-out</td>
                <td className="border border-gray-300 p-2">{place.checkOut}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Max number of guests</td>
                <td className="border border-gray-300 p-2">{place.maxGuests}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <BookingBox place={place} />
        </div>
      </div>

      {place.extraInfo && (
        <div className="bg-white -mx-8 px-8 py-8 border-t">
          <h2 className="text-2xl font-bold">Extra Info</h2>
          <p className="font-openSans text-base text-gray-700 leading-5 mt-2 mb-4">
            {place.extraInfo}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlaceDetails;
