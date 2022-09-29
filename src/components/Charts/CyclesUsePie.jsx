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




const CyclesUsePie = ({measures}) => {

let areas = measures.map((e)=>e.area.join("-"))
const counts = {};
areas.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
let labels=[]
let results = []

for (const property in counts) {
labels.push(property)
results.push(counts[property])
}



  const data = {
    labels,
    datasets: [{
      label: 'Tiempo de uso',
      data: results,
      backgroundColor: [
        'rgb(51, 0, 184)',
        'rgb(173, 153, 227)',
        'rgb(133, 102, 212)',
        'rgb(92, 51, 198)'
        
          ],
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
                            spacing={1}>
                            {labels.map((e,i)=>
                            { return  <Box key={i} sx={{fontWeight: 'bold','&:hover': {opacity: [0.9, 0.8, 0.7]}}}>
                            <Box sx={{py:1,fontWeight: 'bold'}}>{e}</Box>
                            <Typography>{results[i]}</Typography>
                            </Box>
                            })}
                            </Stack>
                        </Grid>
                    </Grid>
   
                    
  
    
  )
}

export default CyclesUsePie