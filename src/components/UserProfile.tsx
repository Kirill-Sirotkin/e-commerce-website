import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { authenticateUser, logOutUser, promoteToAdmin, refreshUser } from "../reducers/userReducer";
import User from "../types/User";
import CreateProductButton from "./CreateProductButton";

const UserProfile = (props: User) => {
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem("refresh_token");
        if (token) dispatch(refreshUser({access_token: "", refresh_token: token}))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
    
    useEffect(() => {
        if (user.tokens) dispatch(authenticateUser(user.tokens))

    }, [dispatch, user.tokens])

    const logOut = () => {
        dispatch(logOutUser());
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }

    const becomeAdmin = () => {
        dispatch(promoteToAdmin());
    }

    return (
        <Box sx={{ display: "flex", padding: "10em 7em", justifyContent: "space-between" }}>
            <Box>
                <Box sx={{ display: "flex", gap: "3em", alignItems: "center"}}>
                    <Avatar alt="Avatar" src={props.avatar} sx={{ width: 100, height: 100 }} />
                    <Box>
                    <Typography
                    variant="h2"
                    component={'span'}
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
                    {props.name}
                    </Typography>
                    <Typography
                    variant="h5"
                    component={'span'}
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
                    {props.email}
                    </Typography>
                    <Typography
                        variant="h5"
                        component={'span'}
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 900,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        >
                        {props.role}
                    </Typography>
                    </Box>
                </Box>
                <Box>
                    <Button variant="contained" onClick={logOut}>Log out</Button>
                </Box>
            </Box>
            <Box>
                <Button sx={{ marginBottom: "2em" }} variant="contained" onClick={becomeAdmin}>
                    Become admin! (temporarily)
                </Button>
                <CreateProductButton {...props} />
            </Box>
        </Box>
    )
}

export default UserProfile;