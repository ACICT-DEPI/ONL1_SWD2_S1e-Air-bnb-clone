import { Link, useNavigate } from "react-router-dom";
import UserIcon from "../ui/icons/UserIcon";
import { useUser } from "../context/UserContext";
import { logoutUser } from "../api/auth/authApi";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  return (
    <header className="flex justify-between">
      <Link to="/" className="flex items-center gap-1">
        <span className="font-bold text-3xl uppercase">Core</span>
      </Link>

      {!user && (
        <div className="flex  items-center border border-gray-300 rounded-full overflow-hidden">
          <Link
            to={"/login"}
            className="py-2 px-4 border-r hover:bg-primary hover:text-white transition-all"
          >
            Login
          </Link>
          <Link
            to={"register"}
            className="py-2 px-4 hover:bg-primary hover:text-white transition-all"
          >
            Sign up
          </Link>
        </div>
      )}

      {!!user && (
        <div className="flex  items-center border border-gray-300 rounded-full overflow-hidden">
          <Link
            to={"/account"}
            className="flex items-center gap-1 py-2 px-4 border-r hover:bg-primary hover:text-white transition-all"
          >
            <UserIcon className="size-5" />
            {user.name}
          </Link>
          <div
            onClick={() => {
              logoutUser().then(() => {
                toast.success("Logged out successfully");
                setUser(null);
                navigate("/login");
              });
            }}
            className="py-2 px-4 cursor-pointer hover:bg-primary hover:text-white transition-all"
          >
            logout
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
