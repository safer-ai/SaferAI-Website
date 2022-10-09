import { Stats } from "../types";
import "./ResultBars.css";

type ResultBarsProps = {
  stats: { [name: string]: Stats };
};

const ResultBars = (props: ResultBarsProps) => {
  const { stats } = props;
  let maxNumber = 1e-20;
  Object.entries(stats).forEach(([category, stat]) => {
    maxNumber = Math.max(stat.mean, maxNumber);
  });
  return (
    <div className="result-bars">
      {Object.entries(stats).map(([category, stat], i) => (
        <div className="result-bar" key={category}>
          <p className="category">{category}</p>
          <div>
            <div
              className="bar"
              style={{ width: `${(80 * stat.mean) / maxNumber}%` }}
            ></div>
            <p className="perf">{stat.mean.toPrecision(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultBars;
