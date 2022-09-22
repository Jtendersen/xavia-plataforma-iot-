import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Map from "../commons/Map";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

const Historico = () => {
  const devices = useSelector((state) => state.devices);
  const user = useSelector((state) => state.user);

  const mapStyle = {
    justifyContent: "center",
    height: "100%",
    width: "70%",
    padding: "13.8%",
  };

  const columns = [
    { field: "qr", headerName: "Qr", minWidth: 150, flex: 1 },
    { field: "name", headerName: "Nombre", minWidth: 140, flex: 1 },
    {
      field: "histodate",
      headerName: "Historico (Fecha)",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "histocoord",
      headerName: "Historico (Posición)",
      minWidth: 160,
      flex: 1,
      renderCell: (params) => (
        <Link
          href="#"
          underline="hover"
          onClick={() => {
            console.info("coods:", params.value.lat, params.value.long);
          }}
        >
          <div>
            <Typography sx={{ fontSize: "0.7rem" }}>
              {params.value.lat}
            </Typography>
            <Typography sx={{ fontSize: "0.7rem" }}>
              {params.value.long}
            </Typography>
          </div>
        </Link>
      ),
    },
  ];

  var rows = Array.isArray(devices)
    ? [].concat.apply(
        [],
        devices?.map((e) => {
          return e.measures[0]?.map((m) => {
            return {
              id: m._id,
              qr: e.qrCode,
              name: e.typeOfDevice,
              histodate: m.createdAt,
              histocoord: {
                lat: m.payload[0].latitude,
                long: m.payload[0].longitude,
              },
            };
          });
        })
      )
    : [];

  return (
    <>
      {devices ? (
        <>
          <Typography align="center" variant="h6">
            Historico
          </Typography>
          {devices[0].measures[0] ? (
            <div>
              <Map devices={devices} mapStyle={mapStyle} />

              <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                  sx={{ fontSize: "0.7rem" }}
                  rows={rows}
                  columns={columns}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "histodate", sort: "desc" }],
                    },
                  }}
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                height: 100,
                width: "100%",
              }}
            >
              <Typography align="center">
                "No hay mediciones registradas"
              </Typography>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Historico;
