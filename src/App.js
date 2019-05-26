import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import TopBar from './components/TopBar';
import AddEntry from './components/AddEntry';
import ManageAccount from './components/ManageAccount';
import PrivateRoute from './components/PrivateRoute';
import PrivateRoute2 from './components/PrivateRoute2';
import SortFormAdvanced from './components/SortFormAdvanced';
import EditEntry from './components/EditEntry';
import DragonLair from './components/DragonLair';
import Incubator from './components/Incubator';


function App() {
  return (
    <div className="App">
      <Router>
        <TopBar />
        <Route path='/login' component={LogIn} />
        <Route path='/signUp' component={SignUp} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute2 path="/add-entry" component={AddEntry}/>
        <PrivateRoute2 path="/manage-account" component={ManageAccount}/>
        <PrivateRoute2 path="/history" component={SortFormAdvanced}/>
        <Route path="/edit-entry" render={props => (<EditEntry {...props} stateRouter={props.location.state} />)}/>
        <PrivateRoute path="/secret" component={DragonLair}/>
        <PrivateRoute path="/incubator" component={Incubator}/>

      </Router>
    </div>
  );
}


export default App;

