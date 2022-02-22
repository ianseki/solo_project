import React from "react";
import { navigate } from "@reach/router";

const Form = (props) =>
{

    const { submitHandler, game, setGame, errors, setErrors} = props;

    const inputHandler = (event) =>
    {
        let newStateObject = {...game};
        newStateObject[event.target.name] = event.target.value;
        setGame(newStateObject);
    }

    return (
        <div>
            <form
                className="formCSS"
                onSubmit={submitHandler}>
                <div>
                    <p>
                        <label>Game Title</label><br />
                        <input 
                            type="text" 
                            name="title"
                            value={game.title}
                            onChange = {inputHandler}/>
                        {errors.title ? <span>{errors.title.message}</span> : null}
                    </p>
                    <p>
                        <label>Genre</label><br />
                        <select name="genre"
                                value={game.genre} 
                                onChange={inputHandler}>
                            <option value="none" defaultValue hidden>Select a Genre</option>
                            <option value="Action">Action</option>
                            <option value="Platformer">Platformer</option>
                            <option value="Survival">Survival</option>
                            <option value="RPG">RPG</option>
                            <option value="FPS">FPS</option>
                            <option value="RTS">RTS</option>
                            <option value="MMO">MMO</option>
                            <option value="Puzzle">Puzzle</option>
                            <option value="Sports">Sports</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Children's">Children's</option>
                        </select>
                        {errors.genre ? <span>{errors.genre.message}</span> : null}
                    </p>
                    <p>
                        <label>Cover Image</label><br />
                        <input 
                            type="text" 
                            name="image"
                            value={game.image}
                            onChange = {inputHandler}/>
                        {errors.image ? <span>{errors.image.message}</span> : null}
                    </p>
                    <p>
                        <label>Score</label><br />
                        <input 
                            type="number" 
                            name="score"
                            value={game.score}
                            onChange = {inputHandler}/>
                        {errors.score ? <span>{errors.score.message}</span> : null}
                    </p>
                    <div id="buttonSpace">
                        <input type="submit" />
                        <button onClick={ (event) => navigate(`/game/${game._id}`)}>
                            Cancel
                        </button>
                    </div>
                </div>
                <div>
                    <p>
                        <label>Review</label><br />
                        <textarea 
                            rows="4"
                            columns="10"
                            name="review"
                            value={game.review}
                            onChange = {inputHandler} />
                        {errors.review ? <span>{errors.review.message}</span> : null}
                    </p>
                </div>
                
            </form>
        </div>
    )
}

export default Form;