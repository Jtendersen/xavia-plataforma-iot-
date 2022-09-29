import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import { Box,Stack} from '@mui/system';
import { Grid,Typography, Divider  } from '@mui/material';


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
  

  const distanciaRecorrida = measures.reduce(function (acc, obj){return acc + obj.distanceMeters},0)
    const velocidadPromedio = measures.reduce(function (acc, obj){return acc + obj.timeMinutes},0)/distanciaRecorrida

  let restingTime=0
  let workingTime=0

  measures[0]&&measures.map((e)=>{
    if(e.distanceMeters!==0){workingTime+=e.timeMinutes}
    else if (e.distanceMeters===0){restingTime+=e.timeMinutes}
  })

  const data = {
    labels: [
      'en uso',
      'en reposo'
    ],
    datasets: [{
      label: 'Tiempo de uso',
      data: [workingTime/60,restingTime/60],
      backgroundColor: [
        'rgb(173, 153, 227)',
        'rgb(51, 0, 184)'      ],
      hoverOffset: 4
    }]
  };

  
  return (
   
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6} lg={6}>
                          <Box sx= {{p:1}}>
                          <Doughnut data={data}/>
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                          <Stack  divider={<Divider orientation="horizontal" flexItem />}
                            spacing={2}>
                            <Box sx={{p:2,fontWeight: 'bold','&:hover': {opacity: [0.9, 0.8, 0.7]}}}>
                            <Box sx={{py:1,fontWeight: 'bold'}}>Velocidad promedio</Box>
                            <Typography>{Math.ceil(velocidadPromedio)+ 'm/m'}</Typography>
                            </Box>
                            <Box sx={{p:2, '&:hover': {opacity: [0.9, 0.8, 0.7]}}}>
                            <Box sx={{py:1,fontWeight: 'bold'}}>Distancia recorrida</Box>
                            <Typography>{Math.ceil(distanciaRecorrida)+"m"}</Typography>
                            </Box>
                          </Stack>
                        </Grid>
                    </Grid>
  
    
  )
}

export default TimeOfUsePie