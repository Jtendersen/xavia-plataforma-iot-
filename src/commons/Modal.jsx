import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LinearProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import QrScanner from "./QrScanner";
import qr from "../assets/exampleQR.png";
import Image from "mui-image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setQrCode } from "../store/reducers/deviceQrCode.reducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "border-radius: 45px",
  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal({ userParams, show, setShow }) {
  const [geolocalizador, setGeolocalizador] = React.useState("Micro Tracker");
  const [gateway, setGateway] = React.useState("Advantech");
  const [mediciones, setMediciones] = React.useState(10);
  const [trackeo, setTrackeo] = React.useState(10);
  const [camOn, setCamOn] = useState(false);
  const dispatch = useDispatch();

  //MANEJADORES DE INPUTS
  const handleGeolocalizador = (event) => {
    setGeolocalizador(event.target.value);
  };
  const handleGateway = (event) => {
    setGateway(event.target.value);
  };
  const handleMediciones = (event) => {
    setMediciones(event.target.value);
  };
  const handleTrackeo = (event) => {
    setTrackeo(event.target.value);
  };

  const clearData = () => {
    dispatch(setQrCode(null));
  };
  //ESTADO DE INFO STATE
  const dataQr = useSelector((state) => state.deviceCode);

  /* MODAL 1 */
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    setShow(false);
  };

  /* MODAL 2 */
  const [openDos, setOpenDos] = React.useState(false);
  const handleOpenDos = () => {
    setOpenDos(true);
    setOpen(false);
  };
  const handleCloseDos = () => {
    setOpenDos(false);
    setShow(false);
  };

  /* MODAL 3 */
  const [openTres, setOpentres] = React.useState(false);
  const handleOpenTres = () => {
    setCamOn(true);
    setOpentres(true);
    setOpenDos(false);
  };
  const handleCloseTres = () => {
    setOpentres(false);
    setShow(false);
  };

  /* MODAL 4 */
  const [openFour, setOpenFour] = React.useState(false);
  const handleOpenfour = () => {
    setCamOn(false);
    setOpentres(false);
    setOpenFour(true);
  };

  /* MODAL 5 */
  const [openFive, setOpenFive] = React.useState(false);
  const handleOpenFive = () => {
    setCamOn(false);
    setOpenFour(false);
    setOpenFive(true);
  };
  const handleCloseFive = () => {
    setOpenFive(false);
    const devices = {
      qrCode: dataQr /*  */,
      typeOfDevice: geolocalizador,
      gatewayLora: gateway,
      measuresAmount: mediciones,
      typeOfTrackin: trackeo,
      users: userParams,
    };

    axios
      .post("http://localhost:3001/api/device/register", devices)
      .then((res) => console.log(res));

    clearData();
    setShow(false);
  };

  const addNewDevices = () => {
    setOpenFive(false);
    const devices = {
      qrCode: dataQr /*  */,
      typeOfDevice: geolocalizador,
      gatewayLora: gateway,
      measuresAmount: mediciones,
      typeOfTrackin: trackeo,
      users: userParams,
    };

    axios
      .post("http://localhost:3001/api/device/register", devices)
      .then((res) => console.log(res));

    clearData();
    setOpenDos(true)


  };

  return (
    <>
      {/* Modal 1/3 ELEGIR GEOLOCALIZADOR Y GATEWAY*/}

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="kitleeep-mounted-modal-t"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Asignación de dispositivos
          </Typography>

          {/*BARRA DE ESTADO  */}
          <Box sx={{ mr: 2 }}>
            <Grid container>
              <Grid sx={{ mr: 3 }}>
                <Typography variant="caption" align="center">
                  1 de 3
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <LinearProgress
                  color="success"
                  variant="determinate"
                  value={33}
                />
              </Grid>
            </Grid>
          </Box>

          {/*GEOLOCALIZADOR INPUT  */}
          <div>
            <Typography
              id="keep-mounted-modal-title"
              variant="h7"
              component="h4"
              sx={{ mb: 2 }}
            >
              Geolocalizador
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="geolocalizadorLabel">
                Elegir Geolocalizador
              </InputLabel>
              <Select
                labelId="geolocalizadorLabel"
                id="demo-simple-select"
                value={geolocalizador}
                onChange={handleGeolocalizador}
              >
                <MenuItem value={"Micro Tracker"}>Micro Tracker</MenuItem>
                <MenuItem value={"Compact Tracker"}>Compact Tracker</MenuItem>
                <MenuItem value={"Industrial Tracker"}>
                  Industrial Tracker
                </MenuItem>
                <MenuItem value={"Smart Badge"}>Smart Badge</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/*GATEWAY INPUT  */}
          <div>
            <Typography
              id="keep-mounted-modal-title"
              variant="h7"
              component="h4"
              sx={{ my: 2 }}
            >
              Gateway LoRa
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="gatewayLabel">Elegir Gateway</InputLabel>
              <Select
                labelId="gatewayLabel"
                id="demo-simple-select"
                value={gateway}
                onChange={handleGateway}
              >
                <MenuItem value={"Advantech"}>Advantech</MenuItem>
                <MenuItem value={"Cisco"}>Cisco</MenuItem>
                <MenuItem value={"Dragino"}>Dragino</MenuItem>
                <MenuItem value={"Generic"}>Generic</MenuItem>
                <MenuItem value={"Kerlink"}>Kerlink</MenuItem>
                <MenuItem value={"Miromico"}>Miromico</MenuItem>
                <MenuItem value={"Motorola Solutions"}>
                  Motorola Solutions
                </MenuItem>
                <MenuItem value={"Option"}>Option</MenuItem>
                <MenuItem value={"RAD"}>RAD</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* BUTTON SIGUIENTE */}
          <Box textAlign={"center"}>
            <Button
              onClick={handleOpenDos}
              variant="contained"
              color="mobile"
              sx={{
                color: "white",
                mt: 4,
                px: 8,
                py: 2,
              }}
              size="large"
            >
              Siguiente
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal 2/3  ESCANEAR QR*/}
      <Modal
        keepMounted
        open={openDos}
        onClose={handleCloseDos}
        aria-labelledby="kitleeep-mounted-modal-t"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Asignación de dispositivos
          </Typography>
          {/*BARRA DE ESTADO  */}
          <Box sx={{ mr: 2 }}>
            <Grid container>
              <Grid sx={{ mr: 3 }}>
                <Typography variant="caption" align="center">
                  2 de 3
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <LinearProgress
                  color="success"
                  variant="determinate"
                  value={66}
                />
              </Grid>
            </Grid>
          </Box>
          <Typography
            id="keep-mounted-modal-title"
            variant="body1"
            sx={{
              pt: 4,
            }}
          >
            Escanear Código QR que se encuentra en el dispositivo
          </Typography>
          {/*IMAGE QR  */}
          <Image
            sx={{ display: { xs: "none", md: "block" } }}
            src={qr}
            style={{
              justifyContent: "center",
              height: "50%",
              width: "50%",
              padding: "5%",
            }}
            alt="XaviaWelcome.png"
          />{" "}
          {/*BOTON SCANEAR QR  */}
          <Box textAlign={"center"}>
            <Button
              onClick={handleOpenTres}
              variant="contained"
              color="mobile"
              sx={{
                color: "white",
                py: 2,
              }}
              size="large"
            >
              Escanear Código QR
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal 3/3  ENCIENDE CAMARA ESCANEO*/}
      {
        <Modal keepMounted open={openTres} onClose={handleCloseTres}>
          <Box sx={style}>
            {dataQr ? (
              <>
                <Box sx={{ p: 6 }}>
                  <Typography
                    textAlign={"center"}
                    id="keep-mounted-modal-title"
                    variant="body1"
                    sx={{ pb: 4 }}
                  >
                    ¿Estás escaneando el dispositivo #{dataQr}?
                  </Typography>
                  <Box textAlign={"center"}>
                    {/* BUTTON SI */}
                    <Button
                      onClick={handleOpenfour}
                      variant="contained"
                      color="mobile"
                      sx={{
                        color: "white",
                        py: 2,
                        px: 6,
                      }}
                      size="large"
                    >
                      SI
                    </Button>
                    {/* BUTTON SI */}
                    <Button
                      onClick={clearData}
                      variant="outlined"
                      color="mobile"
                      sx={{
                        ml: 1,
                        py: 2,
                        px: 6,
                        color: "mobile",
                      }}
                      size="large"
                    >
                      NO
                    </Button>
                  </Box>
                </Box>
              </>
            ) : camOn ? (
              <>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Asignación de dispositivos
                </Typography>
                {/*BARRA DE ESTADO  */}
                <Box sx={{ mr: 2 }}>
                  <Grid container>
                    <Grid sx={{ mr: 3 }}>
                      <Typography variant="caption" align="center">
                        2 de 3
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <LinearProgress
                        color="success"
                        variant="determinate"
                        value={66}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="body1"
                  sx={{
                    pt: 4,
                  }}
                >
                  Escanear Código QR que se encuentra en el dispositivo
                </Typography>
                <QrScanner />
              </>
            ) : (
              <h1>df</h1>
            )}
          </Box>
        </Modal>
      }

      {/* Modal 4/4 CANTIDAD DE MEDICIONES Y TRACKEO */}
      <Modal
        keepMounted
        open={openFour}
        onClose={handleClose}
        aria-labelledby="kitleeep-mounted-modal-t"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Asignación de dispositivos
          </Typography>
          {/*BARRA DE ESTADO  */}
          <Box sx={{ mr: 2 }}>
            <Grid container>
              <Grid sx={{ mr: 3 }}>
                <Typography variant="caption" align="center">
                  3 de 3
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <LinearProgress
                  color="success"
                  variant="determinate"
                  value={100}
                />
              </Grid>
            </Grid>
          </Box>

          {/*MEDICIONES INPUT  */}
          <div>
            <Typography
              id="keep-mounted-modal-title"
              variant="h7"
              component="h4"
              sx={{ mb: 2, mt: 2 }}
            >
              Cantidad de mediciones
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="medicionesLabel">
                Elegir cant. de mediciones
              </InputLabel>
              <Select
                labelId="medicionesLabel"
                id="demo-simple-select"
                value={mediciones}
                onChange={handleMediciones}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/*TRACKEO INPUT  */}
          <div>
            <Typography
              id="keep-mounted-modal-title"
              variant="h7"
              component="h4"
              sx={{ my: 2 }}
            >
              Trackeo
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="trackeoLabel">Elegir Trackeo</InputLabel>
              <Select
                labelId="trackeoLabel"
                id="demo-simple-select"
                value={trackeo}
                onChange={handleTrackeo}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* BUTTON SIGUIENTE */}
          <Box textAlign={"center"}>
            <Button
              onClick={handleOpenFive}
              variant="contained"
              color="mobile"
              sx={{
                color: "white",
                mt: 3,
                py: 2,
                px: 6,
              }}
              size="large"
            >
              Siguiente
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal 5/5 RESUMEN DISPOSITIVO A AGREGAR */}
      <Modal
        keepMounted
        open={openFive}
        onClose={handleCloseFive}
        aria-labelledby="kitleeep-mounted-modal-t"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Asignación de dispositivos
          </Typography>
          <Box sx={{ px: 4, py: 2 }}>
            <Typography id="keep-mounted-modal-title" variant="h7">
              <b> Geolocalizador: </b>
              {geolocalizador}
            </Typography>
            <br></br>
            <Typography id="keep-mounted-modal-title" variant="h7">
              <b>Gateway LoRa: </b> {gateway}
            </Typography>
            <br></br>
            <Typography id="keep-mounted-modal-title" variant="h7">
            <b>  Dispositivo: </b>{dataQr}
            </Typography>
            <br></br>
            <Typography id="keep-mounted-modal-title" variant="h7">
              <b> Cantidad de mediciones: </b>
              {mediciones}
            </Typography>
            <br></br>
            <Typography id="keep-mounted-modal-title" variant="h7">
              <b> Tipo de trackeo: </b>
              {trackeo}
            </Typography>
          </Box>
          <Box textAlign={"center"} sx={{ pt: 3 }}>
            <Button
              onClick={handleCloseFive}
              variant="contained"
              color="mobile"
              sx={{
                color: "white",
              }}
              size="large"
            >
              Aceptar
            </Button>
            {/* BUTTON SI */}
            <Button
            onClick={addNewDevices}
              variant="outlined"
              color="mobile"
              sx={{
                ml: 1,

                color: "mobile",
              }}
              size="large"
            >
              Asignar nuevo dispositivo
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
