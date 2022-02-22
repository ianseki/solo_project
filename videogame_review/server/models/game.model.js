const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
    {
        title: 
        {
            type: String,
            required: [true, "Game titled required"],
            minlength: [3, "Game titled must be at least 3 characters"]
        },

        genre:
        {
            type: String,
            required: [true, "Game needs gnere"],
            enum: [
                "Action",
                "Adventure",
                "RTS",
                "Platformer",
                "RPG",
                "FPS",
                "RTS",
                "MMO",
                "Sports",
                "Children's",
                "Puzzle"
            ]
        },

        review:
        {
            type: String,
            reqired: [true, "Needs to have a review"]
        },

        image: 
        {
            type: String,
            required: [true, "Need a picture"]
        },

        score:
        {
            type: Number
        },

        createdBy: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true}

)

const Game =  mongoose.model("Game",  GameSchema);

module.exports = Game;