import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import ProductCreateInfo from "../types/ProductCreateInfo";
import { createProduct } from "../reducers/productReducer";
import User from "../types/User";


const CreateProductButton = (props: User) => {
    const products = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 3,
    };

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [productTitle, setProductTitle] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productCategoryId, setProductCategoryId] = useState<number>(1);

    const submitNewProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newProduct: ProductCreateInfo = 
        {
        title: productTitle,
        price: productPrice,
        description: productDescription,
        categoryId: productCategoryId,
        images: ["https://placeimg.com/640/480/any"]
        }

        console.log(newProduct);

        dispatch(createProduct(newProduct));
        console.log("CREATE PRODUCT!");
    }

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    if (props.role !== "admin")
    return (
        <Box></Box>
    )
    return (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button variant="contained" onClick={handleModalOpen}>Create product</Button>
            <Modal 
                open={modalOpen} 
                onClose={handleModalClose} 
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ style }>
                    <Typography
                        variant="h5"
                        component={'span'}
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 900,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            marginBottom: "1em"
                        }}
                        >
                        Create product
                    </Typography>
                    <form onSubmit={(e) => submitNewProduct(e)} style={{ width: "100%", boxSizing: "border-box" }}>
                        <FormControl 
                            sx={{ gap: "1em", justifyContent: "center", width: "100%", boxSizing: "border-box", }}
                        >
                            <TextField 
                            id="standard-basic-title" 
                            label="Title" 
                            variant="standard" 
                            onChange={(e) => {e.preventDefault(); setProductTitle(e.target.value)}}
                            />
                            <TextField
                            id="standard-basic-price"
                            label="Price ($)"
                            type="number"
                            variant="standard"
                            onChange={(e) => {e.preventDefault(); setProductPrice(parseInt(e.target.value))}}
                            />
                            <TextField
                            id="standard-basic-description"
                            label="Description"
                            type="standard"
                            variant="standard"
                            onChange={(e) => {e.preventDefault(); setProductDescription(e.target.value)}}
                            />
                            <TextField
                            id="standard-basic-category"
                            label="Category ID"
                            type="number"
                            variant="standard"
                            onChange={(e) => {e.preventDefault(); setProductCategoryId(parseInt(e.target.value))}}
                            />
                            <Typography
                            component={'span'}
                            color={"red"}
                            fontSize={14}
                            fontWeight={"bold"}
                            >
                                {products.createResultMessage}
                            </Typography>
                            <Button type='submit'>
                                Create
                            </Button>
                        </FormControl>
                    </form>
                </Box>   
            </Modal>
        </Box>
    )
}

export default CreateProductButton;