import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AuthPage from './components/AuthPage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <h1>TESTING FROM APP</h1>
      <Router>

        <Route  path='/' component={AuthPage} />
        <Route  path='/login' component={LogIn} />
        <Route  path='/signUp' component={SignUp} />
        <Route exact path='/home' component={Home} />
      </Router>
    </div>
  );
}

export default App;

