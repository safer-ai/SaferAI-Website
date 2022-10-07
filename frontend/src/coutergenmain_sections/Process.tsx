import { Button, Box, Container, Grid, Typography } from "@mui/material";
import HexText from "../components/HexText";

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

const TextParagraph = (props: { title: string; children: string }) => {
  const { title, children } = props;
  return (
    <Grid item xs={12} md={8}>
      <Typography
        variant="h4"
        sx={{
          color: "secondary.light",
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
            To evaluate the bias of the model, you want to compare the output of
            a model between the cases where the input is about a member of a
            protected category to cases where it’s not. Countergen lets you
            generate variations of your data where attributes which should not
            be taken into account by the model are changed. We provide methods
            to generate these variations [3][4], but you can also easily plug
            your own method into the framework.
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
            Countergen enables you to easily plug your data and your model into
            a flexible evaluation pipeline. We also provide default datasets
            from the literature studying bias in language models [1][2], and a
            built-in integration of GPT-3 [5].
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
            Countergen allows you to make your model act in a more similar way
            on the different variations that should be treated in the same way
            by measuring the neuron’s activations of your model and making them
            closer on new inputs, leveraging techniques already developed to
            make sentence embedding more similar across protected categories.
            [6][7]
          </TextParagraph>
        </Grid>
      </Container>
    </Box>
  );
};

export default Process;
