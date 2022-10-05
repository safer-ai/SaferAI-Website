import { Route, Routes } from "react-router-dom";
import Redirect from "./components/Redirect";
import Navbar from "./sections/Navbar";
import CountergenMain from "./pages/CountergenMain";
import CountergenResults from "./pages/CountergenResults";
import CountergenWeb from "./pages/CountergenWeb";

const CountergenApp = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CountergenMain />} />
        <Route path="/countergen" element={<CountergenMain />} />
        <Route path="/countergenweb" element={<CountergenWeb />} />
        <Route path="/countergenresults" element={<CountergenResults />} />
        <Route
          path="/countergengithub"
          element={<Redirect to="https://github.com/FabienRoger/Countergen" />}
        />
        <Route
          path="/countergendocs"
          element={
            <Redirect to="https://fabienroger.github.io/Countergen/docs/_build/html/index.html" />
          }
        />
      </Routes>
    </>
  );
};

export default CountergenApp;
