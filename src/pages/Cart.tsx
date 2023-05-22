import React, { FormEvent, useState } from "react";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import Product from "../types/Product";
import { addProductToCart, removeProductFromCart, updateCartProduct } from "../reducers/cartReducer";

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

        dispatch(addProductToCart(product))
    }
    const removeProduct = () => {
        dispatch(removeProductFromCart(productId))
    }
    const changeCount = () => {
        dispatch(updateCartProduct({id: productId, count: productCount}))
    }
    const infoButton = () => {
        console.log(cart.products);
    }
    const submitProductInfo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("id: ", productId)
        console.log("count: ", productCount)
    }

    return (
        <div>
            Cart page
            <form onSubmit={(e) => submitProductInfo(e)}>
                <input
                    placeholder="Product ID"
                    onChange={(e)=> setProductId(parseInt(e.target.value))} 
                />
                <input
                    placeholder="Count"
                    onChange={(e)=> setProductCount(parseInt(e.target.value))} 
                />
                <button type="submit">submit</button>
            </form>
            <button onClick={addProduct}>Add</button>
            <button onClick={removeProduct}>Remove</button>
            <button onClick={changeCount}>Change</button>
            <button onClick={infoButton}>Info</button>
        </div>
    )
}

export default Cart;