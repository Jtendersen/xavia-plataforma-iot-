import { IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { adminDeleteUser } from "../store/reducers/usersAll.reducer";

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
                <CreateIcon />
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
