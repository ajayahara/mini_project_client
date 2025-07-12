import Home from "@/pages/Home";
import LoginRegister from "@/pages/LoginRegister";
import MyBooks from "@/pages/MyBooks";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/my_books"
        element={
          <PrivateRoute>
            <MyBooks />
          </PrivateRoute>
        }
      />
      <Route path="/auth" element={<LoginRegister />} />
    </Routes>
  );
};

export default AllRoutes;
