import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, Stack } from "@mui/material";
import { useInput } from "../hooks/useInput";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { trackerAction } from "../store/reducers/usersTracker.reducer";
import { getAllUsers } from "../store/reducers/usersAll.reducer";

// Componente que se activa al obtener el código de validación
// Se renderiza en AddUser
function ActivationCodeDialog(props) {
    const { open, code, close } = props;

    return (
        <React.Fragment>
            <Dialog open={open} onClose={close}>
                <DialogContent>
                    <Stack
                        direction="column"
                        justifyContent="space-around"
                        alignItems="center"
                        spacing={2}
                    >
                        <CheckCircleIcon color="success" size="large" />
                        <h4>Código generado con éxito</h4>
                        <h1>{code}</h1>
                    </Stack>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

// Componente principal
export default function AddUser() {
    // hooks
    const dispatch = useDispatch();

    // variables formulario
    const empresa = useInput("empresa");
    const cuit = useInput("cuit");
    const fullname = useInput("fullname");
    const email = useInput("email");
    const phone = useInput("phone");

    // estados
    const [openCreate, setOpenCreate] = useState(false);
    const [activationCode, setActivationCode] = useState(false);
    const [openActivation, setOpenActivation] = useState(false);
    const track = useSelector((state) => state.tracker);

    // handles
    const createDialogClose = () => setOpenCreate(false);
    const activationDialogClose = () => setOpenActivation(false);
    const handleClickOpen = () => setOpenCreate(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("/api/users/create", {
            empresa: empresa.value,
            cuit: cuit.value,
            fullname: fullname.value,
            email: email.value,
            phone: phone.value,
        });
        if (data.activationCode) {
            setActivationCode(data.activationCode);
            createDialogClose();
            setOpenActivation(true);
            dispatch(trackerAction(!track));
        } else {
            console.log("no pasó nada");
        }
    };

    // props
    const props = {
        open: openActivation,
        code: activationCode,
        close: activationDialogClose,
    };

    React.useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch, track]);

    return (
        <Box>
            <Button
                onClick={handleClickOpen}
                variant="contained"
                color="mobile"
                sx={{
                    color: "white",
                }}
                size="medium"
                startIcon={<AddCircleIcon />}
            >
                Alta Usuario Final
            </Button>
            <Dialog open={openCreate} onClose={createDialogClose}>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>Añadir nuevo usuario</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="Empresa"
                            type="text"
                            id="empresa"
                            fullWidth
                            variant="standard"
                            {...empresa}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="CUIT"
                            type="text"
                            id="cuit"
                            fullWidth
                            variant="standard"
                            {...cuit}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="Nombre y apellido encargado"
                            type="text"
                            id="name"
                            fullWidth
                            variant="standard"
                            {...fullname}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="Email"
                            type="email"
                            id="email"
                            fullWidth
                            variant="standard"
                            {...email}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="Teléfono"
                            type="number"
                            id="phone"
                            fullWidth
                            variant="standard"
                            {...phone}
                        />
                    </DialogContent>
                    <CssBaseline />
                    <DialogActions>
                        <Button onClick={createDialogClose}>Cancel</Button>
                        <Button type="submit">Aceptar</Button>
                    </DialogActions>
                </Box>
            </Dialog>
            <ActivationCodeDialog {...props} />
        </Box>
    );
}