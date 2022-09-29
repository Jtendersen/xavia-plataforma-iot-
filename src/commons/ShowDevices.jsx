import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LinearProgress, Paper, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import QrScanner from "./QrScanner";
import qr from "../assets/exampleQR.png";
import Image from "mui-image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setQrCode } from "../store/reducers/deviceQrCode.reducer";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { getDevices } from "../store/reducers/deviceMeasures.reducer";
import { getMeasures } from "../store/reducers/getAllMeasures.reducer";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "border-radius: 45px",
    boxShadow: 24,
    p: 4,
};

const stackStyle = {
    direction: "column",
    spacing: 1,
    paddingBottom: 0,
    marginBottom: 0,
    height: "100%",
    justifyContent: "space-between",
};

export default function ShowDevices({ userParams, showDevices, setShowDevices }) {
    const dispatch = useDispatch();
    const measures = useSelector((state) => state.measures);
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
        setShowDevices(false);
    };

    React.useEffect(() => {
        dispatch(getDevices(userParams));
        dispatch(getMeasures({ entries: 0, user: userParams }));
    }, [dispatch, userParams]);

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
            field: "mode",
            headerName: "Modo",
            minWidth: 160,
            flex: 1,
        },
    ];

    const rows = Array.isArray(measures)
        ? measures?.map((e, index) => ({
              id: e.length ? e[index]._id : "-",
              name: e.length ? e[index].DevEUI_uplink.DevEUI : "-",
              lastlat: e.length ? e[0].DevEUI_uplink.LrrLAT : "-",
              lastlon: e.length ? e[0].DevEUI_uplink.LrrLON : "-",
              mode: e.length ? e[0].DevEUI_uplink.payload.deviceConfiguration?.mode : "-",
          }))
        : [];
    return (
        <>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="kitleeep-mounted-modal-t"
                aria-describedby="keep-mounted-modal-description"
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        flexDirection: "column",
                        borderRadius: "16px",
                    }}
                >
                    {measures ? (
                        <div style={{ height: 250, width: "100%" }}>
                            <DataGrid sx={{ fontSize: "0.7rem" }} rows={rows} columns={columns} />
                        </div>
                    ) : (
                        <Typography align="center">No hay dispositivos registrados</Typography>
                    )}
                    3
                </Paper>
            </Modal>
        </>
    );
}
