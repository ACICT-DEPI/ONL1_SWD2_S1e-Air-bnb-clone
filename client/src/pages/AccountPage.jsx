import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { logoutUser } from "../api/authApi";

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, loading, setUser } = useUser();

  if (loading) return <div>Loading...</div>;

  if (!user) return navigate("/login", { replace: true });

  const handleLogout = () => {
    logoutUser()
      .then((res) => {
        console.log(res);
        navigate("/", { replace: true });
        setUser(null);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <div className="text-center max-w-lg mx-auto">
        Logged in as {user.name} ({user.email}) <br />
        <button onClick={handleLogout} className="primary max-w-xs mt-2">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
