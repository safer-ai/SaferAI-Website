import { Card, CardHeader, CardContent } from "@mui/material";
import { NOTEBOOK_URL, REPO_URL } from "../params";

const ModelEditing = () => {
  return (
    <Card className="section">
      <CardHeader
        className="section-title"
        title="Go further and fix the bias!"
      />
      <CardContent className="section-content">
        <p>
          Model editing isn't available in the web tool. If you want to use it,
          either use{" "}
          <a href={NOTEBOOK_URL} target="_blank" rel="noreferrer">
            the Colab Notebook
          </a>
          , or run the{" "}
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            Python modules
          </a>{" "}
          locally.
        </p>
        <p>
          A short explanation of what the editing does and how it works is
          available{" "}
          <a
            href={
              "https://fabienroger.github.io/Countergen/docs/_build/html/countergenedit/usage.html"
            }
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
      </CardContent>
    </Card>
  );
};

export default ModelEditing;
