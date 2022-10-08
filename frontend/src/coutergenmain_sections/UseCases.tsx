import { Avatar, Container, Grid, Typography } from "@mui/material";
import { FaHatCowboySide } from "react-icons/fa";
import { BsFileEarmarkCode, BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";
import { DOCS_URL, NOTEBOOK_URL, REPO_URL } from "../params";

const CircleAvatar = (props: { children: any }) => {
  return (
    <Avatar
      sx={{ backgroundColor: "secondary.main", width: "5em", height: "5em" }}
    >
      {props.children}
    </Avatar>
  );
};

const UseCases = () => {
  return (
    <Container maxWidth="md">
      <Typography
        variant="h2"
        paddingTop={"48px"}
        paddingBottom={"24px"}
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
            <BsPencil size={"3em"} />
          </CircleAvatar>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 4 }}>
          <Typography variant="h3" fontSize="24px" textAlign={"center"}>
            For investigators without a CS background
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 7 }}>
          A{" "}
          <Link to="/countergenweb" target="_blank">
            web interface
          </Link>{" "}
          allows you to easily measure model bias on your data. No coding
          required !
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
        <Grid item xs={12} md={4} order={{ md: 5 }}>
          <Typography variant="h3" fontSize="24px" textAlign={"center"}>
            For Machine Learning enthusiasts
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 8 }}>
          Load your data and your model into a{" "}
          <a href={NOTEBOOK_URL} target="_blank" rel="noreferrer">
            friendly Colab notebook
          </a>{" "}
          and get started with evaluation & model editing!
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
        <Grid item xs={12} md={4} order={{ md: 6 }}>
          <Typography variant="h3" fontSize="24px" textAlign={"center"}>
            For engineers and researchers
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} order={{ md: 9 }}>
          Use the open source{" "}
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            countergen Python modules
          </a>{" "}
          to evaluate the models you are using or creating.{" "}
          <a href={DOCS_URL} target="_blank" rel="noreferrer">
            Documentation
          </a>{" "}
          included!
        </Grid>
      </Grid>
      {/* </Grid> */}
    </Container>
  );
};

export default UseCases;
