import { Box } from "@mui/material";
import React from "react";
import DistancePerTimeChart from "./distancePerTimeChart";

const Aplicaciones = () => {
    return (
        <Box sx={{ maxWidth: "90%", maxHeight: "90%" }}>
            <DistancePerTimeChart />
        </Box>
    );
};

export default Aplicaciones;
