const Game = require("../models/game.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const getAllGames = (request, response) =>
{
    Game.find()
        .collation({locale:"en", strength: 2}).sort({type: 1})
        .populate("createdBy", "userName email")
        .then ( (allGames) => 
        {
            response.json(allGames)
        })
        .catch ( (error) => 
            {
                console.log(error);
                response.status(400).json(error);
            }
        );
}

const getGameById = (request, response) =>
{
    const {params} = request;

    Game.findOne( {_id: params._id} )
        .then (
            (oneGame) => response.json(oneGame)
        )
        .catch (
            (error) => 
            {
                console.log(error);
                response.status(400).json(error);
            }
        );
}

const findGamesByUser = (request, response) =>
{
    if (request.jwtpayload.userName !== request.params.userName)
    {
        console.log("not user");
        User.findOne( {userName: request.params.userName} )
            .then( (userNotLogged) => 
            {
                Game.find( {createdBy: userNotLogged._id} )
                    .then( (allGamesFromUser) => 
                    {
                        console.log(allGamesFromUser);
                        response.json(allGamesFromUser);
                    })
                    .catch( (error) =>
                    {
                        console.log(error);
                        response.status(400).json(error);
                    })
            })
            .catch( (error) =>
            {
                console.log(error);
                response.status(400).json(error);
            })
    }
    else
    {
        console.log("User \n", request.jwtpayload.userName);
        Game.find({createdBy: request.jwtpayload.id})
            .populate("createdBy", "userName")
            .then( (loggedUserGames) =>
            {
                console.log(loggedUserGames);
                response.json(loggedUserGames);
            })
            .catch( (error) =>
            {
                console.log(error);
                response.status(400).json(error);
            })
    }
}

const createNewGame = (request, response) =>
{
    const newGameObject = new Game(request.body);

    // const decodedJWT = jwt.decode(request.cookies.usertoken, 
    //     {
    //         complete: true
    //     })

    // newGameObject.createdBy = decodedJWT.payload.id

    newGameObject.createdBy = request.jwtpayload.id

    newGameObject.save()
        .then (
            (newGame) => response.json(newGame)
        )
        .catch (
            (error) => 
            {
                console.log(error);
                response.status(400).json(error);
            }
        );
}

const updateGame = (request, response) =>
{
    Game.findOneAndUpdate( {_id: request.params._id}, 
        request.body,
        {
            new: true,
            runValidators: true
        })
        .then (
            (updatedGames) => response.json(updatedGames)
        )
        .catch(
            (error) => 
            {
                console.log(error);
                response.status(400).json(error);
            }
        );
}   

const deleteGame = (request, response) =>
{
    Game.deleteOne( {_id: request.params._id} )
        .then (
            (deletedGame) => response.json(deletedGame)
        )
        .catch (
            (error) => 
            {
                console.log(error);
                response.status(400).json(error);
            }
        );
}

module.exports = 
{
    getAllGames,
    getGameById,
    findGamesByUser,
    createNewGame,
    updateGame,
    deleteGame
}