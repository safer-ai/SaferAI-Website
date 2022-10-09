import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CardContent,
  Card,
  CardHeader,
} from "@mui/material";

const Image = (props: { name: string }) => {
  const { name } = props;
  const words = name.split("_");
  const techniqueFullName = {
    inlp: "INLP",
    rlace: "RLACE",
    rdm: "random vectors",
  }[words[0]];
  const measurementName =
    words[1] === "dims"
      ? "the number of dimension edited changes"
      : words[2] === "layer"
      ? "the edited layer changes"
      : "the number of edited layer changes";
  const additionalInfo =
    words[1] === "8d"
      ? " (8 dimensions edited)"
      : words[1] === "32d"
      ? " (32 dimensions edited)"
      : words[1] === "dims"
      ? "(at layer 7/12)"
      : "";
  const fullName = `Bias with ${techniqueFullName} as ${measurementName}`;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "0.5em",
      }}
    >
      <div>
        <i>{fullName}</i>
      </div>
      <div>
        <i>{additionalInfo}</i>
      </div>
      <div style={{ overflow: "hidden" }}>
        <img
          style={{ marginTop: "0", width: "100%" }}
          src={`/result_imgs/${name}.png`}
          alt={fullName}
        />
      </div>
    </div>
  );
};

const SimpleTableRow = (props: { data: string[] }) => {
  const { data } = props;

  const boldIfSignificant = (s: string) => {
    return s[s.length - 1] === "*" ? <b>{s}</b> : s;
  };

  const boldedData = data.slice(1).map(boldIfSignificant);

  return (
    <TableRow
      key={data[0]}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {data[0]}
      </TableCell>

      {boldedData.map((elt) => (
        <TableCell>{elt}</TableCell>
      ))}
    </TableRow>
  );
};

const experimentData = [
  [
    "GPT-3  (175B parameters)",
    "20% more likely for women",
    "48% more likely for men*",
    "11% more likely for women",
    "17% more likely for men",
  ],
  [
    "InstructGPT  (175B parameters)",
    "20% more likely for women",
    "48% more likely for men*",
    "12% more likely for women",
    "26% more likely for men",
  ],
  [
    "OpenAI Curie (13B parameters)",
    "12% more likely for men",
    "23% more likely for men",
    "35% more likely for women*",
    "17% more likely for women",
  ],
  [
    "OpenAI Babbage (~3B parameters)",
    "2% more likely for women",
    "33% more likely for men*",
    "25% more likely for women*",
    "1% more likely for women",
  ],
  [
    "OpenAI Ada (~1B parameters)",
    "21% more likely for men",
    "23% more likely for men*",
    "49% more likely for women*",
    "14% more likely for women",
  ],
];

