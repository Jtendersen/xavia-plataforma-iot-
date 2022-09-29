import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import { Box } from '@mui/system';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "border-radius: 45px",
  boxShadow: 24,
  p: 4,
};




const TimeOfUsePie = ({measures}) => {
  let restingTime=14
  let workingTime=10

  // Array.isArray(measures.cycles)&& measures.cycles.map((e)=>{
  //   if(e.distanceMeters!==0){workingTime+=e.timeMinutes}
  //   else if (e.distanceMeters===0){restingTime+=e.timeMinutes}
  // })
  const data = {
    labels: [
      'en uso',
      'en reposo'
    ],
    datasets: [{
      label: 'Tiempo de uso',
      data: [restingTime,workingTime],
      backgroundColor: [
        'rgb(51, 0, 184)',
        'rgb(173, 153, 227)'
      ],
      hoverOffset: 4
    }]
  };

  
  return (
  
    <Doughnut data={data}/>
  
  )
}

export default TimeOfUsePie