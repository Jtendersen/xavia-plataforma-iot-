import { Box, Paper, Stack } from "@mui/material";
import Navbar from "./Navbar";
import React from "react";
import HeaderMobile from "./HeaderMobile";
import Users from "../../commons/Users";
import { useSelector } from "react-redux";
import Aplicaciones from "../Aplicaciones";
import AddUser from "../../commons/AddUser";

const ContentMobile = () => {
    const views = useSelector((state) => state.views);
    return (
        <Stack bgcolor="#3D3D3D" flex={1} paddingBottom={0} marginBottom={0} height="100%">
            <Navbar />
            <Stack id="soyStack" direction="column" spacing={1} paddingBottom={0} marginBottom={0} height="95%" justifyContent="space-between">
                {views === "profile" ? <HeaderMobile /> : <div></div>}

                <Paper
                    elevation={3}
                    sx={{
                        flexDirection: "column",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                        minHeight: views === "profile" ? 200: "100%"
                    }}
                >
                    {views === "usuariosFinales" && (
                        <Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}>
                            <AddUser />
                        </Box>
                    )}
                    {(views === "profile" || views === "usuariosFinales") && <Users />}
                    {views === "aplicaciones" && <Aplicaciones />}
                </Paper>
            </Stack>
        </Stack>
    );
};

export default ContentMobile;