const CountergenResults = () => {
  return (
    <Container maxWidth="lg">
      <h1>Results On Gender Bias</h1>
      <p>
        <i>
          <b>Results are preliminary</b>: larger real life experiments are
          needed to assess the viability of this approach. Please view these
          results as hints aimed at helping you if you want to experiment with
          model editing.
        </i>
      </p>
      <p>
        <i>More results will come in the next months!</i>
      </p>
      <Card className="section">
        <CardHeader
          className="section-title"
          title=" Observation 0: In some situation, language models exhibit strong
          behavior changes based on the gender of the subjects"
        />
        <CardContent className="section-content">
          <p>
            We compare the probability that a model generate one of the expected
            outputs when the subjects of the input are female and when they are
            male. The given number is the relative probability (compared to the
            biggest of the two probabilities).
          </p>
          <p>The datasets used are:</p>
          <ul>
            <li>The stereotype dataset from ZZZ</li>
            <li>The questions from the double bind experiment ZZZ</li>
          </ul>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Model used</TableCell>
                <TableCell>Female stereotype</TableCell>
                <TableCell>Male stereotype</TableCell>
                <TableCell>
                  Positive adjective in the double bind experiment
                </TableCell>
                <TableCell>
                  Negative adjective in the double bind experiment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {experimentData.map((data) => (
                <SimpleTableRow data={data} />
              ))}
            </TableBody>
          </Table>
          <p>
            <small>
              <i>*0 not included in the p=0.05 confidence interval</i>
            </small>
          </p>
        </CardContent>
      </Card>

      <h2>Editing Method</h2>
      <ul>
        <li>
          We measured model activations on the stereotype dataset and edited the
          model to reduce this bias by applying INLP or RLACE on intermediate
          activations of the neural network.
        </li>
        <li>
          Finding the relevant directions in the activations is a noisy process.
          We repeat the process 5 times and show the result of each run.
        </li>
        <li>
          We then measured the relative probability between completions
          following inputs with a female subject and inputs with male subjects
          on both stereotypes data and the double bind data as validation.
        </li>
      </ul>
      <Card className="section">
        <CardHeader
          className="section-title"
          title="Observation 1: Bias is easier to remove in the middle of the network"
        />
        <CardContent className="section-content">
          <p>
            Applying RLACE or INLP to intermediate activations slightly reduces
            the bias of the model. But it works better and generalize a bit more
            to the validation set (the double bind sociology experiment) when
            editing is done in the middle of the network, where the network
            probably has a crisper representation of "male" and "female".
          </p>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Image name="inlp_8d_layer" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Image name="rlace_8d_layer" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card className="section">
        <CardHeader
          className="section-title"
          title="Observation 2: The bias is not encoded in a linear way"
        />
        <CardContent className="section-content">
          <p>
            Though RLACE is able to make any linear classifier fail separation
            between male and female with a rank-8 projection, we found that, no
            matter where the projection is done, and how many dimensions are
            removed, model bias isn't eliminated.
          </p>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Image name="rlace_8d_layer" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Image name="rlace_dims" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <h2>Conclusion</h2>
      <p>
        Model exhibit easily measurable bias on small datasets from the
        literature augmented using CounterGen. Editing model on these small
        datasets is hard, and further research is need to determine if it can be
        a robust way to reduce the amount of bias in language models.
      </p>
      <p>
        We ran experiments in other setups, editing multiple layers at once,
        editing more layers, and trying methods to find the relevant directions
        faster. If you want to know more, please reach out!
      </p>
      <h2>Additional remarks</h2>
      <h3>Comparison with picking random dimensions</h3>
      <p>
        Projecting activation on random directions increases noise, and reduces
        bias a little when many dimensions are removed. It performs worse than
        applying INLP and RLACE to intermediate activations.
      </p>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Image name="rdm_dims" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Image name="rdm_8d_layer" />
        </Grid>
      </Grid>
      <h3>Why are performance before edit different?</h3>
      <p>
        For each experiment, we pick the variations once. Because no new
        variation is generated when editing the model, this is a fair and
        slightly less noisy reference point we can compare the editing methods
        against.
      </p>
      <h3>Where can I find the detail of the experiments?</h3>
      <p>Here are the notebooks used to produce the results above:</p>
      <ul>
        <li>
          <a href="https://github.com/FabienRoger/Countergen/blob/main/countergen/exploration/gpt_experiment.ipynbr">
            https://github.com/FabienRoger/Countergen/blob/main/countergen/exploration/gpt_experiment.ipynbr
          </a>{" "}
          (Experiment on OpenAI's models)
        </li>
        <li>
          <a href="https://www.kaggle.com/code/fabienroger/editing-2r">
            https://www.kaggle.com/code/fabienroger/editing-2r
          </a>{" "}
          (Number of dimensions for RLACE)
        </li>
        <li>
          <a href="https://www.kaggle.com/code/fabienroger/editing-3-8dim">
            https://www.kaggle.com/code/fabienroger/editing-3-8dim
          </a>{" "}
          (Most effective layer for INLP)
        </li>
        <li>
          <a href="https://www.kaggle.com/code/fabienroger/editing-3r-8dim">
            https://www.kaggle.com/code/fabienroger/editing-3r-8dim
          </a>{" "}
          (Most effective layer for RLACE)
          <li>
            <a href="https://www.kaggle.com/code/fabienroger/editing-2-3-4-random">
              https://www.kaggle.com/code/fabienroger/editing-2-3-4-random
            </a>{" "}
            (Measurements when choosing directions at random)
          </li>
        </li>
      </ul>
    </Container>
  );
};

export default CountergenResults;
