import { Box } from "@mui/system";
import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const LoadingScreen = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "auto",
                backgroundColor: "#3D3D3D",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <PacmanLoader color="#EAE1D8" size={35} />
        </Box>
    );
};

export default LoadingScreen;