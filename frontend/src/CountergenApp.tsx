import { Route, Routes } from "react-router-dom";
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
      </Routes>
    </>
  );
};

export default CountergenApp;
