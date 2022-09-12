import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LinearProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import QrScanner from "./QrScanner";
import qr from "../assets/exampleQR.png"
import Image from "mui-image";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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

export default function KeepMountedModal() {
  const [geolocalizador, setGeolocalizador] = React.useState([]);
  const [gateway, setGateway] = React.useState([]);

  /* MODAL 1 */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* MODAL 2 */
  const [openDos, setOpenDos] = React.useState(false);
  const handleOpenDos = () => {
    setOpenDos(true);
    setOpen(false);
  };
  const handleCloseDos = () => setOpenDos(false);

  /* MODAL 3 */
  const [openTres, setOpentres] = React.useState(false);
  const handleOpenTres = () => {
    setOpentres(true);
    setOpenDos(false);
  };
  const handleCloseTres = () => setOpentres(false);

  const handleGeolocalizador = (event) => {
    setGeolocalizador(event.target.value);
  };
  const handleGateway = (event) => {
    setGateway(event.target.value);
  };
  const dataQr = useSelector((state) => state.deviceCode);

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddSharpIcon color="success" fontSize="large" />
      </Button>

      {/* Modal 1/3 */}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="kitleeep-mounted-modal-t"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            sx={{ my: 5 }}
          >
            Asignación de dispositivos
          </Typography>
          <Box sx={{ flexGrow: 1, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography variant="body2" align="center">
                  1 de 3
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <LinearProgress variant="determinate" value="33" />
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
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
              Gateway
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="gatewayLabel">Elegir Gateway</InputLabel>
              <Select
                labelId="gatewayLabel"
                id="demo-simple-select"
                value={gateway}
                onChange={handleGateway}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* BUTTON SIGUIENTE */}
          <Button
            onClick={handleOpenDos}
            variant="contained"
            color="mobile"
            sx={{
              color: "white",
              mt: 3,
            }}
            size="large"
          >
            Siguiente
          </Button>
        </Box>
      </Modal>

      {/* Modal 2/3 */}
      <Modal
        keepMounted
        open={openDos}
        onClose={handleCloseDos}
        aria-labelledby="kitleeep-mounted-modal-t"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            sx={{ my: 5 }}
          >
            Asignación de dispositivos
          </Typography>
          <Box sx={{ flexGrow: 1, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography variant="body2" align="center">
                  2 de 3
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <LinearProgress variant="determinate" value="66" />
              </Grid>
            </Grid>
          </Box>

          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            sx={{
              p: 2,
              flexDirection: "column",
              borderRadius: "16px",
            }}
          >
            Escanear Código QR que se encuentra en el dispositivo
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={2}></Grid>
            <Grid item xs={6} md={8}>
            <Image
              sx={{ display: { xs: "none", md: "block" } }}
              src={qr}
              style={{
                justifyContent: "center",
                height: "80%",
                width: "80%",
                padding: "10%",
              }}
              alt="XaviaWelcome.png"
            />
              <Button
                onClick={handleOpenTres}
                variant="contained"
                color="mobile"
                sx={{
                  color: "white",
                }}
                size="large"
              >
                Escanear Código QR
              </Button>
            </Grid>
            <Grid item xs={6} md={2}></Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Modal 3/3 */}
      <Modal keepMounted open={openTres} onClose={handleCloseTres}>
        <Box sx={style}>
          {dataQr ? (
            <>
              <Typography
                id="keep-mounted-modal-title"
                variant="h6"
                component="h2"
                sx={{ my: 5 }}
              >
                Estás escaneando el dispositivo {dataQr}?
              </Typography>
              <Button
                variant="contained"
                color="mobile"
                sx={{
                  color: "white",
                }}
                size="large"
              >
                SI
              </Button>
              <Button
                variant="outlined"
                color="mobile"
                sx={{
                  color: "white",
                }}
                size="large"
              >
                NO
              </Button>
            </>
          ) : (

        <QrScanner/>
          )}
        </Box>
      </Modal>
    </div>
  );
}
