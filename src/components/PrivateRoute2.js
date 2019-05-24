import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
  console.log(props)
  return <Route {...props} render={() => {
      if (localStorage.getItem('token')) {
        if (props.hasChildren) {
          return <Component /> 
        } else {
          return <Redirect to="./" />  
        }
      } else {
        return <Redirect to="./auth" />
      }
  }} />
}

const mapStateToProps = state => ({
  hasChildren: state.hasChildren
});

export default connect(
  mapStateToProps,
)(PrivateRoute);
