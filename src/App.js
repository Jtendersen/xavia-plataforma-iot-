import { ThemeProvider } from "@emotion/react";
import Login from "./components/Login.jsx";
import { theme } from "./theme";
import { Provider } from "react-redux";
import store from "./store/index.js";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{/* <Login /> */}</ThemeProvider>
    </Provider>
  );
}

export default App;
