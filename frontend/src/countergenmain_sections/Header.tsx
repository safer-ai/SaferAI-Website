import { Button, Container, Typography } from "@mui/material";

const Header = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "95vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "3em",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "40px", sm: "50px", md: "60px" },
          // padding: { xs: "4em 0 4em 0", md: "6em 0 6em 0" },
          color: "inherit",
          mb: "0.5em",
          textAlign: "center",
          maxWidth: "40em",
        }}
      >
        Audit & Fix <br /> The Biases of Language Models
      </Typography>
      <Button
        className="page-scroll button-hover-light-text"
        variant="contained"
        color="secondary"
        sx={{
          fontSize: { xs: "15px", sm: "20px", md: "25px" },
        }}
        onClick={(e) => {
          let process = document.getElementById("process");
          e.preventDefault(); // Stop Page Reloading
          process && process.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Get Started
      </Button>
    </Container>
  );
};

export default Header;
