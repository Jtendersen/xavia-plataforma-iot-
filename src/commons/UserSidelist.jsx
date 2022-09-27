import {
  ChevronLeft,
  ChevronRight,
  Home,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
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
import TimelineIcon from "@mui/icons-material/Timeline";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/LogoXavia.png";
import React from "react";
import { setView } from "../store/reducers/views.reducer";
import { logoutRequest } from "../store/reducers/user.reducer";
import { useNavigate } from "react-router-dom";
import useMatches from "../hooks/useMatches";

// SideList es responsive. Se usa en ambas vistas.
const UserSideList = () => {
  const dispatch = useDispatch();
  const match = useMatches()
  const open = useSelector((state) => state.drawer);
  const navigate = useNavigate();

  // toggleDrawer setea el estado en reducer cuando se abre o no el sidebar.
  const toggleDrawer = () => {
    dispatch(setOpen(!open));
  };

  const toggleView = (selectedOption) => {
    dispatch(setView(selectedOption));
  };
  const logOut = () => {
    dispatch(logoutRequest()).then(() => {
      navigate("/");
    });
  };

  return (
    <Stack
      justifyContent={{ xs: "flex-start", sm: "space-between" }}
      sx={{ height: { sm: "100vh", xs: "40vh" } }}
    >
      <List>
        <ListItem disablePadding>
          <Box
            className="MuiListItemIcon-root css-cveggr-MuiListItemIcon-root"
            sx={{ display: { xs: "none", sm: "inline" } }}
          >
            <IconButton onClick={toggleDrawer}>
            {open ? (
                                <>
                                    {match && (
                                        <ChevronLeft
                                            sx={{ color: "#FFFFFF", display: { xs: "none", sm: "inline" } }}
                                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1pg8mhl-MuiSvgIcon-root"
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    {match && (
                                        <ChevronRight
                                            sx={{ color: "#FFFFFF", display: { xs: "none", sm: "inline" } }}
                                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1pg8mhl-MuiSvgIcon-root"
                                        />
                                    )}
                                </>
                            )}
            </IconButton>
          </Box>
          <Box
            className="MuiListItemText-root css-tlelie-MuiListItemText-root"
            sx={{ display: { xs: "none", sm: "inline" } }}
          >
            <span className="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root">
              {open ? (
                <img src={logo} alt="logo" style={{ maxWidth: "20%" }} />
              ) : (
                <></>
              )}
            </span>
          </Box>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" onClick={() => toggleView("profile")}>
            <ListItemIcon>
              <Home sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component="a"
            onClick={() => toggleView("aplicaciones")}
          >
            <ListItemIcon>
              <RssFeedIcon sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Aplicaciones" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" onClick={() => toggleView("historico")}>
            <ListItemIcon>
              <TimelineIcon sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Histórico" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            onClick={() => toggleView("ubicaciones")}
          >
            <ListItemIcon>
              <LocationOnIcon sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Ubicaciones" />
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" onClick={() => logOut()}>
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

export default UserSideList;
