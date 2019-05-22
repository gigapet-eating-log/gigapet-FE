import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AuthPage from './components/AuthPage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import TopBar from './components/TopBar';
import AddEntry from './components/AddEntry';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <TopBar />
        <Route path='/auth' component={AuthPage} />
        <Route path='/login' component={LogIn} />
        <Route path='/signUp' component={SignUp} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path="/add-entry" component={AddEntry}/>
        <PrivateRoute exact path="/history" component={History}/>
      </Router>
    </div>
  );
}

export default App;

