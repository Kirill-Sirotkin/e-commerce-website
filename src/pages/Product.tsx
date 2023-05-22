import React, { FormEvent, useState } from "react";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { createProduct, deleteProduct, getAllProducts, sortProducts, updateProduct } from "../reducers/productReducer";
import ProductCreateInfo from "../types/ProductCreateInfo";

const Product = () => {
    const products = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();

    const [productId, setProductId] = useState<number>(0);
    const [productTitle, setProductTitle] = useState<string>("");

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
    const sortPrice = () => {
        dispatch(sortProducts("price"));
    }
    const sortCategory = () => {
        dispatch(sortProducts("category"));
    }
    const infoBtn = () => {
        console.log(products.products);
        console.log(products.createdProduct);
        console.log(products.updatedProduct);
        console.log(products.deleteSuccess);
    }
    const submitProductInfo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("id: ", productId)
        console.log("title: ", productTitle)
    }

    return (
        <div>
            Product page
            <button onClick={getAll}>Get all</button>
            <button onClick={infoBtn}>Info</button>
            <form onSubmit={(e) => submitProductInfo(e)}>
                <input
                    placeholder="Product ID"
                    onChange={(e)=> setProductId(parseInt(e.target.value))} 
                />
                <input
                    placeholder="Product Title"
                    onChange={(e)=> setProductTitle(e.target.value)} 
                />
                <button type="submit">submit</button>
            </form>
            <button onClick={createPr}>Create</button>
            <button onClick={updatePr}>Update</button>
            <button onClick={deletePr}>Delete</button>
            <button onClick={sortPrice}>Sort price</button>
            <button onClick={sortCategory}>Sort category</button>
        </div>
    )
}

export default Product;