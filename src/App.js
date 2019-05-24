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
import SortDateForm from './components/SortDateForm';
import SortDateFormSpecific from './components/SortDateFormSpecific';
import SortDateFormCategory from './components/SortDateFormCategory';
import SortFormAdvanced from './components/SortFormAdvanced';
import EditEntry from './components/EditEntry';


function App() {
  return (
    <div className="App">
      <Router>
        <TopBar />
        <Route path='/auth' component={AuthPage} />
        <Route path='/login' component={LogIn} />
        <Route path='/signUp' component={SignUp} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute path="/add-entry" component={AddEntry}/>
        <PrivateRoute path="/manage-account" component={ManageAccount}/>
        <PrivateRoute path="/history" component={History}/>
        <PrivateRoute path="/history/day" component={SortDateForm}/>
        <PrivateRoute path="/history/specific" component={SortDateFormSpecific}/>
        <PrivateRoute path="/history/category" component={SortDateFormCategory}/>
        <PrivateRoute path="/history/advanced" component={SortFormAdvanced}/>
        
        {/* <PrivateRoute path="/edit-entry" component={EditEntry}/> */}

        <Route path="/edit-entry" render={props => (<EditEntry {...props} stateRouter={props.location.state} />)}/>

      </Router>
    </div>
  );
}

// <Route path='/movies/:id' render={props => (<Movie {...props} addToSavedList={this.addToSavedList} />)} />

export default App;

