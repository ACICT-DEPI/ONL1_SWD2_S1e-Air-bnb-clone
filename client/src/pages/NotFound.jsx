import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8 animate-[fadeIn_0.5s_ease-out]">
        {/* Large 404 Text */}
        <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          404
        </h1>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. Please check
            the URL or return to the homepage.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => navigate(-1, { replace: true })}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            {/* <ArrowLeft size={20} /> */}
            Go Back
          </button>

          <button
            onClick={() => navigate("/", { replace: true })}
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {/* <HomeIcon size={20} /> */}
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
