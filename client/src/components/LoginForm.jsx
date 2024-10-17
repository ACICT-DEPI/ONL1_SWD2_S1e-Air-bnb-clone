import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth/authApi";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useUser();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    loginUser({ email, password })
      .then((user) => {
        setUser(user);
        toast.success(`Welcome back, ${user.name}`);
        navigate("/", { replace: true });
      })
      .catch(() => {
        toast.error(`password or email is incorrect`);
      });
  };
  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="primary mt-1">login</button>
      <div className="text-center py-2 text-gray-500">
        Don&#39;t have ac account yet?{" "}
        <Link to={"/register"} className="underline text-black">
          Register Now
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
