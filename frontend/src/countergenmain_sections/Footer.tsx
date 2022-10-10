import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        paddingBottom: "1em",
        paddingTop: "2em",
        backgroundColor: "primary.main",
        color: "primary.light",
        width: "100%",
      }}
    >
      <Container maxWidth="md">
        <Typography>By SaferAI, 2022</Typography>
        <Typography>Contact us at saferai.audit at gmail.com</Typography>
      </Container>
    </Box>
  );
};

export default Footer;
