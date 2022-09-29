import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Map from "../commons/Map";

const Ubicaciones = () => {
  
  const devices = useSelector((state) => state.devices);
  const measures = useSelector((state) => state.measures);
  const user = useSelector((state) => state.user);


  const mapStyle = {
    justifyContent: "center",
    maxHeight: 600,
    width: "100%"
  };

  return (
    <>
       <Typography align="center" variant="h6">
        Ubicaciones
      </Typography> 
      <Typography align="center" variant="subtitle2">
      ({user.devices?.length} dispositivos)
      </Typography>
      {devices ? (
        <>{<Map measures={measures} mapStyle={mapStyle} />}</>
      ) : (
        <Typography align="center">No hay dispositivos registrados</Typography>
      )}
    </>
  );
};

export default Ubicaciones;
