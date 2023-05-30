import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { Alert, Pagination, Snackbar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { getAllProducts, resetDeleteStatus, setProductsOnPage, sortProducts } from "../reducers/productReducer";
import ProductCard from "../components/ProductCard";

const Products = () => {
    const {page} = useParams();
    const products = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [sortSelection, setSortSelection] = useState<string>("");

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])

    useEffect(() => {
        dispatch(setProductsOnPage(page ? parseInt(page) : 1));
        window.scrollTo(0,0);
    }, [dispatch, page])

    const sortChange = (event: SelectChangeEvent) => {
        switch(event.target.value) {
        case "price":
            dispatch(sortProducts(["price", page ? parseInt(page) : 1]));
          break;
        case "category":
            dispatch(sortProducts(["category", page ? parseInt(page) : 1]));
          break;
      }
      setSortSelection(event.target.value);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        navigate(`/products/${value === 1 ? "" : value}`);
    }

    const handleAlertClose = () => {
        dispatch(resetDeleteStatus());
    }

    return (
        <Box sx={{ padding: "8em 7em", backgroundColor: "beige", height: "100%", color: "#050035" }}>
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
                    {products.productsOnPage.map(prod => (
                        <Grid key={prod.id} item xs={4}>
                            <ProductCard {...prod}></ProductCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Pagination 
                sx={{ display: "flex", justifyContent: "center", marginTop: "3em"}} 
                count={Math.ceil(products.products.length / 12)} 
                onChange={(e, value) => { handlePageChange(e, value) }}
                size="large" 
            />
            <Snackbar open={products.deleteSuccess} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                    Product deleted successfully!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Products;