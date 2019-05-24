import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
  console.log(props)
  return <Route {...props} render={() => {
      if (localStorage.getItem('token')) {
        if (props.kids && props.kids[0]) {
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
  kids: state.kids
});

export default connect(
  mapStateToProps,
)(PrivateRoute);
