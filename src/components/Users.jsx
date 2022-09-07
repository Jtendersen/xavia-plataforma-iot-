import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import {
//     adminDeleteUser,
//     changeUserRole,
//     getAllUsers,
// } from "../../store/reducers/adminUsersReducer";
import { useDispatch, useSelector } from "react-redux";
// import { loadingHandler } from "../../store/reducers/loadingReducer";
// import Loading from "../../commons/Loading";
import {
    Container,
    FormControlLabel,
    Grid,
    IconButton,
    Switch,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import AddUser from "./AddUser";
// import Orders from "./Orders";

const Users = () => {
    // const users = useSelector((state) => state.adminUsers);
    // const loading = useSelector((state) => state.loading);
    const users = false
    const [changeIcon, setChangeIcon] = useState(true);
    const [deleteAction, setDeleteAction] = useState(true);
    const dispatch = useDispatch();

    const handleChange = (obj) => {
        // dispatch(changeUserRole(obj)).then(() => {
        //     if (changeIcon) {
        //         setChangeIcon(false);
        //     } else {
        //         setChangeIcon(true);
        //     }
        // });
    };

    const deleteUser = (userId) => {
        // dispatch(adminDeleteUser(userId)).then(() => {
        //     if (deleteAction) {
        //         setDeleteAction(false);
        //     } else {
        //         setDeleteAction(true);
        //     }
        // });
    };

    const getRole = (role) => {
        if (role === "admin") return true;
        else return false;
    };

    // useEffect(() => {
    //     dispatch(getAllUsers()).then(() => console.log("usuarios traidos!"));
    // }, [changeIcon, deleteAction]);

    // useEffect(() => {
    //     if (users.length) dispatch(loadingHandler(false));
    // }, [users]);

    // if (loading) {
    //     return <Loading />;
    // } else {
        return (
            <React.Fragment>
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
                        {(users)? users.map((user) => {
                            const auth = getRole(user.roles);
                            return (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.lastname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {/* <Orders ordersId={user.id} /> */}
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={auth}
                                                    onChange={() =>
                                                        handleChange({
                                                            userId: user.id,
                                                            roleName:
                                                                user.roles,
                                                        })
                                                    }
                                                    aria-label="login switch"
                                                />
                                            }
                                            label={auth ? "Admin" : "User"}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        }) : <></>}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
// };

export default Users;