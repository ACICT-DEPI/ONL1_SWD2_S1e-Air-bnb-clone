import { Link } from "react-router-dom";
import BarsIcon from "../ui/BarsIcon";
import PaperPlaneIcon from "../ui/PaperPlaneIcon";
import SearchIcon from "../ui/SearchIcon";
import UserIcon from "../ui/UserIcon";
import { useUser } from "../context/UserContext";

const Header = () => {
  const { user } = useUser();
  return (
    <header className="flex justify-between">
      <Link to="/" className="flex items-center gap-1">
        <PaperPlaneIcon className={"size-8 -rotate-90"} />
        <span className="font-bold text-xl">airbnb</span>
      </Link>

      <nav className="flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4 shadow-md">
        <ul className="flex gap-2">
          <li>Anywhere</li>
          <span className="border-l border-gray-300"></span>
          <li>Any week</li>
          <span className="border-l border-gray-300"></span>
          <li>Add guests</li>
        </ul>
        <button className="bg-primary text-white p-1 rounded-full">
          <SearchIcon className={"size-5"} />
        </button>
      </nav>

      <Link
        to={user ? "/account" : "/login"}
        className="flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4"
      >
        {/* <BarsIcon className={"size-6"} /> */}
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <UserIcon className="size-6 relative top-1" />
        </div>
        {!!user && <div>{user.name}</div>}
        {!user ? "Login" : ""}
      </Link>
    </header>
  );
};

export default Header;
