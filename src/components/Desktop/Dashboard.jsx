import * as React from 'react';
import { Stack, Divider, Box, Typography, Container, Grid, Paper } from '@mui/material';
import { grey } from '@mui/material/colors';
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

import { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import TimeOfUsePie from '../../commons/TimeOfUsePie';





function DashboardContent() {

  const dispatch = useDispatch();
  const measures = useSelector((state) => state.measures);
  const bateria = "76%"
  const temperatura = "78C"


  //<TimeOfUsePie measures={measures}/>

  return (
      
       <Box sx={{ display: 'flex' }}>
       
          <Container  maxWidth= "false" sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={2}>
            
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                elevation={3}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 360,
                  }}
                > 
                 <Box sx={{p:1, fontWeight: 'bold'}}>Uso diario</Box>
                  <Divider orientation="horizontal" flexItem />
                </Paper>
              </Grid>
          
              {/* Bateria */}
              <Grid item xs={12} md={4} lg={3}>
                <Stack spacing={2}>
                  <Paper
                  elevation={3}
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 155,
                    }}
                  >
                    <Box sx={{p:1, fontWeight: 'bold'}}>Bateria</Box>
                    <Divider orientation="horizontal" flexItem />
                    <Box sx={{p:3, textAlign: 'center', fontSize: 56, color:grey.A700,'&:hover': {opacity: [0.9, 0.8, 0.7]},fontWeight: 'bold'}}>{bateria}</Box>
                  </Paper>

                  {/* Temperatura */}
                  <Paper
                elevation={3}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 155,
                  }}
                >
                    <Box sx={{p:1, fontWeight: 'bold'}}>Temperatura</Box>
                    <Divider orientation="horizontal" flexItem />
                    <Box sx={{p:3, textAlign: 'center', fontSize: 56, color:grey.A700,'&:hover': {opacity: [0.9, 0.8, 0.7]},fontWeight: 'bold'}}>{temperatura}</Box>
                  </Paper>
                </Stack>
              </Grid>

                {/* ciclos de trabajo */}
              <Grid item xs={12} md={12} lg={6}>
                  <Paper
                  elevation={3}
                  sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
                    
                    <Box sx={{p:1, fontWeight: 'bold'}}>Ciclos de trabajo</Box>
                    <Divider orientation="horizontal" flexItem />
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6} lg={6}>
                          <Box sx= {{p:1}}>
                            <TimeOfUsePie measures={measures}/>
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                          <Stack  divider={<Divider orientation="horizontal" flexItem />}
                            spacing={1}>
                            <Box sx={{fontWeight: 'bold','&:hover': {opacity: [0.9, 0.8, 0.7]}}}>
                            <Box sx={{py:1,fontWeight: 'bold'}}>Area1-Area2</Box>
                            <Typography>150</Typography>
                            </Box>
                            <Box sx={{ '&:hover': {opacity: [0.9, 0.8, 0.7]}}}>
                            <Box sx={{py:1,fontWeight: 'bold'}}>Area1-Area2</Box>
                            <Typography>39</Typography>
                            </Box>
                            <Box sx={{fontWeight: 'bold','&:hover': {opacity: [0.9, 0.8, 0.7]}}}>
                            <Box sx={{py:1,fontWeight: 'bold'}}>Area1-Area2</Box>
                            <Typography>87</Typography>
                            </Box>
                           
                          </Stack>
                        </Grid>
                    </Grid>
                </Paper>
               </Grid>
              
              {/* tiempos de uso */}
              <Grid item xs={12} md={12} lg={6}>
                  <Paper
                  elevation={3}
                  sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
                    {/* <Orders /> */}
                    <Box sx={{p:1, fontWeight: 'bold'}}>Tiempo de uso</Box>
                    <Divider orientation="horizontal" flexItem />
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6} lg={6}>
                          <Box sx= {{p:1}}>
                            <TimeOfUsePie measures={measures}/>
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                          <Stack  divider={<Divider orientation="horizontal" flexItem />}
                            spacing={2}>
                            <Box sx={{p:2,fontWeight: 'bold','&:hover': {opacity: [0.9, 0.8, 0.7]}}}>
                            <Box sx={{py:1,fontWeight: 'bold'}}>Velocidad promedio</Box>
                            <Typography>10m/m</Typography>
                            </Box>
                            <Box sx={{p:2, '&:hover': {opacity: [0.9, 0.8, 0.7]}}}>
                            <Box sx={{py:1,fontWeight: 'bold'}}>Distancia recorrida</Box>
                            <Typography>10km</Typography>
                            </Box>
                          </Stack>
                        </Grid>
                    </Grid>
                </Paper>
               </Grid>
              
              
            </Grid>
          </Container>
        
      </Box>
    
  );
}


export default DashboardContent