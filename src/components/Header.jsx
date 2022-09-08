import { Stack, Typography } from "@mui/material";
import React from "react";
import AddUser from "../commons/AddUser";

const Header = () => {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            margin={2}
        >
            <Typography variant="h6">Usuarios finales</Typography>
            <AddUser/>
        </Stack>
    );
};

export default Header;
