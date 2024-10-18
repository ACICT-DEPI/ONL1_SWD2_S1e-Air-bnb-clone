import { useState } from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth/authApi";
import toast from "react-hot-toast";
import Error from "../ui/Error";
import Spinner from "../ui/Spinner";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    setLoading(true);
    registerUser(data)
      .then(() => {
        toast.success("User registered successfully");
        navigate("/login");
      })
      .catch(() => {
        toast.error("Error registering user");
      })
      .finally(() => setLoading(false));
  };
  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="your name"
        {...register("name", { required: "name is required" })}
      />
      {errors?.name && <Error errors={errors.name.message} />}

      <input
        type="email"
        placeholder="your@email.com"
        {...register("email", { required: "Email is required" })}
      />
      {errors?.email && <Error errors={errors.email.message} />}

      <input
        type="password"
        placeholder="password"
        {...register("password", { required: "password is required" })}
      />
      {errors?.password && <Error errors={errors.password.message} />}

      <button className="primary mt-1">
        {loading ? (
          <span className="w-full flex items-center justify-center">
            <Spinner className={"size-6"} />
          </span>
        ) : (
          "Register"
        )}
      </button>
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
