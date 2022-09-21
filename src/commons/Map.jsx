import React from "react";
import { Grid } from "@mui/material";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
//import dataTest from "../assets/tesla.json"

function Map({ dataTest, mapStyle }) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "30vh" }}
    >
      <MapContainer
        style={mapStyle}
        center={[-34.603, -58.381]}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* reemplazar con user.devices, cuando sepamos exactamente donde estan las coords (lat/lng)*/}
        {dataTest?.map((data) => (
          <Marker
            key={data.id}
            position={[data.gps.latitude, data.gps.longitude]}
          ></Marker>
        ))}
      </MapContainer>
    </Grid>
  );
}

export default Map;
