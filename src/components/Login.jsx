import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import WelcomeXavia from "../assets/WelcomeXavia.png";
import WelcomeXaviaMobile from "../assets/WelcomeXaviaMobile.png";
import plus from "../assets/plus.png";
import { Box } from "@mui/system";
import { theme } from "../theme";
import { Image } from "mui-image";
import { useDispatch, useSelector } from "react-redux";
import { firstLoginRequest } from "../store/reducers/user.reducer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        https://www.xaviaiot.com/
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openWrong, setOpenWrong] = React.useState(false);

  const handleClickOpenSuccess = () => {
    setOpenSuccess(true);
  };
  const handleCloseSuccess = () => {
    navigate("/passCreate", { replace: true });
    setOpenSuccess(false);
  };
  const handleClickOpenWrong = () => {
    setOpenWrong(true);
  };
  const handleCloseWrong = () => {
    setOpenWrong(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      accessKey: data.get("accessKey"),
    };
    dispatch(firstLoginRequest(userData)).then((response) => {
      console.log("soy response: ", response)
      response.payload === "No Users Found"
        ? handleClickOpenWrong()
        : handleClickOpenSuccess();
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        {/* Dialog in Success Case */}
        <Dialog
          open={openSuccess}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseSuccess}
          aria-describedby="alert-dialog-slide-description"
          align="center"
        >
          <Grid sx={{ padding: "10%" }} container justifyContent={"center"}>
            <CheckCircleIcon fontSize="large" color="success" />
          </Grid>

          <DialogTitle>{"¡Bienvenido!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Ya sos parte de XAVIA IOT
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid sx={{ padding: "10%" }} container justifyContent={"center"}>
              <Button variant="contained" onClick={handleCloseSuccess}>
                Crear contraseña
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>

        {/* Dialog in Wrong Token Case */}
        <Dialog
          open={openWrong}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseWrong}
          aria-describedby="alert-dialog-slide-description"
          align="center"
        >
          <Grid sx={{ padding: "10%" }} container justifyContent={"center"}>
            <CancelIcon fontSize="large" color="error" />
          </Grid>

          <DialogTitle>{"¡ERROR!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Codigo de Acceso Inválido
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid sx={{ padding: "10%" }} container justifyContent={"center"}>
              <Button variant="contained" onClick={handleCloseWrong}>
                Intenta de nuevo
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>

        <Grid
          sx={{
            backgroundColor: {
              xs: theme.palette.mobile.light,
              md: theme.palette.desktop.light,
            },
          }}
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              sx={{ display: { xs: "none", md: "block" } }}
              src={WelcomeXavia}
              style={{
                justifyContent: "center",
                height: "80%",
                width: "80%",
                padding: "10%",
              }}
              alt="XaviaWelcome.png"
            />
            <Image
              sx={{ display: { xs: "block", md: "none" } }}
              src={WelcomeXaviaMobile}
              style={{
                justifyContent: "center",
                height: "80%",
                width: "80%",
                padding: "10%",
              }}
              alt="XaviaWelcome.png"
            />
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="accessKey"
                label="Clave de Acceso"
                type="password"
                id="accessKey"
                autoComplete="Clave de Acceso"
              />
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ color: "#3300B8" }}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#3300B8" }}
              >
                Ingresar
              </Button>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuerda mis datos"
              />

              <Grid container></Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        {/* <Image
          sx={{ display: { xs: "none", md: "block" } }}
          src={plus}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            height: "20rem",
            width: "auto",
            zIndex: 1,
          }}
          alt="plus.png"
        /> */}

        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            // backgroundImage: "url(https://source.unsplash.com/random)",
            // backgroundRepeat: "no-repeat",
            backgroundColor: theme.palette.desktop.main,
            //   (t) =>
            //     t.palette.mode === "warning"
            //       ? t.palette.grey[50]
            //       : t.palette.grey[900],
            // backgroundSize: "cover",
            // backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
