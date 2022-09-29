import { useRef, React } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { MapContainer, TileLayer, useMap, Marker, Popup, Circle } from "react-leaflet";
import L, { LatLng, latLngBounds, FeatureGroup } from "leaflet";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  CstMarkers } from "./MarkerIcon";
function ChangeView({ centerM, zoomM }) {
  const map = useMap();
  map.setView(centerM, zoomM);
  return null;
}

function Map({ devices, mapStyle }) {
  const toMarker = useSelector((state) => state.toMarker);
  function GetBounds() {
    const map = useMap(); //get native Map instance
    let markerBounds = latLngBounds([]);
    //const group = this.groupRef.current.leafletElement; //get native featureGroup instance
    //map.fitBounds(groupRef.current.getBounds())
    // map.fitBounds(markerBounds);
    // return null;
    let group = new FeatureGroup();
    markerBounds.forEach((marker) => {
      L.marker([marker.lat, marker.lon]).addTo(group);
    });
    map.fitBounds(group.getBounds());
  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "30vh" }}
    >
      {/* <button onClick={GetBounds}>Zoom</button> */}

      <MapContainer
        style={mapStyle}
        center={[-34.603, -58.381]}
        zoom={10}
        scrollWheelZoom={true}
      >      {/* <Box
      sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'right',
          zIndex: 1000
      }}
  ><Typography display="block" sx={{backgroundColor: "blue"}}>Última Posición<br></br> </Typography>
  <Typography display="block"  sx={{backgroundColor: "red"}}>Posición Seleccionada</Typography></Box> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* reemplazar con user.devices, cuando sepamos exactamente donde estan las coords (lat/lng)*/}

        {devices?.map((data) => (
          <Marker
            icon= {CstMarkers('b')}
            key={data[0]?._id}
            position={
              data.length
                ? [
                  //e[0].DevEUI_uplink.LrrLAT
                    data[0].DevEUI_uplink.LrrLAT,
                    data[0].DevEUI_uplink.LrrLON,
                      
                    // data.measures[0][data.measures[0].length - 1].payload[0].longitude,
                  ]
                : [0, 0]
            }
          >
          {/*   <Popup>Última Posición: <br /> {data[0].DevEUI_uplink.DevEUI}</Popup> */}
            {}
          </Marker>
        ))}
        {toMarker ? (
          <Marker icon= {CstMarkers('r')} key="click" position={toMarker}>
            <Popup>Posición seleccionada:  <br />{toMarker}</Popup>
            <ChangeView centerM={toMarker} zoomM="25" />
          </Marker>
        ) : (
          <></>
        )}
      </MapContainer>
    </Grid>
  );
}

export default Map;
