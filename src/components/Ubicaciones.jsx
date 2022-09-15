import React from "react";
import dataTest from "../assets/tesla.json";
import Map from "../commons/Map";

const mapStyle= {
    justifyContent: "center",
    height: "45vh",
    width: "70%",
    padding: "15%",
  }
const Ubicaciones = () => {
    return (
       <Map dataTest={dataTest} mapStyle={mapStyle}/>
       )
};

export default Ubicaciones;
