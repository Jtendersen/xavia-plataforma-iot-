import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Map from "../commons/Map";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDevices } from "../store/reducers/deviceMeasures.reducer";
import { getToMarker } from "../store/reducers/mapMarker.reducer";
import { Link, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import useMatches from "../hooks/useMatches";
import { getMeasures } from "../store/reducers/getAllMeasures.reducer";

const UserProfile = () => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);
  const measures = useSelector((state) => state.measures)
  const user = useSelector((state) => state.user);
  const toMarker = useSelector((state) => state.toMarker);
  const match = useMatches()
  const handleClickCoords = (coords) => {
    dispatch(getToMarker(coords));
  };

  const mapStyle = {
    justifyContent: "center",
    maxHeight: 250,
    width: "100%",
  };

  const stackStyle = {
    direction:"column",
    spacing: 1,
    paddingBottom: 0,
    marginBottom: 0,
    height: "100%",
    justifyContent: "space-between"
  }

  useEffect(() => {
    dispatch(getDevices(user._id));
    dispatch(getMeasures({entries: 0, user: user._id}));
  }, []);

  const columns = [
   /*  { field: "id", headerName: "Id", minWidth: 150, flex: 1 }, */
    { field: "name", headerName: "DevEUI", minWidth: 140, flex: 1 },
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
    {
      field: "mode",
      headerName: "Modo",
      minWidth: 160,
      flex: 1,
    },
/*     { field: "added", headerName: "Agregado el:", minWidth: 160, flex: 1 }, */
  ];
  
  const rows = Array.isArray(measures)
    ? measures?.map((e, index) => (
/*       {
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
      }
      */
      {
        id: e.length
        ? e[index]._id:"-",
        name: e.length
        ? e[index].DevEUI_uplink.DevEUI:"-",
        lastlat: e.length
        ? e[0].DevEUI_uplink.LrrLAT
        : "-",
        lastlon: e.length
        ? e[0].DevEUI_uplink.LrrLON
        : "-",
        lastmed: e.length
        ? e[0].DevEUI_uplink.Time
        : "-",
        mode: e.length
        ? e[0].DevEUI_uplink.payload.deviceConfiguration?.mode
        : "-"

       //.DevEUI_uplink.payload.deviceConfiguration.mode,

      }
      ))
    : [];
  return (
    <Stack sx={{stackStyle}}>
      {measures? (
        <>
          {<Map devices={measures} mapStyle={mapStyle} />}
          <div style={{ height: 250, width: "100%" }}>
            <DataGrid
              sx={{ fontSize: "0.7rem" }}
              autoPageSize
              rows={rows}
              columns={columns}
            />
          </div>
        </>
      ) : (
        <Typography align="center">No hay dispositivos registrados</Typography>
      )}
    </Stack>
  );
};

export default UserProfile;
