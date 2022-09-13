import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../commons/LoadingScreen";

export default function PrivateRoute({ children }) {
    const user = useSelector((state) => state.user);
    if (user.state === "loading") return <LoadingScreen />;
    if (user.state === "rejected") return <Navigate to="/" replace={true} />;
    if (user.email) return children;
}
