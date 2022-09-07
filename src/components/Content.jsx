import { Box, Paper } from "@mui/material";
import React from "react";
import Users from "./Users";

const Content = () => {
    return (
        <Box bgcolor="#EAE1D8" flex={8} p={2}>
            <Paper
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Users />
            </Paper>
        </Box>
    );
};

export default Content;
