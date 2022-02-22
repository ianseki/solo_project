import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';

const AllGames = (props) => 
{
    const [gamesList, setGamesList] = useState([]);
    const [user, setUser] = useState({});
    
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

    useEffect ( () =>
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
    
    return (
        <div className="container">
            <header className="defaultHead">
                <h1>Game List</h1>
                <h2>Welcome {user.firstName} {user.lastName}</h2>
                <button onClick={logout}>Log Out</button>
            </header>
            <h3>Games Reviewed</h3>
            <table>
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Cover
                        </th>
                        {/* <th>
                            Actions
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        gamesList?
                        // If
                        gamesList.map ( (game, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to={`/game/${game._id}`}>
                                        {game.title}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/game/${game._id}`}>
                                        <img 
                                            src={game.image} 
                                            alt="game cover" 
                                            style={{width: "150px", height: "150px"}}/>
                                    </Link>
                                </td>
                                <td>
                                    {/* <button
                                        onClick={()=>{navigate(`/game/update/${game._id}`)}}>
                                        Edit
                                    </button>
                                    <DeleteButton 
                                        _id={game._id} 
                                        gamesList={gamesList} 
                                        setGamesList={setGamesList}/> */}
                                </td>
                            </tr>
                        ))

                        // Else
                        :null
                    }
                </tbody>
            </table>
            <Link to={"/create"}>Create a Review</Link>
        </div>
    )
}

export default AllGames;