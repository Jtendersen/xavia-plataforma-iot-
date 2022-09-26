import { Box, Paper, Stack } from "@mui/material";
import Navbar from "./Navbar";
import React from "react";
import HeaderMobile from "./HeaderMobile";
import Users from "../../commons/Users";
import { useSelector } from "react-redux";
import UserProfile from "../UserProfile";
import Aplicaciones from "../Aplicaciones";
import Ubicaciones from "../Ubicaciones";
import Historico from "../Historico";

const UserMobile = () => {
    const views = useSelector((state) => state.views);
    return (
        <Stack bgcolor="#3D3D3D" flex={1} paddingBottom={0} marginBottom={0} height="100vh">
            <Navbar />
            <Stack id="soyStack" direction="column" spacing={1} paddingBottom={0} marginBottom={0} height="100%" justifyContent="space-between">
                {views === "profile" ? <HeaderMobile /> : <div></div>}
                <Paper
                    elevation={3}
                    sx={{
                        flexDirection: "column",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                        height: "100%"
                    }}
                >
                    {views === "profile" && <UserProfile />}
                    {views === "aplicaciones" && <Aplicaciones />}
                    {views === "ubicaciones" && <Ubicaciones />}
                    {views === "historico" && <Historico />}
                </Paper>
            </Stack>
        </Stack>
    );
};

export default UserMobile;
