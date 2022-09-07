import { Box, Paper } from "@mui/material";
import React from "react";
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
                    pt: 2,
                    display: { sm: "none" },
                    flexDirection: "column",
                    borderRadius: "16px",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <Users />
            </Paper>
        </Box>
    );
};

export default Content;
