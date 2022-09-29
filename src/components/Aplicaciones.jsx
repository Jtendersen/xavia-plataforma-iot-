import { Box } from "@mui/material";
import React from "react";
import BatteryUsageChart from "./BatteryUsageChart";
import DistancePerTimeChart from "./Charts/distancePerTimeChart";
import DashboardContent from "./Desktop/Dashboard";

const Aplicaciones = () => {

  return (
    <>
  <DashboardContent/>
      {/* <Box>
        <DistancePerTimeChart />
      </Box>
      <Box>
        <BatteryUsageChart />
      </Box> */}
    </>
  );

};


export default Aplicaciones;
