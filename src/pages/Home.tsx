import React from "react";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { loginUser, registerUser } from "../reducers/userReducer";

const Home = () => {
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const registerBtn = () => {
        dispatch(registerUser({
            name: "John",
            email: "John@mail.com",
            avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
            password: "1234"
        }))
    }
    const loginBtn = () => {
        if (user.currentUser === null) return;
        if (user.currentUser === undefined) return;

        dispatch(loginUser({
            email: user.currentUser.email,
            password: user.currentUser.password
        }))
    }
    const infoBtn = () => {
        console.log(user);
    }

    return (
        <div>
            Home page
            <button onClick={registerBtn}>Register</button>
            <button onClick={loginBtn}>Login</button>
            <button onClick={infoBtn}>Info</button>
        </div>
    )
}

export default Home;