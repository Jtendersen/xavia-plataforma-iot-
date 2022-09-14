import { adminDeleteUser } from "../store/reducers/usersAll.reducer";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import KeepMountedModal from "./Modal";

// Botones del dashboard por usuario
// recibe params de la fila y algunos estados
const UserActions = ({ params, deleteAction, setDeleteAction }) => {
    const dispatch = useDispatch();

    const deleteUser = (userId) => {
        dispatch(adminDeleteUser(userId)).then(() => {
            if (deleteAction) {
                setDeleteAction(false);
            } else {
                setDeleteAction(true);
            }
        });
    };

    return (
        <Box>
            <IconButton>

                <KeepMountedModal userParams={params.id}/>

            </IconButton>

            <IconButton>
                <SearchIcon />
            </IconButton>

            <IconButton onClick={() => deleteUser(params.id)}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

export default UserActions;
