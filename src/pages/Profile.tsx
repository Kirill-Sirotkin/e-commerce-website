import React, { useEffect } from "react";
import Box from "@mui/material/Box";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import UserForm from "../components/UserForm";
import { authenticateUser } from "../reducers/userReducer";

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
        <Box>
            Profile!
        </Box>
    )
}

export default Profile;