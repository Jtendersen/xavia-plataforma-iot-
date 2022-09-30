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
import PolylinesFilter from "../commons/PolylinesFilter";
import useMatches from "../hooks/useMatches";
import LocationOnIcon from "@mui/icons-material/LocationOn";
function ChangeView({ centerM, zoomM }) {
  const map = useMap();
  map.setView(centerM, zoomM);
  return null;
}

function Map({ devices, mapStyle, histoTrue }) {
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

  //filtering polylines
  const match = useMatches();
  const loggedUser = useSelector((state) => state.user);
  const measuresChart = useSelector((state) => state.chart);
  // local states
  const [userData, setUserData] = useState(false);
  const [dataSet, setDataSet] = useState(false);  

  console.log("Chart", measuresChart)
  const polylines = 
  Array.isArray(measuresChart)
    ? measuresChart?.map((e, index) => ([e.DevEUI_uplink.LrrLAT,e.DevEUI_uplink.LrrLON]))
    : [];
  console.log("polylines", polylines)
  
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
            height: "2rem",
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
            {data[0]?
            <ChangeView
              centerM={[
                data[0]?.DevEUI_uplink?.LrrLAT,
                data[0]?.DevEUI_uplink?.LrrLON,
              ]}
              zoomM="25"
            />:<></>}


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
         {polylines.length >0 ? (
          <>
          <Polyline pathOptions={{ color: "purple" }} positions={polylines} />
{/*           {polylines[0].lat?
          <ChangeView centerM={polylines[0]} zoomM="25" />:<></>
          } */}
          </>
        ) : (
          <></>
        )} 
      </MapContainer>
      
        {histoTrue?
      <Grid container justify="flex-start">
          <PolylinesFilter {...dataSet} />  
      </Grid>:<></>}
    </Grid>
  );
}

export default Map;
