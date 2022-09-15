import React from "react";
import { Box, Paper, Grid } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import dataTest from "../assets/tesla.json";
import Map from "../commons/Map";
import { useSelector } from "react-redux";

const UserProfile = () => {
const user = useSelector((state) => state.user);
const mapStyle= {  justifyContent: "center", height: "100%", width: "70%",  padding: "15%",}
const rows= [
  { id: 1, col1: 'Hardcode', col2: 'Hardcode' },
];

const columns = [
  { field: 'col1', headerName: 'Id', width: 150 },
  { field: 'col2', headerName: 'Nombre', width: 150 },
  { field: 'col3', headerName: 'Ultima Medición', width: 150 },
  { field: 'col4', headerName: 'Agregado el:', width: 150 }
];
//Enviar el user.devices al mapeo, cuando sepamos el formato correcto
  return (
    <>
   <Map dataTest={dataTest} mapStyle={mapStyle}/> 
   <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
   </>
  );
};

export default UserProfile;


