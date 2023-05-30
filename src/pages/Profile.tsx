import React, { useEffect } from "react";
import Box from "@mui/material/Box";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import UserForm from "../components/UserForm";
import { authenticateUser, refreshUser } from "../reducers/userReducer";
import UserProfile from "../components/UserProfile";

const Profile = () => {
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
    
    if (!user.currentUser) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "7em" }}>
                <UserForm />
            </Box>
        )
    }
    return (
        <Box>
            <UserProfile {...user.currentUser} />
        </Box>
    )
}

export default Profile;