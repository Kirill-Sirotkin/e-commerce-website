import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";

import Product from "../types/Product";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { CartProduct, removeProductFromCart, updateCartProduct } from "../reducers/cartReducer";
import axios, { AxiosError } from "axios";
import Box from "@mui/material/Box";
import { AddCircleOutlined, DeleteOutlineOutlined, RemoveCircleOutlined } from "@mui/icons-material";

const ProductStackItem = (props: CartProduct) => {
    const cart = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch();

    const [product, setProduct] = useState<Product>({
        id: -1,
        title: "",
        price: 0,
        description: "",
        category: {
            id: -1,
            name: "",
            image: ""},
        images: [],
    });
    
    useEffect(() => {
        getProductById(props.productId).then((res) => {
            if (res instanceof AxiosError) {
                console.log(res);
            } else {
                setProduct(res);
            }
        })
    }, [props.productId])
    
    const getProductById = 
        async (id: number) => {
        console.log(`GET PRODUCT: ${id}!`);
        try {
            const result = await axios.get<Product>(
            `https://api.escuelajs.co/api/v1/products/${id}`
            );
            return result.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }

    return (
        <Card sx={{ display: 'flex', bgcolor: "#282c34", justifyContent: "space-between" }}>
            <Box sx={{ display: 'flex' }}>
                <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={product?.images.at(0)}
                alt="Product image"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography color="white" component={Link} to={`/product/${product?.id}`} variant="h5">
                        {product?.title}
                    </Typography>
                    <Typography variant="subtitle1" color="white" component="div">
                        Category: {product?.category.name}
                    </Typography>
                    <Typography variant="subtitle1" color="white" component="div">
                        Price: {product?.price}$
                    </Typography>
                    </CardContent>
                </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "2em" }}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingRight: "3em" }}>
                    <Typography variant="h4" color="white" component="div">
                        Count: {cart.products.find(prod => prod.productId === product?.id)?.count}
                    </Typography>
                    <Box>
                        <Button onClick={() => {dispatch(updateCartProduct({id: product.id, count: -1}))}}>
                            <RemoveCircleOutlined sx={{ color: "white", fontSize: "40px" }} />
                        </Button>
                        <Button onClick={() => {dispatch(updateCartProduct({id: product.id, count: 1}))}}>
                            <AddCircleOutlined sx={{ color: "white", fontSize: "40px" }} />
                        </Button>
                    </Box>
                </Box>
                <Button onClick={() => {dispatch(removeProductFromCart(product.id))}}>
                <DeleteOutlineOutlined sx={{ color: "white", fontSize: "60px" }} />
                </Button>
            </Box>
        </Card>
    )
}

export default ProductStackItem;