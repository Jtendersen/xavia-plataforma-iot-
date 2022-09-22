import React, { useEffect, useState } from "react";
import { distanceDataSet } from "../utils/distanceDataSet.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import Chart from "chart.js/auto"; // no borrar
import axios from "axios";


const DistancePerTimeChart = () => {

    const [userData, setUserData] = useState(false);
    
    useEffect(() => {
        // sería bueno limitar la vista en caso de que hayan muchas entradas
        // esto debería ser algo similar a pagination y querys
        // para hacerlo debo tener pedidos axios dentro de funciones que vaya a ejecutar


        // mientras tanto tengo esto que me trae todo:
        axios.get("/api/measures/all").then(({ data }) => {
            console.log("data: ", data)
            const newDataSet = distanceDataSet(data);
            setUserData({
                labels: newDataSet.map((datos) => datos.time),
                datasets: [
                    {
                        label: "Recorridos [m/min]",
                        data: newDataSet.map((datos) => datos.distance),
                        backgroundColor: "#F66253",
                        borderColor: "black",
                        borderWidth: 1,
                    },
                ],
            });
        });
    }, []);

    if (userData) {
        return (
            <Box width={700}>
                <Bar data={userData} />
            </Box>
        );
    } else {
        <></>;
    }
};

export default DistancePerTimeChart;



