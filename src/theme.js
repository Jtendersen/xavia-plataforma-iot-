import { createTheme } from "@mui/material";

//El main lo utilizamos para los coleres de fuente y el ligh para los fondos
export const theme = createTheme({
  palette: {
    mobile: {
      main: "#3300B8",
      light: "#FFFFFF",
    },
    desktop: {
      main: "#3D3D3D",
      light: "#EAE1D8",
    },
  },
});
