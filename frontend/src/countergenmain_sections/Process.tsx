import { Box, Container, Grid, Typography } from "@mui/material";
import HexText from "../components/HexText";
import { ReferenceMarker } from "./References";

const HexBlock = (props: { text: string }) => {
  const { text } = props;
  return (
    <Box
      component={Grid}
      item
      xs={4}
      display={{ xs: "none", md: "flex" }}
      sx={{
        minHeight: "12em",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HexText text={text} />
    </Box>
  );
};

const TextParagraph = (props: { title: string; children: any }) => {
  const { title, children } = props;
  return (
    <Grid item xs={12} md={8}>
      <Typography
        variant="h4"
        sx={{
          color: "secondary.light",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: "inherit",
        }}
      >
        {children}
      </Typography>
    </Grid>
  );
};

const Process = () => {
  return (
    <Box
      id="process"
      sx={{
        paddingBottom: "3em",
        paddingTop: "1em",
        backgroundColor: "primary.main",
        color: "primary.light",
        width: "100%",
      }}
    >
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          paddingTop={"3em"}
        >
          <HexBlock text="Augment" />
          <TextParagraph title="Generate counterfactuals">
            To evaluate the bias of a model, we compare the output of a model
            between the cases where the input is about a member of a protected
            category to cases where it’s not. CounterGen lets you generate
            variations of your data by changing attributes which should not
            affect the model output. This makes it possible to measure the bias
            on the actual text your model is processing in deployment, which is
            not possible with traditional benchmarks. We provide methods to
            generate variations{<ReferenceMarker refId="llmd" />}, but you can
            also easily plug your own method into the framework.
          </TextParagraph>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          paddingTop={"3em"}
        >
          <TextParagraph title="Test your model on your data">
            Bias can arise when data changes and when the model changes, so
            CounterGen enables you to easily plug your data and your model into
            a flexible evaluation pipeline. We also provide default datasets
            from the literature studying bias in language models
            {<ReferenceMarker refId="stereotypes" />}
            {<ReferenceMarker refId="doublebind" />}, and a built-in integration
            of GPT-3{<ReferenceMarker refId="openai" />}.
          </TextParagraph>
          <HexBlock text="Test" />
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          paddingTop={"3em"}
        >
          <HexBlock text="Edit" />
          <TextParagraph title="Edit your model">
            CounterGen allows you to reduce the bias of your model by leveraging
            techniques already developed to make sentence embedding more similar
            across protected categories{<ReferenceMarker refId="inlp" />}
            {<ReferenceMarker refId="rlace" />}. To do so, we measure the
            neuron’s activations of your model on the augmented data, and find
            how to change the internal computations of your network so that it
            behaves in the same way no matter the protected categories to which
            inputs belong.
          </TextParagraph>
        </Grid>
      </Container>
    </Box>
  );
};

export default Process;
