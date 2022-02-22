const GameController = require("../controllers/game.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.get('/api/games', GameController.getAllGames);
    app.post('/api/games', authenticate, GameController.createNewGame);
    app.get('/api/games/:_id', GameController.getGameById);
    app.get('/api/games/user/:userName', authenticate, GameController.findGamesByUser);
    app.put("/api/games/:_id", GameController.updateGame);
    app.delete("/api/games/:_id", GameController.deleteGame);
}