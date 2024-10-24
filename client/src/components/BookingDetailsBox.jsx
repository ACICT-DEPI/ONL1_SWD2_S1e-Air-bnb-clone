const BookingDetailsBox = ({ place }) => {
  return (
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
  );
};

export default BookingDetailsBox;
