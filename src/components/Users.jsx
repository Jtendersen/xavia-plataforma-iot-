import {
    Avatar,
    Box,
    IconButton,
    Stack,
    TablePagination,
    Typography,
} from "@mui/material";
import { users } from "../utils/usersSeed.js";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import * as React from "react";
import SearchBar from "../commons/Search.jsx";

const Users = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function customDisplayedRows({ from, to, count }) {
        return `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`;
    }

    return (
        <>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
                        {users ? (
                            users.map((user) => {
                                return (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.empresa}</TableCell>
                                        <TableCell>{user.fecha}</TableCell>
                                        <TableCell>
                                            {user.responsable}
                                        </TableCell>
                                        <TableCell>{user.mail}</TableCell>
                                        <TableCell>
                                            <CreateIcon />
                                        </TableCell>
                                        <TableCell>
                                            <SearchIcon />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton>
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

            {/* Parte responsive de la vista users */}
            <Box sx={{ display: { sm: "none" } }}>
                <Stack justifyContent="space-between" direction="row" alignItems='center' >
                    <Typography variant="h6">Usuarios finales</Typography>
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={-1}
                        count={users.length}
                        labelRowsPerPage=""
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelDisplayedRows={customDisplayedRows}
                    />
                </Stack>
                <SearchBar />
                <Table>
                    <TableBody>
                        {users ? (
                            users
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((user) => {
                                    return (
                                        <TableRow>
                                            <TableCell>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src="/static/images/avatar/1.jpg"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Stack>
                                                    <div>{user.empresa}</div>
                                                    <div>
                                                        {user.responsable}
                                                    </div>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    alignItems="center"
                                                    spacing={2}
                                                >
                                                    <div>
                                                        <CreateIcon />
                                                    </div>
                                                    <div>
                                                        <SearchIcon />
                                                    </div>
                                                    <div>
                                                        <DeleteIcon />
                                                    </div>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                        ) : (
                            <>
                                <Box>-</Box>
                                <Box>-</Box>
                                <Box>-</Box>
                            </>
                        )}
                    </TableBody>
                </Table>
            </Box>
        </>
    );
};

export default Users;
