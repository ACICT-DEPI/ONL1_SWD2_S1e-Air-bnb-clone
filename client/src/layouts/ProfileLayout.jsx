import { Outlet } from "react-router-dom";
import NavLinks from "../components/NavLinks";

const ProfileLayout = () => {
  return (
    <div>
      <NavLinks />
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
