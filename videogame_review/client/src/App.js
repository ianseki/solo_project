import './App.css';
import { Router } from '@reach/router';
import AllGames from './components/AllGames';
import CreateReview from './components/CreateReview';
import OneReview from './components/OneReview';
import UpdateReview from './components/UpdateReview';
import RegistrationLogin from './views/RegistrationLogin';


function App() {
  return (
    <div>
      <Router>
        <RegistrationLogin path="/" />
        <AllGames path="/home" />
        <CreateReview path="/create" />
        <OneReview path="/game/:_id" />
        <UpdateReview path="/game/update/:_id" />
      </Router>
    </div>
  );
}

export default App;
