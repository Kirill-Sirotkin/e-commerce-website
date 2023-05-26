import React, { FormEvent, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

const AppBarCustom = () => {
    const [searchItem, setSearchItem] = useState<string>("");
    const navigate = useNavigate();

    const searchBrewery = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!searchItem) return;
      navigate(`/search/${searchItem}`);
    }

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#282c34" }}>
            <Toolbar disableGutters sx={{ gap: "2em", justifyContent: 'center' }}>
                <Typography
                variant="h6"
                noWrap
                component={Link}
                to={"/"}
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
                >
                HOME |
                </Typography>
                <Typography
                variant="h6"
                noWrap
                component={Link}
                to={"/product"}
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
                >
                | PRODUCTS |
                </Typography>
                <Typography
                variant="h6"
                noWrap
                component={Link}
                to={"/profile"}
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
                >
                | PROFILE
                </Typography>
            </Toolbar>
        </AppBar>
      </Box>
    )
}

export default AppBarCustom;