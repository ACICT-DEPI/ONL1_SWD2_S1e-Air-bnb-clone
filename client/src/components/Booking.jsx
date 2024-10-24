import { Link } from "react-router-dom";
import BookingDate from "./BookingDate";

const Booking = ({ booking, handleDelete }) => {
  return (
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
  );
};

export default Booking;
