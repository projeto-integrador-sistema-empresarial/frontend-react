import { createTheme } from "@mui/material";
import { blue,  deepPurple,  } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: deepPurple[700],
      dark: deepPurple[800],
      light: deepPurple[500],
      contrastText: "#fff",
    },
    secondary: {
      main: blue[500],
      dark: blue[400],
      light: blue[300],
      contrastText: "#fff",
    },
    background: {
      paper: "#303134",
      default: "#202124",
    },
  },
  typography: {
    allVariants: {
      color: "#fff"
    }
  }
});