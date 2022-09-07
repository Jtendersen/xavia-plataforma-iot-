import { Avatar, Box, IconButton, Stack } from "@mui/material";
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

const Users = () => {
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
                <Table>
                    <TableBody>
                        {users ? (
                            users.map((user) => {
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
                                                <div>{user.responsable}</div>
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
