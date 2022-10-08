import Header from "./coutergenmain_sections/Header";
import Footer from "./coutergenmain_sections/Footer";
import References from "./coutergenmain_sections/References";
import UseCases from "./coutergenmain_sections/UseCases";
import "./CountergenMain.css";
import Process from "./coutergenmain_sections/Process";

type CountergenMainProps = {};

const CountergenMain = (props: CountergenMainProps) => {
  return (
    <>
      <Header />
      <Process />
      <UseCases />
      <References />
      <Footer />
    </>
  );
};

export default CountergenMain;
