import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CellTowerIcon from "@mui/icons-material/CellTower";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SeedResults from "./SeedResults";

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
        Xavia IoTeam
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SeedGenerator() {
  const getKey = "01f903be6bc34d2dad0c7f47582de5d6";
  const navigate = useNavigate();
  const [mode, setMode] = React.useState("");
  const [data, setData] = React.useState({});

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?key=${getKey}&q=${encodeURI(
          data.get("direccion")
        )}`
      )
      .then((result) => {
        // console.log(result.data.results[0].geometry);
        setData({
          startLat: result.data.results[0].geometry.lat,
          startLong: result.data.results[0].geometry.lng,
          devEUI: data.get("devEUI"),
          hours: data.get("horas"),
          workingHours: data.get("jornada"),
          mode: mode,
        });
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CellTowerIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Seed Generator
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="ciudad-direccion"
                  name="direccion"
                  required
                  fullWidth
                  id="direccion"
                  label="Ciudad/Direccion"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="devEUI"
                  label="devEUI"
                  name="devEUI"
                  autoComplete="devEUI"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="horas"
                  label="Horas a simular"
                  name="horas"
                  autoComplete="horas"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="jornada"
                  label="Jornada Laboral (Hs)"
                  name="jornada"
                  autoComplete="Jornada"
                />
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={mode}
                  label="Mode"
                  onChange={handleChange}
                >
                  <MenuItem value={"normal"}>Normal</MenuItem>
                  <MenuItem value={"dangerTemp"}>Temp Danger</MenuItem>
                  <MenuItem value={"batteryLow"}>Battery Low</MenuItem>
                  <MenuItem value={"noMovement"}>No movement</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Generar
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px groove blue",
            borderRadius: "5px",
          }}
        >
          <SeedResults data={data} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
