import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import WelcomeXavia from "../assets/WelcomeXavia.png";
import WelcomeXaviaMobile from "../assets/WelcomeXaviaMobile.png";
import plus from "../assets/plus.png";
import { theme } from "../theme";
import { Image } from "mui-image";

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
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      accessKey: data.get("accessKey"),
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
                autoComplete="current-password"
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
              {/* <Copyright sx={{ mt: 5 }} /> */}
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
            height: "20%",
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
