import L from 'leaflet';
import React from "react";
import Icon from './icon';

let markerColour;

const CstMarkers = (colour) => {
   
switch (colour){
    case 'r':
    markerColour = '#f44336';
    break;
    case 'b':
    markerColour = '#2986cc';
        break;
}

 const markerHtmlStyles = `
  background-color: ${markerColour};
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 1rem 1rem 0;
  transform: rotate(45deg);
  border: 2px solid #FFFFFF`

return L.divIcon({
  className: "my-custom-pin",
  iconAnchor: [0, 24],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  html: `<span style="${markerHtmlStyles}" />`
})
};

export { CstMarkers };