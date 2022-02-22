const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (request, response) =>
{
    const user = new User(request.body);

    user.save()
        .then( (newUser) =>
        {
            console.log(newUser);
            console.log("Sucessfully registered");
            response.json(
                {
                    successMessage: "Thank you for registering",
                    user: newUser
                }
            );
        })
        .catch( (error) => 
        {
            console.log("Registration not successful")
            response.status(400).json(error);
        })
}

const login = (request, response) =>
{
    User.findOne( {email: request.body.email} )
        .then( (userRecord) =>
        {
            if ( userRecord === null )
            {
                response.status(400).json( {message: "Invalid login attempt"} )
            }
            else
            {
                bcrypt.compare(request.body.password, userRecord.password)
                    .then( (isPasswordValid) =>
                    {
                        if (isPasswordValid)
                        {
                            console.log("Password is valid");

                            response.cookie(
                                "usertoken",
                                jwt.sign (
                                    {
                                        id: userRecord._id,
                                        userName: userRecord.userName,
                                        email: userRecord.email
                                    },
                                    process.env.JWT_SECRET
                                ),
                                {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 9000000)
                                },
                            ).json ( 
                            {
                                message: "Successfully logged in",
                                userLoggedId: userRecord.userName,
                                userId: userRecord._id
                            })
                        }
                        else
                        {
                            response.status(400).json(
                            {
                                message: "Email and/or password invalid"
                            })
                        }
                    })
                    .catch( (error) =>
                    {
                        console.log(error);
                        response.status(400).json( 
                        {
                            messsage: "Invalid attempt"
                        });
                    })
            }
        })
        .catch( (error) =>
        {
            console.log(error);
            response.status(400).json( 
            {
                messsage: "Invalid attempt"
            });
        })
}

const logout = (request, response) =>
{
    console.log("Logging out");
    response.clearCookie("usertoken");
    response.json(
        {
            message: "You have successfully logged out"
        })
}

const getLoggedInUser = (request, response) =>
{
    User.findOne( {_id: request.jwtpayload.id})
        .then( user => response.json(user))
        .catch( error => response.json(error))
}

const getAllUsers = (request, response) =>
{
    User.find()
        .then( (allUsers) =>
        {
            response.json(allUsers);
        })
        .catch( (error) =>
        {
            console.log("No users found");
            response.json( {message: "Something when wrong in findAll", error: error})
        })
}

module.exports = 
{
    register,
    login,
    logout,
    getLoggedInUser,
    getAllUsers
}