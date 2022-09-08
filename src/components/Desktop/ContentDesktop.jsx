import { Box, Paper } from "@mui/material";
import React from "react";
import Header from "../Header";
import Users from "./UsersDesktop";

const ContentDesktop = () => {
    return (
        <Box bgcolor="#EAE1D8" flex={8} p={2}>
            <Header />
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    flexDirection: "column",
                    borderRadius: "16px",
                }}
            >
                <Users />
            </Paper>
        </Box>
    );
};

export default ContentDesktop;
