import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import useAppSelector from "../hooks/useAppSelector";
import { getTotal } from "../reducers/cartReducer";

const AppBarCustom = () => {
  const cart = useAppSelector(state => state.cartReducer);

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ bgcolor: "#282c34" }}>
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
                HOME
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ borderRightWidth: 3, bgcolor: "white" }} />
                <Typography
                variant="h6"
                noWrap
                component={Link}
                to={"/products"}
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
                PRODUCTS
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ borderRightWidth: 3, bgcolor: "white" }} />
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
                PROFILE
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ borderRightWidth: 3, bgcolor: "white" }} />
                <Badge badgeContent={getTotal(cart.products)} color="primary">
                  <Typography
                  variant="h6"
                  noWrap
                  component={Link}
                  to={"/cart"}
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
                    CART
                  </Typography>
                </Badge>
            </Toolbar>
        </AppBar>
      </Box>
    )
}

export default AppBarCustom;