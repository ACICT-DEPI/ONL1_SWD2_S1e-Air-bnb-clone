import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="mt-32 flex justify-around flex-grow items-center">
      <div>
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
