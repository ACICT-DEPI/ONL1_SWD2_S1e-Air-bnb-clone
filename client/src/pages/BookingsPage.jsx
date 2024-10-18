import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookingDate from "../components/BookingDate";
import { getBookings } from "../api/booking/bookingApi";
import SkeletonLoader from "../ui/SkeletonLoader";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBookings()
      .then((data) => {
        setBookings(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <SkeletonLoader />;
  if (bookings.length === 0)
    return <div className="text-3xl text-center">No bookings Found</div>;
  return (
    <div className="flex flex-col gap-2">
      {bookings.length > 0 &&
        bookings.map((booking) => (
          <Link
            to={`/account/bookings/${booking._id}`}
            key={booking._id}
            className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
          >
            <div className="w-48 aspect-square">
              <img
                className="w-full object-cover aspect-square"
                src={`http://localhost:3000/uploads/${booking.place.photos[0]}`}
                alt=""
              />
            </div>
            <div className="py-3 grow flex flex-col ">
              <h2 className="text-xl">{booking.place.title}</h2>
              <BookingDate
                booking={booking}
                className={
                  "mt-4 text-2xl border-t border-gray-300 text-gray-500  py-2"
                }
              />
              <div className="text-2xl mt-auto font-semibold">
                TotalPrice: ${booking.price}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default BookingsPage;
