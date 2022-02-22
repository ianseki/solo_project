import React, { useState } from 'react'
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import Form from './Form';

const CreateReview = (props) => 
{
    const [errors, setErrors] = useState({});
    
    const [newGame, setNewGame] = useState({
        title: "",
        genre: "",
        review: "",
        image: "",
        score: ""
    })

    const newHandler = (event) => 
    {
        event.preventDefault();

        axios.post('http://localhost:8000/api/games',
        newGame,
        {
            withCredentials: true
        })
        .then ( (response) =>
            {
                console.log(response);
                console.log(response.data);
                
                setNewGame (
                    {
                        title: "",
                        genre: "",
                        review: "",
                        image: "",
                        score: ""
                    })
                
                navigate("/home");
            })
        .catch ( (error) => 
            {
                console.log(error);
                setErrors(error.response.data.errors);
            });
    }

    return (
        <div className="container">
            <header>
                <h1>Game Review</h1>
                <Link to={"/home"}>Home</Link>
            </header>
            <h3>Write your review: </h3>
            
            <Form game={newGame} setGame={setNewGame} submitHandler={newHandler} errors={errors}/>

        </div>
    )
}

export default CreateReview;