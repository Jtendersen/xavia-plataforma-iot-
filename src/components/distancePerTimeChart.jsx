import React, { useEffect, useState } from "react";
import { distanceDataSet } from "../utils/distanceDataSet.js";
import { Bar } from "react-chartjs-2";
import { Box, Stack } from "@mui/material";
import Chart from "chart.js/auto"; // no borrar
import ChartFilter from "./Charts/ChartFilter.jsx";
import { useSelector } from "react-redux";

const DistancePerTimeChart = () => {

    // redux store
    const measures = useSelector((state) => state.measures);

    // local states
    const [userData, setUserData] = useState(false);
    const [dataSet, setDataSet] = useState(false);

    useEffect(() => {
        const newDataSet = measures ? distanceDataSet(measures) : [];
        setDataSet(newDataSet);
        setUserData({
            labels: newDataSet.map((datos) => datos.time),
            datasets: [
                {
                    label: "Recorridos [m/min]",
                    data: newDataSet.map((datos) => datos.distance),
                    backgroundColor: "#3300B8",
                    borderColor: "black",
                    borderWidth: 1,
                },
            ],
        });
    }, [measures]);
    if (userData) {
        return (
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-around"
                alignItems="center"
                spacing={{ xs: 1, sm: 2 }}
            >
                <Box width={700}>
                    <Bar data={userData} />
                </Box>
                <Box>
                    <ChartFilter {...dataSet} />
                </Box>
            </Stack>
        );
    } else {
        <></>;
    }
};

export default DistancePerTimeChart;
