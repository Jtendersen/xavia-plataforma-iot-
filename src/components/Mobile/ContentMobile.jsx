import { Box, Paper, Stack } from "@mui/material";
import Navbar from "./Navbar";
import React from "react";
import HeaderMobile from "./HeaderMobile";
import Users from "../../commons/Users";
import { useSelector } from "react-redux";

const ContentMobile = () => {
    const views = useSelector((state) => state.views);
    return (
        <Box bgcolor="#3D3D3D" flex={8} paddingBottom={0} marginBottom={0}>
            <Navbar />
            <Stack
                direction="column"
                spacing={1}
                paddingBottom={0}
                marginBottom={0}
                justifyContent="space-between"
            >
                {views === "profile" ? <HeaderMobile /> : <></>}
                <Paper
                    elevation={3}
                    sx={{
                        flexDirection: "column",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        paddingBottom: 0,
                        marginBottom: 0
                    }}
                >
                    {views === "profile" || views === "usuariosFinales" ? (
                        <Users />
                    ) : (
                        <></>
                    )}
                </Paper>
            </Stack>
        </Box>
    );
};

export default ContentMobile;
