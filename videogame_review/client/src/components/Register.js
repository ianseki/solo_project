import axios from "axios";
import { useState } from "react";


const Register = (props) =>
{
    const [confrimRegister, setConfirmRegister] = useState("");
    const [errors, setErrors] = useState({});

    const [user, setUser] = useState(
    {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    
    const handleChange = (event) =>
    {
        setUser(
        {
            ...user,
            [event.target.name]: event.target.value,
        });
    }

    const register = (event) =>
    {
        event.preventDefault();

        axios.post("http://localhost:8000/api/users/register", 
        user,
        {
            withCredentials: true
        })
            .then( (response) =>
            {
                console.log(response.data);
                setUser(
                {
                    firstName: "",
                    lastName: "",
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                setConfirmRegister(
                    "Thank you for registering"
                );
                setErrors({});
            })
            .catch( (error) =>
            {
                console.log(error);
                setErrors(error.response.data.errors);
            })
    }


    return (
        <div>
            <h1>Registration</h1>
            <form onSubmit={register}>
                <div>
                    <label>First Name</label>
                    {errors.firstName ?
                        (<span>{errors.firstName.message}</span>)
                        : null
                    }
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={ (event) => handleChange(event)} 
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    {errors.lastName ?
                        (<span>{errors.lastName.message}</span>)
                        : null
                    }
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={ (event) => handleChange(event)} 
                    />
                </div>
                <div>
                    <label>User Name</label>
                    {errors.userName ?
                        (<span>{errors.userName.message}</span>)
                        : null
                    }
                    <input
                        type="text"
                        name="userName"
                        value={user.userName}
                        onChange={ (event) => handleChange(event)} 
                    />
                </div>
                <div>
                    <label>Email</label>
                    {errors.email ?
                        (<span>{errors.email.message}</span>)
                        : null
                    }
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={ (event) => handleChange(event)} 
                    />
                </div>
                <div>
                    <label>Password</label>
                    {errors.password ?
                        (<span>{errors.password.message}</span>)
                        : null
                    }
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={ (event) => handleChange(event)} 
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    {errors.confirmPassword ?
                        (<span>{errors.confirmPassword.message}</span>)
                        : null
                    }
                    <input
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={ (event) => handleChange(event)} 
                    />
                </div>
                <div>
                    <button>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;