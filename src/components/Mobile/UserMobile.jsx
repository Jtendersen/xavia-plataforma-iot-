import { Box, Paper } from "@mui/material";
import Navbar from "./Navbar";
import React from "react";
import HeaderMobile from "./HeaderMobile";
import Users from "../../commons/Users";
import { useSelector } from "react-redux";
import UserProfile from "../UserProfile";

const UserMobile = () => {
    const views = useSelector((state) => state.views);
    return (
        <Box bgcolor="#3D3D3D" flex={8} p={2}>
            <Navbar />
            {views === "profile" ? <HeaderMobile /> : <></>}
            <Paper
                elevation={3}
                sx={{
                    p: 1.5,
                    flexDirection: "column",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            >
                {views === "profile" || views === "usuariosFinales" ? (
                   <UserProfile />
                ) : (
                    <></>
                )}
            </Paper>
        </Box>
    );
};

export default UserMobile;
