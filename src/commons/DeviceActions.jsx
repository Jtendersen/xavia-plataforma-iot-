import { useDispatch } from "react-redux";
import { Button, Dialog, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import axios from "axios";

// Botones del dashboard por usuario
// recibe params de la fila y algunos estados
const DeviceActions = ({ params, confirmEmpty, setConfirmEmpty, confirmDelete, setConfirmDelete }) => {
    const dispatch = useDispatch();
    const [showEmpty, setShowEmpty] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const emptyDevice = (name) => {
        setShowEmpty(true);
    };

    const deleteDevice = (id) => {
        setShowDelete(true);
    };

    const handleClose = () => {
        setShowDelete(false);
        setShowEmpty(false);
    };

    useEffect(() => {
        if (confirmDelete) {
            // axios.delete(`http://localhost:3001/api/device/delete/${params.id}`).then(() => {
            //     setShowDelete(false);
            //     setConfirmDelete(false);
            // });
        } 
        if (confirmEmpty) {
            // axios.delete(`http://localhost:3001/api/measures/delete/${params.row.name}`).then(() => {
                
            //     setShowEmpty(false);
            //     setConfirmEmpty(false);
            // });
        }
    }, [confirmDelete, confirmEmpty, params.id, params.row.name, setConfirmDelete, setConfirmEmpty]);

    return (
        <>
            <Box>
                <IconButton>
                    <PlaylistRemoveIcon onClick={() => emptyDevice(params.row.name)} />
                </IconButton>

                <IconButton onClick={() => deleteDevice(params.id)}>
                    <DeleteIcon />
                </IconButton>
            </Box>

            {/* render condicional que se activa al clickear el ícono añadir */}
            {showEmpty && (
                <Dialog open={showEmpty} onClose={handleClose}>
                    <Box sx={{ padding: 2 }}>
                        <Typography> Confirmar o cancelar acción:</Typography>
                        <Button onClick={() => setConfirmEmpty(true)}>Confirmar</Button>
                        <Button onClick={() => handleClose()}>Cancelar</Button>
                    </Box>
                </Dialog>
            )}
            {showDelete && (
                <Dialog open={showDelete} onClose={handleClose}>
                    <Box sx={{ padding: 2 }}>
                        <Typography> Confirmar o cancelar acción:</Typography>
                        <Button onClick={() => setConfirmDelete(true)}>Confirmar</Button>
                        <Button onClick={() => handleClose()}>Cancelar</Button>
                    </Box>
                </Dialog>
            )}
        </>
    );
};

export default DeviceActions;
