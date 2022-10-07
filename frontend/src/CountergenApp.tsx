import { Route, Routes } from "react-router-dom";
import Redirect from "./components/Redirect";
import Navbar from "./countergenweb_sections/Navbar";
import CountergenMain from "./CountergenMain";
import CountergenResults from "./CountergenResults";
import CountergenWeb from "./CountergenWeb";

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
          path="/countergennotebook"
          element={
            <Redirect to="https://colab.research.google.com/drive/1J6zahRfPfqSyXlA1hm_KQCQlkcd3KVPc" />
          }
        />
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
