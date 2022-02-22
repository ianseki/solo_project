import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const OneReview = (props) =>
{
    const {_id} = props;

    const [review, setReview] = useState({});
    const [user, setUser] = useState({});

    let checkUser = false;
    
    if(user._id === review.createdBy)
    {
        checkUser = true;
    }

    useEffect( () =>
    {
        axios.get(`http://localhost:8000/api/games/${_id}`)
            .then( (response) =>
            {
                console.log(response);
                console.log(response.data);
                setReview(response.data);
            })
            .catch( (error) =>
            {
                console.log(error)
            });

    }, [_id])

    const logout = (event) =>
    {
        axios.post("http://localhost:8000/api/users/logout",
                    {},
                    {withCredentials: true})
            .then( (response) =>
            {
                console.log(response);
                console.log(response.data);
                navigate("/");
            })
            .catch( (error) =>
            {
                console.log(error);
            })
    }

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

    return (
        <div className="container">
            <header>
                <h1>Game Review</h1>
                <button>
                    <Link to={"/home"}>Dashboard</Link>
                </button>
                <button onClick={logout}>Log Out</button>
            </header>
            <h2>Details about {review.title}</h2>

            <table>
                <tbody>
                    <tr>
                        <th>Genre: </th>
                        <td>{review.genre}</td>
                    </tr>
                    <tr>
                        <th>Cover: </th>
                        <td>
                            <img 
                                src={review.image} 
                                alt="game cover" 
                                style={{width:"150px", height:"150px"}} />
                        </td>
                    </tr>
                    <tr>
                        <th>Score: </th>
                        <td>{review.score}</td>
                    </tr>
                    <tr>
                        <th>Review: </th>
                        <td>{review.review}</td>
                    </tr>
                </tbody>
            </table>
            {
                checkUser? 
                    <button onClick={()=>{navigate(`/game/update/${review._id}`)}}>Edit</button>
                :null
            }
                <button>
                    <Link to="/home">
                        Cancel
                    </Link>
                </button>
            
        </div>
    )
}

export default OneReview;