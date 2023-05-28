import React, { useEffect } from "react";
import Box from "@mui/material/Box";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import UserForm from "../components/UserForm";
import { authenticateUser, logOutUser, refreshUser } from "../reducers/userReducer";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Profile = () => {
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem("refresh_token");
        if (token) dispatch(refreshUser({access_token: "", refresh_token: token}))
        .then(() => {
            console.log("refresh 1/2")
            if (user.tokens) {
                console.log("refresh 2/2")
            }
        })

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
    
    if (!user.currentUser) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "7em" }}>
                <UserForm />
            </Box>
        )
    }
    return (
        <Box sx={{ padding: "10em 7em" }}>
            <Box sx={{ display: "flex", gap: "3em", alignItems: "center"}}>
                <Avatar alt="Avatar" src={user.currentUser.avatar} sx={{ width: 100, height: 100 }} />
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
                {user.currentUser.name}
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
                {user.currentUser.email}
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
                    {user.currentUser.role}
                </Typography>
                </Box>
            </Box>
            <Box>
                <Button variant="contained" onClick={logOut}>Log out</Button>
            </Box>
        </Box>
    )
}

export default Profile;