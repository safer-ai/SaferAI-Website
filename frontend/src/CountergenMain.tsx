import Header from "./countergenmain_sections/Header";
import References from "./countergenmain_sections/References";
import UseCases from "./countergenmain_sections/UseCases";
import "./CountergenMain.css";
import Process from "./countergenmain_sections/Process";

type CountergenMainProps = {};

const CountergenMain = (props: CountergenMainProps) => {
  return (
    <>
      <Header />
      <Process />
      <UseCases />
      <References />
    </>
  );
};

export default CountergenMain;
