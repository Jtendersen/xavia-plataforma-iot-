import { useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import SideList from "../../commons/SideList";

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
                sx={{ color: "white" }}
            >
                <MenuOpenIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClick={handleClose}
                onClose={handleClose}
                PaperProps={{
                    style: { backgroundColor: "#3D3D3D", color: "white" },
                }}
            >
                <SideList />
            </Menu>
        </div>
    );
};

export default Navbar;
