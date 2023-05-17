import React from "react";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { registerUser } from "../reducers/userReducer";

const Home = () => {
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    console.log(user);

    const buttonClick = () => {
        dispatch(registerUser({
            name:"John",
            email:"John@mail",
            avatar:"123",
            password:"123"
        }))
        console.log(user);
    }

    return (
        <div>
            Home page
            <button onClick={buttonClick}>Test!</button>
        </div>
    )
}

export default Home;