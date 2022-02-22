import Login from "../components/Login";
import Register from "../components/Register";


const RegistrationLogin = (props) =>
{

    return(    
        <div>
            <h1 id="titleCard">Review a Game Website</h1>
            <div className="homePage">
                <Register />
                <Login />
            </div>
        </div>
    )
}

export default RegistrationLogin;