import { AddBusiness, ChevronLeft, ChevronRight, Home } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
} from "@mui/material";
import { setOpen } from "../store/reducers/drawerOpen.reducer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/LogoXavia.png";
import React from "react";

const SideList = () => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.drawer);

    const toggleDrawer = () => {
        dispatch(setOpen(!open));
    };

    return (
        <Stack justifyContent="space-between" sx={{height: "100vh"}}>
            <List>
                <ListItem disablePadding>
                    <div className="MuiListItemIcon-root css-cveggr-MuiListItemIcon-root">
                        <IconButton>
                            {(open)?<ChevronLeft
                                sx={{ color: "#FFFFFF" }}
                                onClick={toggleDrawer}
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1pg8mhl-MuiSvgIcon-root"
                            />:<ChevronRight 
                                sx={{ color: "#FFFFFF" }}
                                onClick={toggleDrawer}
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1pg8mhl-MuiSvgIcon-root"
                            />}
                        </IconButton>
                    </div>
                    <div className="MuiListItemText-root css-tlelie-MuiListItemText-root">
                        <span className="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root">
                            {open ? (
                                <img
                                    src={logo}
                                    alt="logo"
                                    style={{ maxWidth: "20%" }}
                                />
                            ) : (
                                <></>
                            )}
                        </span>
                    </div>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#home">
                        <ListItemIcon>
                            <Home sx={{ color: "#FFFFFF" }} />
                        </ListItemIcon>
                        <ListItemText primary="Homepage" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#home">
                        <ListItemIcon>
                            <AddBusiness sx={{ color: "#FFFFFF" }} />
                        </ListItemIcon>
                        <ListItemText primary="Usuarios finales" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#home">
                        <ListItemIcon>
                            <RssFeedIcon sx={{ color: "#FFFFFF" }} />
                        </ListItemIcon>
                        <ListItemText primary="Aplicaciones" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#home">
                        <ListItemIcon>
                            <LocationOnIcon sx={{ color: "#FFFFFF" }} />
                        </ListItemIcon>
                        <ListItemText primary="Ubicaciones" />
                    </ListItemButton>
                </ListItem>
            </List>

            <List>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#home">
                        <ListItemIcon>
                            <LogoutIcon sx={{ color: "#FFFFFF" }} />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar sesión" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Stack>
    );
};

export default SideList;
