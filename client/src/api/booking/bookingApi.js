import axios from "axios";

export async function getBookings() {
  try {
    const response = await axios.get("/bookings");
    return response.data;
  } catch (error) {
    throw error.response.statusText;
  }
}

export async function AddBooking(booking) {
  try {
    const response = await axios.post("/booking", booking);
    return response.data;
  } catch (error) {
    throw error.response.statusText;
  }
}

export async function deleteBooking(id) {
  try {
    const response = await axios.delete(`/booking/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.statusText;
  }
}
