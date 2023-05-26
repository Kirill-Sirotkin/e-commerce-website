import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { loginUser, registerUser } from "../reducers/userReducer";
import { Link } from "react-router-dom";
import Slide from "@mui/material/Slide";

const Home = () => {
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const containerRef = useRef(null);

    const registerBtn = () => {
        dispatch(registerUser({
            name: "John",
            email: "John@mail.com",
            avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
            password: "1234"
        }))
    }
    const loginBtn = () => {
        if (user.currentUser === null) return;
        if (user.currentUser === undefined) return;

        dispatch(loginUser({
            email: user.currentUser.email,
            password: user.currentUser.password
        }))
    }
    const infoBtn = () => {
        console.log(user);
    }

    return (
        <Box sx={{ padding: "5em 7em", backgroundColor: "beige", height: "100%", color: "#050035", overflow: "hidden" }} ref={containerRef}>
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
                        to={"/product"} 
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