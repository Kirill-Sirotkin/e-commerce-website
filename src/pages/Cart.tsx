import React, { FormEvent, useEffect, useState } from "react";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import Product from "../types/Product";
import { addProductToCart, getTotal, removeProductFromCart, updateCartProduct } from "../reducers/cartReducer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ProductStackItem from "../components/ProductStackItem";
import { getProductById } from "../reducers/productReducer";

const Cart = () => {
    const cart = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch();

    const [productId, setProductId] = useState<number>(0);
    const [productCount, setProductCount] = useState<number>(0);
    
    const addProduct = () => {
        const product: Product = {
            id: productId,
            title: "placeholder",
            price: 0,
            category: {id: 0, name: "mock", image:""},
            description: "",
            images: [],
        }

        dispatch(addProductToCart(product.id))
    }
    const removeProduct = () => {
        dispatch(removeProductFromCart(productId))
    }
    const changeCount = () => {
        dispatch(updateCartProduct({id: productId, count: productCount}))
    }

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