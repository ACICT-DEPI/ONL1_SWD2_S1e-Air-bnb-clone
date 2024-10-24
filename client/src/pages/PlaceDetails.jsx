import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingBox from "../components/BookingBox";
import Gallery from "../components/Gallery";
import AddressLink from "../components/AddressLink";
import { getPlace } from "../api/place/placeApi";
import GridSkelton from "../ui/GridSkelton";
import WifiIcon from "../ui/icons/WifiIcon";
import TruckIcon from "../ui/icons/TruckIcon";
import TvIcon from "../ui/icons/TvIcon";
import FaceSimleIcon from "../ui/icons/FaceSimleIcon";
import GymIcon from "../ui/icons/GymIcon";
import BookingDetailsBox from "../components/BookingDetailsBox";

const perksIcon = [
  { id: "wifi", title: "Wifi", icon: <WifiIcon className={"size-6"} /> },
  {
    id: "parking",
    title: "Free parking",
    icon: <TruckIcon className={"size-6"} />,
  },
  { id: "tv", title: "TV", icon: <TvIcon className={"size-6"} /> },
  { id: "pets", title: "Pets", icon: <FaceSimleIcon className={"size-6"} /> },
  { id: "gym", title: "Gym", icon: <GymIcon className={"size-6"} /> },
];

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getPlace(id)
      .then((data) => {
        console.log(data);

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
          <BookingDetailsBox place={place} />
          <div className="mt-4">
            {place.perks.length > 0 && (
              <>
                <h2 className="text-xl font-semibold">Perks</h2>
                <div>
                  {place.perks.map((perk) => (
                    <div
                      key={perk}
                      className="flex items-center gap-2 text-gray-700 mt-2"
                    >
                      {perksIcon.find((p) => p.id === perk)?.icon}
                      <span>{perksIcon.find((p) => p.id === perk)?.title}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
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
