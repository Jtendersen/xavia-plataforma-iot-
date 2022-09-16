import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton } from "@mui/material";

const DialogError = ({ handleClose, errorMsg, open }) => {
    return (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            align="center"
        >
            <Grid sx={{ padding: "10%" }} container justifyContent={"center"}>
                <CancelIcon fontSize="large" color="error" />
            </Grid>

            <DialogTitle>
                {"¡ERROR!"}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {errorMsg}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid
                    sx={{ padding: "10%" }}
                    container
                    justifyContent={"center"}
                >
                    <Button variant="contained" onClick={handleClose}>
                        Intenta de nuevo
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default DialogError;
