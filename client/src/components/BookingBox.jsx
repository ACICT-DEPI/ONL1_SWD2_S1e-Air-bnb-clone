import { differenceInCalendarDays } from "date-fns";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { AddBooking } from "../api/booking/bookingApi";
import { useForm } from "react-hook-form";
import Error from "../ui/Error";

const BookingBox = ({ place }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  let numberOFnights = 0;

  const onSubmit = (data) => {
    const { checkIn, checkOut, phone, name, guests } = data;
    numberOFnights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
    const AddBookingItem = {
      checkIn,
      checkOut,
      maxGuests: guests,
      name,
      phone,
      place: place._id,
      price: numberOFnights * place.price,
    };
    AddBooking(AddBookingItem)
      .then(() => {
        toast.success("Booking successful");
        navigate("/account/bookings");
      })
      .catch(() => {
        toast.error("Error booking place");
      });
  };
  return (
    <div className="bg-white shadow p-4 px-6 rounded-2xl">
      <p className="text-lg font-semibold mb-2">
        Price : ${place.price}  Per Night
      </p>
      <form
        className="border rounded-2xl mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap">
          <div className="py-3 px-4">
            <label htmlFor="check-in">Check-in</label>
            <input
              type="date"
              id="check-in"
              {...register("checkIn", {
                required: "Check-in date is required",
              })}
            />
            {errors?.checkIn && (
              <Error className={"block"} errors={errors?.checkIn.message} />
            )}
          </div>
          <div className="py-3 px-4 border-l border-t grow">
            <label htmlFor="check-out">Check-out</label>
            <input
              type="date"
              id="check-out"
              {...register("checkOut", {
                required: "Check-out date is required",

                validate: (value) => {
                  if (
                    differenceInCalendarDays(
                      new Date(value),
                      new Date(getValues("checkIn"))
                    ) < 1
                  ) {
                    return "Check-out date must be greater than check-in date";
                  }
                  return true;
                },
              })}
            />
            {errors?.checkOut && (
              <Error className={"block"} errors={errors?.checkOut.message} />
            )}
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label htmlFor="guests">Number of guests</label>
          <input
            type="number"
            id="guests"
            {...register("guests", {
              required: "Number of guests is required",
              min: { value: 1, message: "Minimum 1 guest is required" },
            })}
          />
          {errors?.guests && (
            <Error className={"block"} errors={errors?.guests.message} />
          )}
        </div>
        <div className="py-3 px-4 border-t">
          <label htmlFor="name">Your full name:</label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors?.name && (
            <Error className={"block"} errors={errors?.name.message} />
          )}
          <label htmlFor="name">Phone Number:</label>
          <input
            type="tel"
            id="name"
            {...register("phone", {
              required: "Phone number is required",
            })}
          />
          {errors?.phone && (
            <Error className={"block"} errors={errors?.phone.message} />
          )}
        </div>
        <button className="primary mt-4">
          Book Now
          {numberOFnights > 0 && <span> ${numberOFnights * place.price}</span>}
        </button>
      </form>
    </div>
  );
};

export default BookingBox;
