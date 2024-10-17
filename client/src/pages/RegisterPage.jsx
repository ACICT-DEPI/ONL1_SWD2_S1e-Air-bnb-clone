import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="mt-32 flex justify-around flex-grow items-center">
      <div>
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
