import axios from "axios";

export async function getPlaces() {
  try {
    const res = await axios.get("/places");
    return res.data;
  } catch (error) {
    throw error.response;
  }
}

export async function getUserPlaces() {
  try {
    const res = await axios.get("/user-places");
    return res.data;
  } catch (error) {
    throw error.response;
  }
}

export async function getPlace(id) {
  try {
    const res = await axios.get(`/places/${id}`);
    return res.data;
  } catch (error) {
    throw error.response;
  }
}

export async function uploadPhotos(formData) {
  try {
    const response = await axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.statusText;
  }
}

export async function uploadPhotoByLink(link) {
  try {
    const response = await axios.post("/upload-by-link", {
      link,
    });
    return response.data;
  } catch (error) {
    throw error.response.statusText;
  }
}

export async function addPlace(data) {
  try {
    const response = await axios.post("/places", data);
    return response.data;
  } catch (error) {
    throw error.response.statusText;
  }
}

export async function editPlace(data) {
  try {
    const response = await axios.put("/places", data);
    return response.data;
  } catch (error) {
    throw error.response.statusText;
  }
}

export async function deletePlace(id) {
  try {
    const response = await axios.delete(`/places/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.statusText;
  }
}
