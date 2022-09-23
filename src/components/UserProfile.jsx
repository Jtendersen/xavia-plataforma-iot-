import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Map from "../commons/Map";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDevices } from "../store/reducers/deviceMeasures.reducer";
import { getToMarker } from "../store/reducers/mapMarker.reducer";
import { Link } from "@mui/material";
import Typography from "@mui/material/Typography";

const UserProfile = () => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);
  const user = useSelector((state) => state.user);
  const toMarker = useSelector((state) => state.toMarker);
  const handleClickCoords = (coords) => {
    dispatch(getToMarker(coords));
  };
  const mapStyle = {
    justifyContent: "center",
    height: "100%",
    width: "70%",
    padding: "15%",
  };

  useEffect(() => {
    dispatch(getDevices(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 1 },
    { field: "name", headerName: "Nombre", minWidth: 140, flex: 1 },
    {
      field: "lastlat",
      headerName: "Ultima Medición (Lat)",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "lastlon",
      headerName: "Ultima Medición (Lon)",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "lastmed",
      headerName: "Ultima Medición (fecha)",
      minWidth: 160,
      flex: 1,
      renderCell: (params) => (
        <Link
          href="#"
          underline="hover"
          onClick={() => {
            handleClickCoords([params.row.lastlat, params.row.lastlon]);
          }}
        >
          <div>
            <Typography sx={{ fontSize: "0.7rem" }}>{params.value}</Typography>
          </div>
        </Link>
      ),
    },
    { field: "added", headerName: "Agregado el:", minWidth: 160, flex: 1 },
  ];
  console.log("this is devices", devices);
  const rows = Array.isArray(devices)
    ? devices?.map((e) => ({
        id: e.qrCode,
        name: e.typeOfDevice,
        lastlat: e.measures.length
          ? e.measures[0][e.measures[0].length - 1].payload[0].latitude
          : "-",
        lastlon: e.measures.length
          ? e.measures[0][e.measures[0].length - 1].payload[0].longitude
          : "-",
        lastmed: e.measures.length
          ? Date(e.measures[0][e.measures[0].length - 1].createdAt)
          : "-",
        added: Date(e.createdAt),
      }))
    : [];

  return (
    <>
      {devices ? (
        <>
          {<Map devices={devices} mapStyle={mapStyle} />}
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              sx={{ fontSize: "0.7rem" }}
              autoPageSize
              rows={rows}
              columns={columns}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserProfile;
