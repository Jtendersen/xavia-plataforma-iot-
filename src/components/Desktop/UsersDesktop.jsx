import { Box, IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import { useEffect, useState } from "react";
import SearchBar from "../../commons/Search.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDeleteUser,
  getAllUsers,
} from "../../store/reducers/usersAll.reducer.js";
import KeepMountedModal from "../../commons/Modal.jsx";

const UsersDesktop = () => {
  const [deleteAction, setDeleteAction] = useState(true);
  const users = useSelector((state) => state.users);
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

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, deleteAction]);
  let cualq = true;

  return (
    <Box sx={{ display: { xs: "none", sm: "block" } }}>
      <SearchBar />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Usuarios finales</TableCell>
            <TableCell>Fecha de alta</TableCell>
            <TableCell>Responsable</TableCell>
            <TableCell>Correo electrónico</TableCell>
            <TableCell>Alta</TableCell>
            <TableCell>Buscar</TableCell>
            <TableCell>Borrar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length ? (
            users.map((user) => {
              return (
                <TableRow key={user._id}>
                  <TableCell>{user.empresa}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {cualq ? <KeepMountedModal /> : <h1>prueba</h1>}
                  </TableCell>
                  <TableCell>
                    <SearchIcon />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteUser(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UsersDesktop;
