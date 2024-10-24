import { useEffect, useState } from "react";
import { deleteBooking, getBookings } from "../api/booking/bookingApi";
import SkeletonLoader from "../ui/SkeletonLoader";
import toast from "react-hot-toast";
import Booking from "../components/Booking";

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

  if (loading) return <SkeletonLoader />;

  if (bookings.length === 0)
    return <div className="text-3xl text-center">No bookings Found</div>;
  return (
    <div className="flex flex-col gap-2">
      {bookings.length > 0 &&
        bookings.map((booking) => (
          <>
            {booking.place?.length > 0 ? (
              <Booking handleDelete={handleDelete} booking={booking} />
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
