import { adminDeleteUser } from "../store/reducers/usersAll.reducer";
import { useDispatch } from "react-redux";
import { Dialog, IconButton } from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import KeepMountedModal from "./Modal";

// Botones del dashboard por usuario
// recibe params de la fila y algunos estados
const UserActions = ({ params, deleteAction, setDeleteAction }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const deleteUser = (userId) => {
    dispatch(adminDeleteUser(userId)).then(() => {
      if (deleteAction) {
        setDeleteAction(false);
      } else {
        setDeleteAction(true);
      }
    });
  };

  // state intermedio para renderizar KeepMountedModal
  const showModal = () => {
    setShow(true);
  };

  return (
    <>
      <Box>
        <IconButton onClick={() => showModal()}>
          <AddSharpIcon />
        </IconButton>

        <IconButton>
          <SearchIcon />
        </IconButton>

        <IconButton onClick={() => deleteUser(params.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* render condicional que se activa al clickear el ícono añadir */}
      {show ? (
        <Dialog open={show}>
          <KeepMountedModal userParams={params.id} {...{ show, setShow }} />
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserActions;
