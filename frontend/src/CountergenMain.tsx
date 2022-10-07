import About from "./coutergenmain_sections/About";
import Header from "./coutergenmain_sections/Header";
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
      <About />
    </>
  );
};

export default CountergenMain;
