import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Form from '../components/Form';
import { Link, navigate } from '@reach/router';
import DeleteButton from './DeleteButton';

const UpdateReview = (props) => 
{
    const {_id} = props;

    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({});
    const [gamesList, setGamesList] = useState([]);

    let checkUser = false;
    
    const [updatedGame, setUpdatedGame] = useState({
        title: "",
        genre: "",
        image: "",
        review: "",
        score: "",
        createdBy: ""
    })

    useEffect( () =>
    {
        axios.get("http://localhost:8000/api/games")
            .then( (response) => 
            {
                console.log(response.data);
                setGamesList(response.data);
            })
            .catch ( (error) => 
            {
                console.log(error);
                
            })
    }, [])

    useEffect( () =>
    {
        axios.get(`http://localhost:8000/api/games/${_id}`)
            .then( (response) =>
            {
                console.log(response);
                console.log(response.data);
                setUpdatedGame(response.data);
            })
            .catch( (error) =>
            {
                console.log(error)
            });

    }, [_id])

    useEffect( () => 
    {
        axios.get("http://localhost:8000/api/users/secure",
        { withCredentials: true })
            .then( (response) =>
            {
                console.log(response.data);
                setUser(response.data);
            })
            .catch( (error) =>
            {
                console.log(error);
            })
    }, []) 

    const updateHandler = (event) => 
    {
        event.preventDefault();

        axios.put(`http://localhost:8000/api/games/${_id}`,
        updatedGame)
        .then ( (response) =>
            {
                console.log(response);
                navigate(`/game/${_id}`);
            })
        .catch ( (error) => 
            {
                console.log(error)
                setErrors(error.response.data.errors);
            });
    }

    if(user._id === updatedGame.createdBy)
    {
        checkUser = true;
    }

    return (
        <div className="container">
            <header>
                <h1>Game Review</h1>
                <Link to={"/home"}>Home</Link>
            </header>
            <h3>Edit {updatedGame.title}</h3>
            
            <Form 
                game={updatedGame} 
                setGame={setUpdatedGame} 
                submitHandler={updateHandler} 
                errors={errors} 
            />
            {checkUser? 
                <DeleteButton 
                    _id={updatedGame._id} 
                    gamesList={gamesList} 
                    setGamesList={setGamesList}/>
            : null
            }


                
        </div>
    )
}

export default UpdateReview;