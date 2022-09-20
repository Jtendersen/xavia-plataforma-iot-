import React from "react";
import { useSelector } from "react-redux";
import Map from "../commons/Map";

const mapStyle = {
  justifyContent: "center",
  height: "45vh",
  width: "70%",
  padding: "15%",
};
const Ubicaciones = () => {
  const devices = useSelector((state) => state.devices);

  return (
    <>
      {devices ? <>{<Map devices={devices} mapStyle={mapStyle} />}</> : <></>}
    </>
  );
};

export default Ubicaciones;
