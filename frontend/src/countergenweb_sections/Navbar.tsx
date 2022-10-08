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
import { Link } from "react-router-dom";
import {
  BsGithub,
  BsFillFileEarmarkBarGraphFill,
  BsFillStarFill,
} from "react-icons/bs";
import { SiReadthedocs, SiGooglecolab } from "react-icons/si";
import { DOCS_URL, NOTEBOOK_URL, REPO_URL } from "../params";

const pages = [
  {
    link: "countergenweb",
    children: (
      <>
        <BsFillStarFill />
        Use Countergen Online
      </>
    ),
  },
  {
    link: "countergenresults",
    children: (
      <>
        <BsFillFileEarmarkBarGraphFill />
        <div>Results</div>
      </>
    ),
  },
  {
    link: NOTEBOOK_URL,
    external: true,
    children: (
      <>
        <SiGooglecolab />
        <div>Notebook</div>
      </>
    ),
  },
  {
    link: REPO_URL,
    external: true,
    children: (
      <>
        <BsGithub />
        <div>Github</div>
      </>
    ),
  },
  {
    link: DOCS_URL,
    external: true,
    children: (
      <>
        <SiReadthedocs />
        <div>Docs</div>
      </>
    ),
    low_priority: true,
  },
];

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
              {pages.map(({ link, children, external }) => (
                <MenuItem key={link} onClick={handleCloseNavMenu}>
                  <Link
                    to={external ? { pathname: link } : link}
                    target={external ? "_blank" : "_self"}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                      flexDirection: "row",
                      color: "#024564",
                    }}
                  >
                    {children}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
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
            {pages.map(({ link, children, external, low_priority }) => {
              const linkStyle: any = {
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.3em",
                flexDirection: "row",
                whiteSpace: "nowrap",
              };
              return (
                <Button
                  key={link}
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: "white",
                    display: {
                      md: low_priority ? "none" : "block",
                      lg: "block",
                    },
                    fontSize: "16px",
                  }}
                >
                  {external ? (
                    <a
                      href={link}
                      target="_blank"
                      style={linkStyle}
                      rel="noreferrer"
                    >
                      {children}
                    </a>
                  ) : (
                    <Link to={link} style={linkStyle}>
                      {children}
                    </Link>
                  )}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
