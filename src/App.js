import PassCreate from "./commons/PassCreate";
import ForgotPassword from "./components/ForgotPassword";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./views/Profile";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import LoginUser from "./components/LoginUser";
import { setUser } from "./store/reducers/user.reducer";
import PrivateRoute from "./components/PrivateRoute";
import LoadingScreen from "./commons/LoadingScreen";
import ResetPassword from "./components/ResetPassword";
import SeedGenerator from "./utils/SeedGenerator";
import SeedResults from "./utils/SeedResults";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((resp) => {
        dispatch(setUser(resp.data));
        // navigate("/profile");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401)
          dispatch(setUser({ state: "rejected" }));
        navigate(("/", { replace: true }));
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/passForgot" element={<ForgotPassword />} />
        <Route path="/passCreate" element={<PassCreate />} />
        <Route path="/passreset/:resetToken" element={<ResetPassword />} />
        <Route path="/passCreate" element={<PassCreate />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/git add" element={<SeedGenerator />} />
        {/* <Route path="/seedresults" element={<SeedResults />} /> */}
      </Routes>
    );
  }
}

export default App;
