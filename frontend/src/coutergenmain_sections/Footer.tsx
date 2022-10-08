import { Box, Container, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        paddingBottom: "3em",
        paddingTop: "1em",
        backgroundColor: "primary.main",
        color: "primary.light",
        width: "100%",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" fontSize="32px">
          By SaferAI
        </Typography>
        <Typography>
          For the 2022 AI Audit Challenge by Standford HAI.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
