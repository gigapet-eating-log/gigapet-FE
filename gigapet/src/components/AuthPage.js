import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';


class AuthPage extends Component {
    render() {
        return (
            <div className='portal'>
                <h2>AUTH PAGE PORTAL</h2>
                <NavLink to='/signUp'><i class="fas fa-user-plus fa-2x"> Sign-Up</i></NavLink>
                <NavLink to='/login'><i class="fas fa-sign-in-alt fa-2x"> Login</i></NavLink>
            </div>
        );
    }
}

export default AuthPage;