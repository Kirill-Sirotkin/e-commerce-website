import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import Product from "../types/Product";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import useAppDispatch from "../hooks/useAppDispatch";
import { addProductToCart } from "../reducers/cartReducer";

const ProductCard = (props: Product) => {
    const dispatch = useAppDispatch();
    
    return (
        <Card sx={{ bgcolor: "#3d434f", color: "white", height: "450px", minWidth: "415px" }}>
            <CardHeader 
            component={Link} 
            to={`/product/${props.id}`}
            title={props.title}
            sx={{ color: "white" }}
            />
            <CardMedia
            component="img"
            height="200"
            image={props.images.at(0)}
            alt="Product image"
            />
            <CardContent sx={{ textAlign: "left" }}>
                <Typography sx={{ fontSize: 24 }} color="white" gutterBottom>
                    Category: {props.category.name}
                </Typography>
                <Typography sx={{ mb: 1.5, fontSize: 24 }} color="white">
                    Price: {props.price}$
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="large" sx={{ color: "#3AB8FF"}} onClick={() => dispatch(addProductToCart(props.id))}>Add to cart</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;