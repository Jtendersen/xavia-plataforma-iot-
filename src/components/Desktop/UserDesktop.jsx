import { Box, Paper } from "@mui/material";
import React from "react";
import UsersHeader from "../UsersHeader";
import Users from "../../commons/Users";
import { useSelector } from "react-redux";
import ProfileHeader from "../ProfileHeader";
import Aplicaciones from "../Aplicaciones";
import Ubicaciones from "../Ubicaciones";
import Historico from "../Historico";
import UserProfile from "../UserProfile";

const UserDesktop = () => {
    const views = useSelector((state) => state.views);
    return (
        <Box bgcolor="#EAE1D8" flex={8} p={2}>
            {views === "usuariosFinales" ? <UsersHeader /> : <></>}
            {views === "profile" ? <ProfileHeader /> : <></>}

            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    flexDirection: "column",
                    borderRadius: "16px",
                }}
            >
                {views === "profile" || views === "usuariosFinales" ? (
                    <UserProfile />
                ) : (
                    <></>
                )}

                {views === "aplicaciones" ? <Aplicaciones /> : <></>}
                {views === "ubicaciones" ? <Ubicaciones /> : <></>}
                {views === "historico" ? <Historico /> : <></>}
            </Paper>
        </Box>
    );
};

export default UserDesktop;
