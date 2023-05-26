import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from "react-router-dom";
import Slide from "@mui/material/Slide";

const Home = () => {
    const containerRef = useRef(null);

    return (
        <Box sx={{ padding: "5em 7em", height: "100%", color: "#050035", overflow: "hidden" }} ref={containerRef}>
            <Box sx={{ height: "auto", overflow: "hidden" }}>
                <Slide direction="up" in={true} container={containerRef.current} timeout={350}>
                    <Typography
                    variant="h1"
                    noWrap
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
                        Awesome
                    </Typography>
                </Slide>
            </Box>
            <Box sx={{ height: "auto", overflow: "hidden" }}>
                <Slide direction="down" in={true} container={containerRef.current} timeout={350}>
                    <Typography
                    variant="h1"
                    noWrap
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
                        E-commerce store
                    </Typography>
                </Slide>
            </Box>
            <Box sx={{ height: "auto", overflow: "hidden" }}>
                <Slide direction="right" in={true} container={containerRef.current} timeout={350}>
                    <Button 
                        sx={{ marginTop: "4em" }} 
                        component={Link} 
                        to={"/products"} 
                        variant="contained" 
                        size="large" 
                        endIcon={<ArrowForwardIosIcon fontSize="small" />}>
                        <Typography
                        variant="h6"
                        noWrap
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
                            BROWSE PRODUCTS
                        </Typography>
                    </Button>
                </Slide>
            </Box>
        </Box>
    )
}

export default Home;