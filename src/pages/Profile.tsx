import React, { useEffect } from "react";
import Box from "@mui/material/Box";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import UserForm from "../components/UserForm";
import { authenticateUser } from "../reducers/userReducer";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Profile = () => {
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) dispatch(authenticateUser({access_token: token, refresh_token: ""}))
    }, [dispatch])
    
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
        </Box>
    )
}

export default Profile;