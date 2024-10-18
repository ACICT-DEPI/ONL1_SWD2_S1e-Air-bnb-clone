import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookingDate from "../components/BookingDate";
import { deleteBooking, getBookings } from "../api/booking/bookingApi";
import SkeletonLoader from "../ui/SkeletonLoader";
import toast from "react-hot-toast";

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

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => {
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
        toast.success("Booking deleted successfully");
      })
      .catch(() => {
        toast.error("Error deleting booking");
      });
  };

  console.log(bookings);
  if (loading) return <SkeletonLoader />;

  if (!bookings)
    return <div className="text-3xl text-center">No bookings Found</div>;
  return (
    <div className="flex flex-col gap-2">
      {bookings.length > 0 &&
        bookings.map((booking) => (
          <>
            {booking.place?.length > 0 ? (
              <div
                key={booking._id}
                className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
              >
                <div className="w-32 md:w-48 aspect-square">
                  <img
                    className="w-full h-full object-cover aspect-square"
                    src={`http://localhost:3000/uploads/${booking?.place?.photos[0]}`}
                    alt=""
                  />
                </div>
                <div className="py-3 grow flex flex-col ">
                  <h2 className="md:text-xl">{booking?.place?.title}</h2>
                  <BookingDate
                    booking={booking}
                    className={
                      "mt-4 text-sm md:text-2xl border-t border-gray-300 text-gray-500  py-2"
                    }
                  />
                  <div className="text-sm md:text-2xl mt-auto font-semibold flex justify-between items-end">
                    TotalPrice: ${booking.price}
                    <div className="me-6 flex gap-2">
                      <Link
                        to={`/account/bookings/${booking._id}`}
                        className="bg-green-500 rounded-2xl px-4 py-2 text-white "
                      >
                        Open
                      </Link>
                      <button
                        className="bg-primary rounded-2xl px-4 py-2 text-white "
                        onClick={() => handleDelete(booking._id)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xl">
                The place was deleted so the Booking also deleted and we give
                you back your money
              </p>
            )}
          </>
        ))}
    </div>
  );
};

export default BookingsPage;
