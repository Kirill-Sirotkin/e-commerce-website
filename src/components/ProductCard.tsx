import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

import Product from "../types/Product";
import useAppDispatch from "../hooks/useAppDispatch";
import { addProductToCart } from "../reducers/cartReducer";
import ProductSettings from "./ProductSettings";
import useAppSelector from "../hooks/useAppSelector";
import User from "../types/User";

const ProductCard = (props: Product) => {
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const dummyUser: User = {
        id: 0,
        name: "",
        role: "customer",
        email: "",
        password: "",
        avatar: ""
    }
    
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
            <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button size="large" sx={{ color: "#3AB8FF"}} onClick={() => dispatch(addProductToCart(props.id))}>Add to cart</Button>
                <Box>
                    {/* <ProductSettings {...userInfo: user.currentUser ? user.currentUser : dummyUser, productInfo: } /> */}
                    <ProductSettings {...{userInfo: user.currentUser ? user.currentUser : dummyUser, productInfo: props}} />
                </Box>
            </CardActions>
        </Card>
    )
}

export default ProductCard;