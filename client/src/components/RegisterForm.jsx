import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth/authApi";
import toast from "react-hot-toast";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    registerUser({ name, email, password })
      .then(() => {
        toast.success("User registered successfully");
        navigate("/login");
      })
      .catch(() => {
        toast.error("Error registering user");
      });
  };
  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="primary mt-1">register</button>
      <div className="text-center py-2 text-gray-500">
        Already a member?{" "}
        <Link to={"/login"} className="underline text-black">
          Login Now
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
