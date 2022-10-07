import About from "./coutergenmain_sections/About";
import Header from "./coutergenmain_sections/Header";
import UseCases from "./coutergenmain_sections/UseCases";
import "./CountergenMain.css";

type CountergenMainProps = {};

const CountergenMain = (props: CountergenMainProps) => {
  return (
    <>
      <Header />
      <UseCases />
      <About />
    </>
  );
};

export default CountergenMain;
