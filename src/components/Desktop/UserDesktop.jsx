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
        <Box id="hola" bgcolor="#EAE1D8" flex={8} p={2}>
            {/* {views === "aplicaciones" ? <UsersHeader /> : <></>} */}
            {views === "profile" && <ProfileHeader />}

            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    flexDirection: "column",
                    borderRadius: "16px",
                    maxHeight: "95%",
                    overflow: "auto",
                    padding: 2,
                    "&::-webkit-scrollbar": {
                        width: "0.4em",
                    },
                    "&::-webkit-scrollbar-track": {
                        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0,0,0,.1)",
                        outline: "1px solid slategrey",
                        borderRadius: "16px",
                    },
                }}
            >
                {views === "aplicaciones" && <Aplicaciones />}
                {(views === "profile" || views === "aplicaciones ") && <UserProfile />}
                {views === "ubicaciones" && <Ubicaciones />}
                {views === "historico" && <Historico />}
            </Paper>
        </Box>
    );
};

export default UserDesktop;
