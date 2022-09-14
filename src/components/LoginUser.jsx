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
import { loginRequest } from "../store/reducers/user.reducer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { Container, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
      <Link color="inherit" href="https://www.xaviaiot.com/">
        www.xaviaiot.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function AwsCognito(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Link
        color="inherit"
        href="https://xavia-users-auth.auth.sa-east-1.amazoncognito.com/login?client_id=52bqus32h9n3va4s93nlsvgj0o&response_type=code&scope=email+openid&redirect_uri=http://localhost:3000/profile"
      >
        Cognito Login
      </Link>{" "}
    </Typography>
  );
}

export default function SignInSide() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [userToShow, setUserToShow] = React.useState("");
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseOk = () => {
    navigate("/profile", { replace: true });
    setOpen(false);
  };

  const handleCloseNotActivated = () => {
    navigate("/passCreate", { replace: true });
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(loginRequest(userData)).then((response) => {
      typeof response.payload === "string"
        ? setErrorMsg(response.payload)
        : setUserToShow(response.payload.fullname);

      handleClickOpen();
    });
  };

  function DialogSuccess() {
    return (
      <>
        <Grid sx={{ padding: "10%" }} container justifyContent={"center"}>
          <CheckCircleIcon fontSize="large" color="success" />
        </Grid>

        <DialogTitle>
          {"¡Bienvenido de nuevo! "}
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

        <DialogContentText id="alert-dialog-slide-description">
          {userToShow}
        </DialogContentText>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Ya sos parte de XAVIA IOT
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid sx={{ padding: "10%" }} container justifyContent={"center"}>
            {user.isActivated ? (
              <Button variant="contained" onClick={handleCloseOk}>
                Ingresar a la plataforma
              </Button>
            ) : (
              <Button variant="contained" onClick={handleCloseNotActivated}>
                Crea tu clave
              </Button>
            )}
          </Grid>
        </DialogActions>
      </>
    );
  }

  function DialogError() {
    return (
      <>
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
          <Grid sx={{ padding: "10%" }} container justifyContent={"center"}>
            <Button variant="contained" onClick={handleClose}>
              Intenta de nuevo
            </Button>
          </Grid>
        </DialogActions>
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          align="center"
        >
          {user.fullname ? <DialogSuccess /> : <DialogError />}
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
                name="password"
                label="Contraseña"
                type={values.showPassword ? "text" : "password"}
                id="password"
                autoComplete="Contraseña"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Grid item xs>
                <Link
                  href="/passforgot"
                  variant="body2"
                  sx={{ color: "#3300B8" }}
                >
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

              <AwsCognito sx={{ mt: 5 }} />

              <Copyright sx={{ mt: 5 }} />
            </Box>
            <Container md={2}>
              <Image
                sx={{ display: { xs: "none", md: "block" } }}
                src={plus}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  margin: "auto",
                  height: "auto",
                  width: "12%",
                  zIndex: 1000,
                }}
                alt="plus.png"
              />
            </Container>
          </Box>
        </Grid>

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
