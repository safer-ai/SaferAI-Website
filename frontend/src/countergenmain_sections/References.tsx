import { Container, List, Typography, ListItem } from "@mui/material";

const referencesList = [
  "llmd",
  "stereotypes",
  "doublebind",
  "openai",
  "inlp",
  "rlace",
  "doublebinddata",
  "nltk",
  "hateSpeech",
  "nameOrigin",
  "biasSentenceProb",
];
const referenceData: {
  [refId: string]: { for: string; refObject: JSX.Element };
} = {
  llmd: {
    for: "For the LLMD data augmentation technique.",
    refObject: (
      <p>
        Fryer, Zee, Vera Axelrod, Ben Packer, Alex Beutel, Jilin Chen, and
        Kellie Webster. 2022.{" "}
        <span>
          “Flexible Text Generation for Counterfactual Fairness Probing.”
        </span>{" "}
        <em>arXiv Preprint arXiv:2206.13757</em>.
      </p>
    ),
  },
  stereotypes: {
    for: "For the stereotypes data",
    refObject: (
      <p>
        Nadeem, Moin, Anna Bethke, and Siva Reddy. 2020.{" "}
        <span>
          “Stereoset: Measuring Stereotypical Bias in Pretrained Language
          Models.”
        </span>{" "}
        <em>arXiv Preprint arXiv:2004.09456</em>.
      </p>
    ),
  },
  doublebind: {
    for: "For the doublebind experiment",
    refObject: (
      <p>
        Heilman, Madeline E, and Tyler G Okimoto. 2007.{" "}
        <span>
          “Why Are Women Penalized for Success at Male Tasks?: The Implied
          Communality Deficit.”
        </span>{" "}
        <em>Journal of Applied Psychology</em> 92 (1): 81.
      </p>
    ),
  },
  doublebinddata: {
    for: "For the exact double bind data",
    refObject: (
      <p>
        May, Chandler, Alex Wang, Shikha Bordia, Samuel R Bowman, and Rachel
        Rudinger. 2019.{" "}
        <span>“On Measuring Social Biases in Sentence Encoders.”</span>{" "}
        <em>arXiv Preprint arXiv:1903.10561</em>.
      </p>
    ),
  },
  openai: {
    for: "For the GPT models and the API access to them",
    refObject: (
      <p>
        Brown, Tom, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared D Kaplan,
        Prafulla Dhariwal, Arvind Neelakantan, et al. 2020.{" "}
        <span>“Language Models Are Few-Shot Learners.”</span>{" "}
        <em>Advances in Neural Information Processing Systems</em> 33:
        1877–1901.
      </p>
    ),
  },
  inlp: {
    for: "For INLP, a dimension finding technique",
    refObject: (
      <p>
        Ravfogel, Shauli, Yanai Elazar, Hila Gonen, Michael Twiton, and Yoav
        Goldberg. 2020.{" "}
        <span>
          “Null It Out: Guarding Protected Attributes by Iterative Nullspace
          Projection.”
        </span>{" "}
        <em>arXiv Preprint arXiv:2004.07667</em>.
      </p>
    ),
  },
  rlace: {
    for: "For RLACE, a dimension finding technique",
    refObject: (
      <p>
        Ravfogel, Shauli, Michael Twiton, Yoav Goldberg, and Ryan D Cotterell.
        2022. <span>“Linear Adversarial Concept Erasure.”</span> In{" "}
        <em>International Conference on Machine Learning</em>, 18400–18421.
        PMLR.
      </p>
    ),
  },
  nltk: {
    for: "For the gendered name data",
    refObject: (
      <p>
        Bird, Steven, Ewan Klein, and Edward Loper. 2009.{" "}
        <em>
          Natural Language Processing with Python: Analyzing Text with the
          Natural Language Toolkit
        </em>
        . " O’Reilly Media, Inc.".
      </p>
    ),
  },
  hateSpeech: {
    for: "For the hate speech data",
    refObject: (
      <p>
        De Gibert, Ona, Naiara Perez, Aitor Garcı́a-Pablos, and Montse Cuadros.
        2018. <span>“Hate Speech Dataset from a White Supremacy Forum.”</span>{" "}
        <em>arXiv Preprint arXiv:1809.04444</em>.
      </p>
    ),
  },
  nameOrigin: {
    for: "For the name frequencies by country",
    refObject: (
      <p>
        Michael, Jörg. n.d. <span>“Gender.c.”</span> In.{" "}
        <a href="https://www.autohotkey.com/board/topic/20260-gender-verification-by-forename-cmd-line-tool-db/">
          https://www.autohotkey.com/board/topic/20260-gender-verification-by-forename-cmd-line-tool-db/
        </a>
        .
      </p>
    ),
  },
  biasSentenceProb: {
    for: 'For evaluation data & a metric from "Social Bias from Sentence Probability"',
    refObject: (
      <p>
        Ghazal, Ahmad, Tilmann Rabl, Minqing Hu, Francois Raab, Meikel Poess,
        Alain Crolotte, and Hans-Arno Jacobsen. 2013.{" "}
        <span>
          “Bigbench: Towards an Industry Standard Benchmark for Big Data
          Analytics.”
        </span>{" "}
        In{" "}
        <em>
          Proceedings of the 2013 ACM SIGMOD International Conference on
          Management of Data
        </em>
        , 1197–1208.
      </p>
    ),
  },
};

export const ReferenceMarker = (props: { refId: string }) => {
  return (
    <button
      style={{
        color: "#0fa1c2",
        display: "inline-block",
        padding: 0,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1em",
      }}
      onClick={(e) => {
        let ref = document.getElementById(props.refId);
        e.preventDefault(); // Stop Page Reloading
        ref?.focus({ preventScroll: true });
        ref?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      [{referencesList.indexOf(props.refId) + 1}]
    </button>
  );
};

const References = () => {
  document.getElementById("openai")?.focus();
  return (
    <Container maxWidth="md">
      <Typography
        variant="h2"
        paddingTop={"48px"}
        paddingBottom={"24px"}
        textAlign="center"
      >
        Work We Use
      </Typography>
      <List sx={{ listStyleType: "disc" }}>
        {referencesList.map((refId, i) => (
          <ListItem
            id={refId}
            key={refId}
            className="focus-border p-less-margin"
            tabIndex={0}
            style={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <p>{i + 1}.</p>{" "}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {referenceData[refId].refObject}
              <p>{referenceData[refId].for}</p>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default References;
