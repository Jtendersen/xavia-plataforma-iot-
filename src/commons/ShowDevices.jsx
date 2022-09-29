import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { getDevices } from "../store/reducers/deviceMeasures.reducer";
import { getMeasures } from "../store/reducers/getAllMeasures.reducer";
import DeviceActions from "./DeviceActions";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "90%",
    bgcolor: "background.paper",
    border: "border-radius: 45px",
    boxShadow: 24,
    p: 4,
};

export default function ShowDevices({ userParams, showDevices, setShowDevices }) {
    const dispatch = useDispatch();
    const measures = useSelector((state) => state.measures);
    const [open, setOpen] = React.useState(true);
    const [confirmEmpty, setConfirmEmpty] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        setShowDevices(false);
    };

    React.useEffect(() => {
        dispatch(getDevices(userParams));
        dispatch(getMeasures({ entries: 0, user: userParams }));
    }, [dispatch, userParams]);

    const columns = React.useMemo(
        () => [
            { field: "name", headerName: "DevEUI", minWidth: 140, flex: 0.3 },
            {
                field: "measures",
                headerName: "# Medidas",
                minWidth: 100,
                flex: 0.3,
            },
            {
                field: "_id",
                headerName: "Acciones",
                type: "actions",
                flex: 1,
                renderCell: (params) => <DeviceActions {...{ params, confirmEmpty, setConfirmEmpty, confirmDelete, setConfirmDelete }} />,
            },
        ],
        [confirmDelete, confirmEmpty]
    );

    const rows = Array.isArray(measures)
        ? measures?.map((e, index) => ({
              id: e.length ? e[index]._id : "-",
              name: e.length ? e[index].DevEUI_uplink.DevEUI : "-",
              measures: e.length ? e.length : "-",
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
                    style={style}
                >
                    {measures ? (
                        <div style={{ height: 400, width: "100%" }}>
                            <DataGrid sx={{ fontSize: "0.7rem" }} rows={rows} columns={columns} />
                        </div>
                    ) : (
                        <Typography align="center">No hay dispositivos registrados</Typography>
                    )}
                </Paper>
            </Modal>
        </>
    );
}
