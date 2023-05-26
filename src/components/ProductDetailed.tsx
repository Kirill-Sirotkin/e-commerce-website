import React, { useEffect } from "react";
import { useParams } from "react-router";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { getProductById } from "../reducers/productReducer";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { addProductToCart } from "../reducers/cartReducer";

const ProductDetailer = () => {
    const {id} = useParams();
    const products = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) return;
        dispatch(getProductById(parseInt(id)))
    }, [dispatch, id])

    return (
        <Box sx={{ padding: "8em 5em"}}>
            <Container sx={{padding: "2em", bgcolor: "#282c34", marginTop: "2em", textAlign: "left"}}>
                <Box sx={{ display: "flex" }}>
                    <Avatar 
                        sx={{ height: "400px", width: "400px" }} 
                        alt="Product image"
                        src={products.productById?.images.at(0)}
                        variant="square" 
                    />
                    <Box sx={{ marginLeft: "2em" }}>
                        <Typography
                        variant="h3"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'white',
                            textDecoration: 'none',
                            marginBottom: "1em"
                        }}
                        >
                        {products.productById?.title}
                        </Typography>
                        <Typography variant="h5" component="div" color="white">
                            {products.productById?.description}
                        </Typography>
                        <Typography variant="h6" component="div" color="white">
                            Category: {products.productById?.category.name}
                        </Typography>
                        <Typography variant="h6" component="div" color="white">
                            Price: {products.productById?.price}$
                        </Typography>
                        <Button size="large" sx={{ color: "#3AB8FF"}} onClick={() => {
                            if (products.productById) dispatch(addProductToCart(products.productById.id))
                        }}>Add to cart</Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default ProductDetailer;