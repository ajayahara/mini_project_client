import React, { useEffect } from "react";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { fetchMe } from "./redux/auth/authSlice";

const App = () => {
   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <AllRoutes />
      </div>
    </div>
  );
};

export default App;
