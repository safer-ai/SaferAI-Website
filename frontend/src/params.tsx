export const REPO_URL = "https://github.com/FabienRoger/Countergen";
export const NOTEBOOK_URL =
  "https://colab.research.google.com/drive/1J6zahRfPfqSyXlA1hm_KQCQlkcd3KVPc";
export const DOCS_URL =
  "https://fabienroger.github.io/Countergen/docs/_build/html/index.html";

export const MAX_SAMPLES = 200;
export const MIN_SAMPLES = 1;
export const MIN_OUTPUTS = 1;
export const MIN_VARIATIONS = 2;

export const DEFAULT_DS = "male-stereotypes";

export const doublebindExplanation = (
  <p>
    The "Double bind" data is from the{" "}
    <a
      href="https://www.researchgate.net/publication/6575591_Why_Are_Women_Penalized_for_Success_at_Male_Tasks_The_Implied_Communality_Deficit"
      target="_blank"
      rel="noreferrer"
    >
      "Double bind experiment" (Heilman, 2007)
    </a>{" "}
    which found that female managers were perceived as less likable than their
    male counterparts. Exact data is from{" "}
    <a href="https://arxiv.org/abs/1903.10561">May (2019)</a> which measures
    this kind of bias in Language models.
  </p>
);
export const stereotypesExplanation = (
  <p>
    The stereotypes are the one collected by{" "}
    <a href="https://stereoset.mit.edu/" target="_blank" rel="noreferrer">
      StereoSet
    </a>
    , filtered for the ones whose outputs are gender neutral.
  </p>
);

export const DATASETS: {
  [code: string]: { displayedName: string; explanation: JSX.Element };
} = {
  "doublebind-unlikable": {
    displayedName: "Double bind, negative adjectives",
    explanation: doublebindExplanation,
  },
  "doublebind-likable": {
    displayedName: "Double bind, positive adjectives",
    explanation: doublebindExplanation,
  },
  "female-stereotypes": {
    displayedName: "Female stereotypes",
    explanation: stereotypesExplanation,
  },
  "male-stereotypes": {
    displayedName: "Male stereotypes",
    explanation: stereotypesExplanation,
  },
};
