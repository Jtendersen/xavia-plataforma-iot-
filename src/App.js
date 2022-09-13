import Login from "./components/Login";
import PassCreate from "./commons/PassCreate";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./views/Profile";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import LoginUser from "./components/LoginUser";
import { setUser } from "./store/reducers/user.reducer";
import PrivateRoute from "./components/PrivateRoute";
import LoadingScreen from "./commons/LoadingScreen";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/auth/me")
            .then((resp) => {
                dispatch(setUser(resp.data));
                navigate("/profile");
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                dispatch(setUser({ state: "rejected" }));
                navigate(("/", { replace: true }));
                setLoading(false);
            });
    }, [dispatch, navigate]);

    if (loading) {
        return <LoadingScreen />;
    } else {
        return (
            <Routes>
                <Route path="/" element={<LoginUser />} />
                <Route path="/login" element={<Login />} />
                <Route path="/passCreate" element={<PassCreate />} />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
            </Routes>
        );
    }
}

export default App;
