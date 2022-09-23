import L from 'leaflet';
import React from "react";
import Icon from './icon';

const clickedMarker = new L.Icon({
    iconUrl: require("../assets/gps.png"),    
    iconRetinaUrl: require("../assets/gps.png"),    
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { clickedMarker };