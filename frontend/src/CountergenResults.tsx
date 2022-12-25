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
import { doublebindExplanation, stereotypesExplanation } from "./params";

const Image = (props: { name: string }) => {
  const { name } = props;
  const words = name.split("_");
  const techniqueFullName = {
    inlp: "INLP",
    rlace: "RLACE",
    inlpbis: "INLP",
    rlacebis: "RLACE",
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
      : words[1] === "1d"
      ? " (1 dimension edited)"
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
    "InstructGPT  (175B parameters)",
    "2% more likely for women",
    "47% more likely for men*",
    "24% more likely for men",
    "6% more likely for women",
  ],
  [
    "GPT-3  (175B parameters)",
    "2% more likely for women",
    "47% more likely for men*",
    "23% more likely for men",
    "4% more likely for women",
  ],
  [
    "OpenAI Curie (13B parameters)",
    "6% more likely for men",
    "37% more likely for men*",
    "18% more likely for women",
    "33% more likely for women*",
  ],
  [
    "OpenAI Babbage (~3B parameters)",
    "0% more likely for women",
    "50% more likely for men*",
    "54% more likely for women*",
    "46% more likely for women*",
  ],
  [
    "OpenAI Ada (~1B parameters)",
    "19% more likely for women",
    "18% more likely for men*",
    "54% more likely for women*",
    "46% more likely for women*",
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
            We compare the probability that a model generates one of the
            expected outputs when the subjects of the input are females and when
            they are males. The given number is the average relative probability
            (relative to the biggest of the two probabilities compared).
          </p>
          <p>Data:</p>
          <ul>
            <li>{doublebindExplanation}</li>
            <li>{stereotypesExplanation}</li>
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
          We measured model activations on a simple handcrafted training dataset
          containing 20 variations of 10 sentences and edited the model to
          reduce this bias by applying INLP or RLACE on intermediate activations
          of the neural network.
        </li>
        <li>
          Finding the relevant directions in the activations is a noisy process.
          We repeat the process 5 times and show the result of each run, as well
          as their average.
        </li>
        <li>
          We then measured the relative probability between completions
          following inputs with a female subject and inputs with male subjects
          on stereotypes data and the double bind data as validation.
        </li>
      </ul>
      <p>
        <i>
          Because of compute limitations, all experiments are done on GPT-2
          small. We expect the results to be similar with larger model, but we
          can't demonstrate that yet.
        </i>
      </p>

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
              <Image name="rlace_1d_layer" />
            </Grid>
          </Grid>
          <i>
            For both techniques tested, we took the advised number of dimensions
            to remove. Worse bias possible is 1, no bias is 0.
          </i>
        </CardContent>
      </Card>
      <Card className="section">
        <CardHeader
          className="section-title"
          title="Observation 2: Editing direction generalizes well on most datasets"
        />
        <CardContent className="section-content">
          <p>
            As shown in the graphs above,{" "}
            <b>editing reduces bias in both training and validation data</b>,
            even though these are very different kinds of data (for instance,
            our training data doesn't have any gender pronouns, only names, the
            stereotypes data doesn't have any name in it).
          </p>
          <p>
            However, that's not always the case: on the male stereotypes
            dataset, the technique doesn't reduce bias much.
          </p>
        </CardContent>
      </Card>
      <Card className="section">
        <CardHeader
          className="section-title"
          title="Observation 3: The bias is not encoded in a linear way"
        />
        <CardContent className="section-content">
          <p>
            Though RLACE is able to make any linear classifier fail to separate
            between male and female with a rank-8 projection, we found that, no
            matter where the projection is done, and how many dimensions are
            removed, model bias isn't eliminated.
          </p>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Image name="rlace_1d_layer" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Image name="rlace_dims" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <h2>Conclusion and upcoming improvements</h2>
      <p>
        Models exhibit easily <b>measurable bias</b> on small datasets from the
        literature, augmented using CounterGen.{" "}
        <b>
          Direct model editing reduces the bias to a considerable extent while
          requiring very few data points
        </b>
        . Still, it doesn't eliminate all the biases these models have, even
        according to our narrow definition of bias, and sometimes increases it.{" "}
        <b>
          One should always check that editing reduced model bias before using
          the edited model
        </b>
        .
      </p>
      <p>Some further experiments are needed:</p>
      <ul>
        <li>
          The current edition method projects the data in a subspace of the
          activation space. This requires a high degree of independence between
          directions, which is not exactly the case: Anthropic showed in their{" "}
          <a
            href="https://transformer-circuits.pub/2022/toy_model/index.html"
            target="_blank"
            rel="noreferrer"
          >
            Polysemanticy write-up
          </a>{" "}
          that{" "}
          <b>
            rather than orthogonality between vectors representing unrelated
            concepts, we should expect "almost orthogonality"
          </b>
          . This suggests that other kinds of projection - such as projection on
          a cone - might be able to remove relevant information about the target
          concepts while keeping unrelated concepts intact.
        </li>
        <li>
          Current experiments don't measure how much the edited models suffer
          from the edition. Further experiments would{" "}
          <b>measure the drop in performance due to edition</b> and compare it
          to fine-tuning on the augmented dataset, and other bias reduction
          methods.{" "}
          <i>
            Note: this requires an easily measurable task the model should still
            be good at, which is not straightforward in the context of
            generative models.
          </i>
        </li>
      </ul>
      <p>If you are interested, please reach out!</p>
      <h2>Additional remarks</h2>
      <h3>Choose your training data wisely!</h3>
      <p>
        The methods followed don't work much better when the directions are
        found using the data we care about: below is what we found using the
        stereotypes dataset as training data.
      </p>
      <p></p>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Image name="inlpbis_8d_layer" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Image name="rlacebis_1d_layer" />
        </Grid>
      </Grid>
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
          <a href="https://github.com/FabienRoger/Countergen/blob/main/experiments/gpt_bias.ipynb">
            https://github.com/FabienRoger/Countergen/blob/main/experiments/gpt_bias.ipynb
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
