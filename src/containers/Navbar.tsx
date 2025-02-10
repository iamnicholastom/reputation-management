// Navbar.tsx
import { useNavigate } from "react-router";
import { useLogoutMutation } from "../store/features/auth";
import Button from "../components/Button/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleAddReview = () => navigate("/add-review");

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Review System</h1>
          </div>
          <div className="flex items-center space-x-4">
            {window.location.pathname === "/reviews" && (
              <Button onClick={handleAddReview}>Add Review</Button>
            )}
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
