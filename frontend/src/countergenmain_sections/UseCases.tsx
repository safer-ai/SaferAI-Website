import { Avatar, Button, Container, Grid, Typography } from "@mui/material";
import { FaHatCowboySide } from "react-icons/fa";
import { BsFileEarmarkCode } from "react-icons/bs";
import { Link } from "react-router-dom";
import { NOTEBOOK_URL, REPO_URL } from "../params";

const CircleAvatar = (props: { children: any }) => {
  return (
    <Avatar
      sx={{ backgroundColor: "secondary.main", width: "5em", height: "5em" }}
    >
      {props.children}
    </Avatar>
  );
};

const CenteredButton = (props: { children: any }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Button variant="outlined" color="secondary">
        {props.children}
      </Button>
    </div>
  );
};

const nbCol = 3;

const UseCases = () => {
  return (
    <Container maxWidth="md">
      <Typography
        variant="h2"
        paddingTop={"48px"}
        paddingBottom={"48px"}
        textAlign="center"
      >
        A Tool For Everyone
      </Typography>
      <Grid
        container
        columnSpacing={4}
        rowSpacing={2}
        justifyContent="flex-start"
      >
        <Grid
          item
          xs={12}
          md={4}
          order={{ md: 1 }}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <CircleAvatar>
            <svg
              strokeWidth="0"
              viewBox="0 0 24 24"
              aria-hidden="true"
              height="3.5em"
              width="3.5em"
              xmlns="http://www.w3.org/2000/svg"
              fill="#fffacc"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              ></path>
            </svg>
          </CircleAvatar>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 1 + nbCol }}>
          <Typography variant="h3" fontSize="24px" textAlign={"center"}>
            For investigators without a CS background
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 1 + nbCol * 2 }}>
          A web interface allows you to easily measure model bias on your data:
          <ul style={{ marginTop: "0", marginBottom: "0" }}>
            <li>use your expertise to write and collect data</li>
            <li>enter the data in the web app and measure model bias</li>
            <li>
              warn relevant stakeholders (e.g engineers, auditors, regulators)
              about the biases you have found
            </li>
          </ul>
          No coding required!
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 1 + nbCol * 3 }}>
          <CenteredButton>
            <Link
              to="/countergenweb"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              Open the web interface
            </Link>
          </CenteredButton>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          order={{ md: 2 }}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <CircleAvatar>
            <FaHatCowboySide size={"3em"} />
          </CircleAvatar>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 2 + nbCol }}>
          <Typography variant="h3" fontSize="24px" textAlign={"center"}>
            For Machine Learning enthusiasts and students
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 2 + nbCol * 2 }}>
          Load your data and your model into a friendly Colab notebook:
          <ul style={{ marginTop: "0", marginBottom: "0" }}>
            <li>
              learn on what kind of data publicly available models are the most
              biased
            </li>
            <li>see how much you can reduce the bias of a model</li>
            <li>try new techniques to reduce model bias</li>
          </ul>
          Use the Colab graphical interface to get started, personalize it, and
          dig deeper!
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 2 + nbCol * 3 }}>
          <CenteredButton>
            <a
              href={NOTEBOOK_URL}
              target="_blank"
              style={{ textDecoration: "none" }}
              rel="noreferrer"
            >
              Open the notebook
            </a>
          </CenteredButton>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          order={{ md: 3 }}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <CircleAvatar>
            <BsFileEarmarkCode size={"3em"} />
          </CircleAvatar>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 3 + nbCol }}>
          <Typography variant="h3" fontSize="24px" textAlign={"center"}>
            For Machine Learning engineers and researchers
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 3 + nbCol * 2 }}>
          Use the open source CounterGen Python modules to:
          <ul style={{ marginTop: "0", marginBottom: "0" }}>
            <li>
              evaluate the bias of models you consider using in real-world
              situations, on the data you care about
            </li>
            <li>edit your model to reduce its bias</li>
            <li>monitor the bias of your model during deployment</li>
          </ul>
          Documentation included!
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 3 + nbCol * 3 }}>
          <CenteredButton>
            <a
              href={REPO_URL}
              target="_blank"
              style={{ textDecoration: "none" }}
              rel="noreferrer"
            >
              Open the GitHub Repo
            </a>
          </CenteredButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UseCases;
