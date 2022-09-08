import { Box, Paper } from "@mui/material";
import React from "react";
import UsersMobile from "./UsersMobile";

const ContentMobile = () => {
    return (
        <Box bgcolor="#3D3D3D" flex={8} p={2}>
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
                <UsersMobile />
            </Paper>
        </Box>
    );
};

export default ContentMobile;
