import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import SearchBar from "../commons/Search";
import Users from "./Users";

const Content = () => {
    return (
        <Box bgcolor="#EAE1D8" flex={8} p={2}>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    display: { xs: "none", sm: "flex" },
                    flexDirection: "column",
                    borderRadius: "16px",
                }}
            >
                <Users />
            </Paper>

            {/* version mobile */}
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    display: { sm: "none" },
                    flexDirection: "column",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <Typography variant="h6">Usuarios finales</Typography>
                <SearchBar />
                <Users />
            </Paper>
        </Box>
    );
};

export default Content;
