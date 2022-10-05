import "./App.css";
import CountergenApp from "./CountergenApp";
import { BrowserRouter } from "react-router-dom";

type AppProps = {};

const App = (props: AppProps) => {
  return (
    <BrowserRouter>
      <CountergenApp />
    </BrowserRouter>
  );
};

export default App;
