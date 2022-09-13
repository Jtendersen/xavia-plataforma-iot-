import Login from "./components/Login";
import PassCreate from "./commons/PassCreate";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./views/Profile";
import { useDispatch } from "react-redux";
import { useEffect} from "react";
import axios from "axios";
import LoginUser from "./components/LoginUser";
import { setUser } from "./store/reducers/user.reducer";
import PrivateRoute from "./components/PrivateRoute";

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
                dispatch(setUser({state: 'rejected'}))
                navigate(("/", { replace: true }));
            });
    }, [dispatch]);

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

export default App;
