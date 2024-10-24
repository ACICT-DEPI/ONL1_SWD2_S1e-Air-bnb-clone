import { differenceInCalendarDays, format } from "date-fns";
import NightIcon from "../ui/icons/NightIcon";
import CalenderIcon from "../ui/icons/CalenderIcon";

const BookingDate = ({ booking, className }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex gap-1 items-center">
        <NightIcon className={"size-4 md:size-6"} />
        {differenceInCalendarDays(
          new Date(booking.checkOut),
          new Date(booking.checkIn)
        )}{" "}
        nights:
      </div>
      <div className="flex items-center gap-1">
        <CalenderIcon className={"size-4 md:size-6"} />
        {format(new Date(booking.checkIn), "yyyy-mm-dd")} &rarr;
        <CalenderIcon className={"size-4 md:size-6"} />
        {format(new Date(booking.checkOut), "yyyy-mm-dd")}
      </div>
    </div>
  );
};

export default BookingDate;
