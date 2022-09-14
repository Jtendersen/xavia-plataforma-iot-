import Login from "./components/Login";
import PassCreate from "./commons/PassCreate";
import ForgotPassword from "./components/ForgotPassword";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./views/Profile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import LoginUser from "./components/LoginUser";
import { setUser } from "./store/reducers/user.reducer";
import ResetPassword from "./components/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((resp) => {
        dispatch(setUser(resp.data));
      })
      .catch((error) => {
        console.log(error);
        navigate(("/", { replace: true }));
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/passForgot" element={<ForgotPassword />} />
      <Route path="/passCreate" element={<PassCreate />} />
      <Route path="/passreset/:resetToken" element={<ResetPassword />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
