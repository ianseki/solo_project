import { navigate } from "@reach/router";
import axios from "axios";
import React, { useState } from "react";


const Login = (props) => 
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/users/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                },
            )
            .then( (response) => 
            {
                console.log(response);
                console.log(response.data);
                navigate("/home");
            })
            .catch( (error) => 
            {
                console.log(error.response.data);
                setErrorMessage(error.response.data.message);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <p>{errorMessage ? errorMessage : ""}</p>
            <form onSubmit={login}>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button>Sign In</button>
                </div>
            </form>
        </div>
    );
};

export default Login