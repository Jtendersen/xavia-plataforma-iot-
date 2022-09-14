import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
import { useDispatch } from "react-redux";
import { forgotPassRequest, setUser } from "../store/reducers/user.reducer";
import { Container, InputAdornment } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

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

export default function SignInSide() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [errorHandler, setErrorHandler] = React.useState(false);
  const [message, setMessage] = React.useState("");

  console.log("ESTE ES EL MENSAJE", message);
  // const [successMsg, setSuccessMsg] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const iconAdornment =
    message === "No existe un usuario con ese email"
      ? {
          endAdornment: (
            <InputAdornment position="end">
              <CancelIcon color="error" />
            </InputAdornment>
          ),
        }
      : message ===
        "Revisá tu email. Te enviamos un link para recuperar tu contraseña"
      ? {
          endAdornment: (
            <InputAdornment position="end">
              <CheckCircleIcon color="success" />{" "}
            </InputAdornment>
          ),
        }
      : {};

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
    };
    dispatch(forgotPassRequest(userData)).then((response) => {
      if (response.payload === "No existe un usuario con ese email") {
        setErrorHandler(true);
        setMessage("No existe un usuario con ese email");
      } else {
        setErrorHandler(false);
        setMessage(
          "Revisá tu email. Te enviamos un link para recuperar tu contraseña"
        );
      }
      console.log(
        "Esta es Se ha enviado un mail / No existe un usuario con ese email",
        response.payload
      );
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

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
                error={errorHandler}
                helperText={message}
                InputProps={iconAdornment}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />

              {message ===
              "Revisá tu email. Te enviamos un link para recuperar tu contraseña" ? (
                <Link underline="none" color="inherit" href="/">
                  <Button
                    component={Link}
                    to="/"
                    fullWidth
                    sx={{ mt: 3, mb: 2, backgroundColor: "#3300B8" }}
                    variant="contained"
                  >
                    Volver a ingresar
                  </Button>
                </Link>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#3300B8" }}
                >
                  Enviar
                </Button>
              )}

              <Grid container></Grid>

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
