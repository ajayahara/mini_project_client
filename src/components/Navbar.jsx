import { logout } from "@/redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">My Library</Link>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        {user && <Link to="/my_books">My Books</Link>}
        {!user ? (
          <Link to="/auth">Login/Register</Link>
        ) : (
          <>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
