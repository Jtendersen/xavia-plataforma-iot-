import React from "react";
import { Box, Paper, Grid } from "@mui/material";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import dataTest from "../assets/tesla.json";
import Map from "../commons/Map";

//Enviar el user.devices al mapeo, cuando sepamos el formato correcto
const UserProfile = () => {
  return (
   <Map dataTest={dataTest}/>
  );
};

export default UserProfile;
