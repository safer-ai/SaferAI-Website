import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import {
  BsGithub,
  BsFillFileEarmarkBarGraphFill,
  BsFillStarFill,
} from "react-icons/bs";
import { SiReadthedocs, SiGooglecolab } from "react-icons/si";

const pages = {
  countergenweb: (
    <>
      <BsFillStarFill />
      Use Countergen Online
    </>
  ),
  countergenresults: (
    <>
      <BsFillFileEarmarkBarGraphFill />
      <div>Results</div>
    </>
  ),
  countergennotebook: (
    <>
      <SiGooglecolab />
      <div>Notebook</div>
    </>
  ),
  countergengithub: (
    <>
      <BsGithub />
      <div>Github</div>
    </>
  ),
  countergendocs: (
    <>
      <SiReadthedocs />
      <div>Docs</div>
    </>
  ),
};

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: "1em" }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link
              to={"countergen"}
              style={{
                color: "white",
                textDecoration: "none",
                fontFamily: "monospace",
              }}
            >
              Countergen
            </Link>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Object.entries(pages).map(([url, text]) => (
                <MenuItem key={url} onClick={handleCloseNavMenu}>
                  <Link
                    to={`${url}`}
                    style={{
                      color: "blue",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                      flexDirection: "row",
                    }}
                  >
                    {text}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link
              to={"countergen"}
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Countergen
            </Link>
          </Typography>
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              marginLeft: "auto",
              gap: 2,
            }}
          >
            {Object.entries(pages).map(([url, text]) => (
              <Button
                key={url}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  to={`${url}`}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3em",
                    flexDirection: "row",
                    whiteSpace: "nowrap",
                  }}
                >
                  {text}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
