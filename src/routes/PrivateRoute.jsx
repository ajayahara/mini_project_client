import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <p className="text-center mt-10">Checking session...</p>;

  return user ? children : <Navigate to="/auth" />;
}
