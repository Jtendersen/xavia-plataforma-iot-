import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Map from "../commons/Map";


const mapStyle = {
  justifyContent: "center",
  height: "38vh",
  width: "70%",
  padding: "15%",
};
const Ubicaciones = () => {
  
  const devices = useSelector((state) => state.devices);
  const user = useSelector((state) => state.user);
  return (
    <>
      <Typography align="center" variant="h6">
        Ubicaciones
      </Typography>
      <Typography align="center" variant="subtitle2">
      ({user.devices?.length} dispositivos)
      </Typography>
      {devices ? (
        <>{<Map devices={devices} mapStyle={mapStyle} />}</>
      ) : (
        <Typography align="center">No hay dispositivos registrados</Typography>
      )}
    </>
  );
};

export default Ubicaciones;
