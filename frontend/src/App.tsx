import "./App.css";
import CountergenApp from "./CountergenApp";
import { BrowserRouter } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#024564",
      light: "#FFFACC",
      dark: "#024564",
      contrastText: "#FFFACC",
    },
    secondary: {
      main: "#E34B31",
      light: "#f1644b",
      dark: "#953322",
      contrastText: "#FFFACC",
    },
    background: {
      default: "#FFFACC",
    },
    text: {
      primary: "#024564",
    },
  },
  typography: {
    fontFamily: `"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});
const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CountergenApp />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
