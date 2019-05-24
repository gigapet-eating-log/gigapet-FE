import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AuthPage from './components/AuthPage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import TopBar from './components/TopBar';
import AddEntry from './components/AddEntry';
import ManageAccount from './components/ManageAccount';
import History from './components/History';
import PrivateRoute from './components/PrivateRoute';
import PrivateRoute2 from './components/PrivateRoute2';
import SortDateForm from './components/SortDateForm';
import SortDateFormSpecific from './components/SortDateFormSpecific';

function App() {
  return (
    <div className="App">
      <Router>
        <TopBar />
        <Route path='/auth' component={AuthPage} />
        <Route path='/login' component={LogIn} />
        <Route path='/signUp' component={SignUp} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute2 path="/add-entry" component={AddEntry}/>
        <PrivateRoute2 path="/manage-account" component={ManageAccount}/>
        <PrivateRoute2 path="/history" component={History}/>
        <PrivateRoute2 path="/history/day" component={SortDateForm}/>
        <PrivateRoute2 path="/history/specific" component={SortDateFormSpecific}/>
      </Router>
    </div>
  );
}

export default App;

