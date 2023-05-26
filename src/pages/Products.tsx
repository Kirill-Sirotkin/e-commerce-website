import React, { FormEvent, useEffect, useState } from "react";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { createProduct, deleteProduct, getAllProducts, sortProducts, updateProduct } from "../reducers/productReducer";
import ProductCreateInfo from "../types/ProductCreateInfo";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";

const Products = () => {
    const products = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();

    const [sortSelection, setSortSelection] = useState<string>("");

    const [productId, setProductId] = useState<number>(0);
    const [productTitle, setProductTitle] = useState<string>("");

    useEffect(() => {
        dispatch(getAllProducts());
        console.log("fetching...")
    }, [dispatch])

    const getAll = () => {
        dispatch(getAllProducts());
    }
    const createPr = () => {
        const product: ProductCreateInfo = {
            title: productTitle,
            price: 100,
            description: "Test product!",
            images: ["https://api.lorem.space/image/shoes?w=640&h=480&r=4508"],
            categoryId: 1
        }

        dispatch(createProduct(product));
    }
    const updatePr = () => {
        const product = {
            title: productTitle,
            price: 200
        }

        dispatch(updateProduct({product, id: productId}));
    }
    const deletePr = () => {
        dispatch(deleteProduct(productId));
    }

    const sortChange = (event: SelectChangeEvent) => {
        switch(event.target.value) {
        case "price":
            dispatch(sortProducts("price"));
          break;
        case "category":
            dispatch(sortProducts("category"));
          break;
      }
      setSortSelection(event.target.value);
    };

    return (
        <Box sx={{ padding: "5em 7em", backgroundColor: "beige", height: "100%", color: "#050035" }}>
            <Box sx={{ display: "flex", gap: "2em" }}>
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
                    Products
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 140 }} variant="standard">
                    <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortSelection}
                    label="Sort by"
                    onChange={sortChange}
                    >
                    <MenuItem value={"price"}>Price</MenuItem>
                    <MenuItem value={"category"}>Category</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ marginTop: "3em" }}>
                <Grid container justifyContent="start" spacing={3}>
                    {products.products.map(prod => (
                        <Grid key={prod.id} item xs={4}>
                            <ProductCard {...prod}></ProductCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default Products;