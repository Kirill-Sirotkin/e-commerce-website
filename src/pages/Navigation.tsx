import React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router";

import AppBarCustom from "../components/AppBarCustom";

const Navigation = () => {
    return (
        <Box>
            <AppBarCustom />
            <Outlet />
        </Box>
    )
}

export default Navigation;