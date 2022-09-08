import { Box, Divider, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import SideList from "../../commons/SideList";
import React from "react";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        backgroundColor: "#3D3D3D",
        color: "#FFFFFF",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const Sidebar = () => {
    const open = useSelector((state) => state.drawer);

    return (
        <Box>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    variant="dense"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        minHeight: "10px",
                        backgroundColor: "#3D3D3D",
                        justifyContent: "flex-end",
                        px: [1],
                    }}
                ></Toolbar>
                <SideList component="nav" />
                <Divider />
            </Drawer>
        </Box>
    );
};

export default Sidebar;
