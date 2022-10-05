import { Button, Typography } from "@mui/material";

const Header = () => {
  return (
    <header className="intro">
      <div className="intro-overlay">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 intro-text">
              <Typography
                variant="h1"
                noWrap
                sx={{
                  fontFamily: "monospace",
                  fontSize: "70px",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  mb: "0.5em",
                }}
              >
                Countergen
              </Typography>
              <Typography
                sx={{
                  fontSize: "24px",
                  color: "inherit",
                  mb: "0.5em",
                }}
              >
                It's us. lalalalalla allalalal alallal
              </Typography>
              <Button
                href="#features"
                className="page-scroll"
                variant="contained"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
