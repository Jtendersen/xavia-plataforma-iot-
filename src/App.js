import Login from "./components/Login";
import PassCreate from "./commons/PassCreate";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./views/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import LoginUser from "./components/LoginUser";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((resp) => {
        console.log("ESTA ES LA DATA DE LA RESPUESTA", resp.data);
        console.log("USER DENTRO DEL THEN", user);
        resp.data.isActivated
          ? navigate(("/login", { replace: true }))
          : navigate(("/", { replace: true }));
        // dispatch(setUser(resp.data));
      })
      .catch(
        (error) => {
          console.log(error);
          console.log("USER DENTRO DEL CATCH", user);
          navigate(("/", { replace: true }));
        }
        // console.log("THIS IS DA ERROR", error.response.status)
      );
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/passCreate" element={<PassCreate />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
