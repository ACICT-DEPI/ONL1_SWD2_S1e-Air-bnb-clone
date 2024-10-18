import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/auth/authApi";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  const { setUser } = useUser();
  const onSubmit = (data) => {
    setLoading(true);
    loginUser(data)
      .then((user) => {
        setUser(user);
        toast.success(`Welcome back, ${user.name}`);
        navigate("/account", { replace: true });
      })
      .catch(() => {
        toast.error(`password or email is incorrect`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        id="email"
        placeholder="your@email.com"
        autoComplete="email"
        {...register("email", { required: "Email is required" })}
      />
      {errors?.email && <Error errors={errors.email.message} />}
      <input
        type="password"
        placeholder="password"
        {...register("password", { required: "Password is required" })}
      />
      {errors?.password && <Error errors={errors.password.message} />}
      <button className="primary mt-1 text-center" disabled={loading}>
        {loading ? (
          <span className="w-full flex items-center justify-center">
            <Spinner className={"size-6"} />
          </span>
        ) : (
          "Login"
        )}
      </button>
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
