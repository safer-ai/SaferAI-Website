import {
  Container,
  List,
  Typography,
  ListItem,
} from "@mui/material";

const referencesList = [
  "counterfactual",
  "llmd",
  "stereotypes",
  "doublebind",
  "doublebinddata",
  "openai",
  "inlp",
  "rlace",
];
const referenceData: { [refId: string]: string } = {
  counterfactual: "That's qui a reference: counterfactual",
  llmd: "That's qui a reference: llmd",
  stereotypes: "That's qui a reference: stereotypes",
  doublebind: "That's qui a reference: doublebind",
  doublebinddata: "That's qui a reference: doublebinddata",
  openai: "That's qui a reference: openai",
  inlp: "That's qui a reference: inlp",
  rlace: "That's qui a reference: rlace",
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
          <ListItem id={refId} className="focus-border" tabIndex={0}>
            {i + 1}. {referenceData[refId]}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default References;
