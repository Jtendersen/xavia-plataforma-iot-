import { Box } from "@mui/material";
import React from "react";
import BatteryUsageChart from "./BatteryUsageChart";
import DistancePerTimeChart from "./Charts/distancePerTimeChart";

const Aplicaciones = () => {

  return (
    <>
      <Box>
        <DistancePerTimeChart />
      </Box>
      <Box>
      <DistancePerTimeChart />
      </Box>
      <Box>
      <DistancePerTimeChart />
      </Box>
    </>
  );

};


export default Aplicaciones;
