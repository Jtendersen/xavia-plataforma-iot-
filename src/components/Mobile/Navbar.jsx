import { useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MenuOpenIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Usuarios finales</MenuItem>
                <MenuItem onClick={handleClose}>Aplicaciones</MenuItem>
                <MenuItem onClick={handleClose}>Ubicaciones</MenuItem>
            </Menu>
        </div>
    );
};

export default Navbar;
