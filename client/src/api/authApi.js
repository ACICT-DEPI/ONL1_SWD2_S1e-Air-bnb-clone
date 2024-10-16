import axios from "axios";

export async function registerUser({ name, email, password }) {
  try {
    const response = await axios.post("/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.statusText;
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await axios.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function logoutUser() {
  try {
    const response = await axios.post("/logout");
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function getProfile() {
  try {
    const response = await axios.get("/profile");

    return response.data;
  } catch (error) {
    throw error.response.statusText;
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
