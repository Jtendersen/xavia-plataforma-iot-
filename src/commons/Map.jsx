import { useRef, React } from "react";
import { Grid, Box, Typography } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Circle,
  Polyline
} from "react-leaflet";
import L, { LatLng, latLngBounds, FeatureGroup } from "leaflet";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CstMarkers } from "./MarkerIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
function ChangeView({ centerM, zoomM }) {
  const map = useMap();
  map.setView(centerM, zoomM);
  return null;
}

function Map({ devices, mapStyle }) {
  const toMarker = useSelector((state) => state.toMarker);

  // function GetBounds() {
  //   const map = useMap(); //get native Map instance
  //   let markerBounds = latLngBounds([]);
  //   let group = new FeatureGroup();
  //   markerBounds.forEach((marker) => {
  //     L.marker([marker.lat, marker.lon]).addTo(group);
  //   });
  //   map.fitBounds(group.getBounds());
  // }

  const polylin = [
    [-34.603, -58.591],
    [-34.703, -58.981],
    [-34.773, -58.781],
    [-34.603, -58.591],
  ]

  
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
        {" "}
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "right",
            zIndex: 1000,
            height: "2rem"
          }}
        >
          <LocationOnIcon color="primary" />
          <Typography display="block">
            Última Posición<br></br>{" "}
          </Typography>
          <LocationOnIcon sx={{ color: "red" }} />
          <Typography display="block">Posición Seleccionada</Typography>
        </Box>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {devices?.map((data) => (
          <Marker
            icon={CstMarkers("b")}
            key={data[0]?._id}
            position={
              data.length
                ? [data[0].DevEUI_uplink.LrrLAT, data[0].DevEUI_uplink.LrrLON]
                : [0, 0]
            }
          >
            <Popup sx={{ zIndex: 2000 }}>
              Última Posición: <br /> {data[0]?.DevEUI_uplink.DevEUI}
            </Popup>

            <ChangeView
              centerM={[
                data[0]?.DevEUI_uplink.LrrLAT,
                data[0]?.DevEUI_uplink.LrrLON,
              ]}
              zoomM="25"
            />
          </Marker>
        ))}
        {toMarker ? (
          <Marker icon={CstMarkers("r")} key="click" position={toMarker}>
            <Popup>
              Posición seleccionada: <br />
              {toMarker}
            </Popup>
            <ChangeView centerM={toMarker} zoomM="25" />
          </Marker>
        ) : (
          <></>
        )}
      {polylin? 
         <Polyline pathOptions={ {color: 'purple' }} positions={polylin} />:<></>} 
      </MapContainer>
    </Grid>
  );
}

export default Map;
