import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import CountergenMain from "./CountergenMain";
import CountergenResults from "./CountergenResults";
import CountergenWeb from "./CountergenWeb";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./Footer";

const RedirectComponent = (props: { url: string }) => {
  window.location.href = props.url;
  return <p>Loading pdf...</p>;
};

const CountergenApp = () => {
  return (
    <ScrollToTop>
      <Navbar />
      <Routes>
        <Route path="/" element={<CountergenMain />} />
        <Route path="/countergen" element={<CountergenMain />} />
        <Route path="/countergenweb" element={<CountergenWeb />} />
        <Route path="/countergenresults" element={<CountergenResults />} />
        <Route
          path="/countergenresultspdf"
          element={
            <RedirectComponent
              url={process.env.PUBLIC_URL + "/methodology.pdf"}
            />
          }
        />
      </Routes>
      <Footer />
    </ScrollToTop>
  );
};

export default CountergenApp;
