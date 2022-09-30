import { adminDeleteUser } from "../store/reducers/usersAll.reducer";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, IconButton } from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import KeepMountedModal from "./Modal";
import ShowDevices from "./ShowDevices";

// Botones del dashboard por usuario
// recibe params de la fila y algunos estados
const UserActions = ({ params, deleteAction, setDeleteAction }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [showAdd, setShowAdd] = useState(false);
    const [showDevices, setShowDevices] = useState(false);

    const deleteUser = (userId) => {
        dispatch(adminDeleteUser(userId)).then(() => {
            if (deleteAction) {
                setDeleteAction(false);
            } else {
                setDeleteAction(true);
            }
        });
    };

    const checkDevices = (userId) => {};

    // state intermedio para renderizar KeepMountedModal
    const showAddModal = () => {
        setShowAdd(true);
    };
    const showDevicesModal = () => {
        setShowDevices(true);
    };

    return (
        <>
            <Box>
                <IconButton onClick={() => showAddModal()}>
                    <AddSharpIcon />
                </IconButton>

                <IconButton>
                    <SearchIcon onClick={() => showDevicesModal()} />
                </IconButton>

                <IconButton onClick={() => deleteUser(params.id)}>
                    <DeleteIcon />
                </IconButton>
            </Box>

            {/* render condicional que se activa al clickear el ícono añadir */}
            {showAdd && (
                <Dialog open={showAdd}>
                    <KeepMountedModal userParams={params.id} {...{ showAdd, setShowAdd }} />
                </Dialog>
            )}
            {showDevices && (
                <Dialog open={showDevices}>
                    <ShowDevices userParams={params.id} {...{ showDevices, setShowDevices }} />
                </Dialog>
            )}
        </>
    );
};

export default UserActions;
