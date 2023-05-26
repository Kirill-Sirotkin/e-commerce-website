import React from "react";
import useAppSelector from "../hooks/useAppSelector";
import { getTotal } from "../reducers/cartReducer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import ProductStackItem from "../components/ProductStackItem";

const Cart = () => {
    const cart = useAppSelector(state => state.cartReducer);
    
    return (
        <Box sx={{ padding: "8em 7em", backgroundColor: "beige", height: "100%", color: "#050035" }}>
            <Typography
            variant="h3"
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
                Cart: {getTotal(cart.products)} items
            </Typography>
            <Stack spacing={2} sx={{ marginTop: "2em" }}>
                {cart.products.map(prod => (
                    <ProductStackItem {...prod} />
                ))}
            </Stack>
        </Box>
    )
}

export default Cart;