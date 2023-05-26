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

const ProductCard = (props: Product) => {
    return (
        <Card sx={{ bgcolor: "#3d434f", color: "white", height: "450px" }}>
            <CardHeader
            title={props.title}
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
                <Button component={Link} to={`/product/${props.id}`} size="large">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;