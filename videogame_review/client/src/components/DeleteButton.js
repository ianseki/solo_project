import { navigate } from '@reach/router';
import axios from 'axios';
import React from 'react';


const DeleteButton = (props) => 
{
    const { _id, gamesList, setGamesList } = props;

    const deleteFilter = (_id) =>
    {
        setGamesList(gamesList.filter( (game, index) => game._id !== _id) )
    }

    const deleteHandler = () => 
    {
        axios.delete(`http://localhost:8000/api/games/${_id}`)
            .then((response) => 
            {
                console.log(response);
                console.log(response.data);

                if ( gamesList )
                {
                    deleteFilter(_id)
                }
                else
                { 
                    navigate("/home")
                }
            })
            .catch( (error) =>
            {
                console.log(error);
            }) 

    }

    return(
        <button onClick={deleteHandler}>Delete</button>
    )
}

export default DeleteButton;