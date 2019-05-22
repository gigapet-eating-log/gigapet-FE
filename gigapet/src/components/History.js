import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class History extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    
    render() {
        return (
            <div className='history'>
                <h3>Caloric Intake History of "Insert Current Child Here"</h3>
                <nav className='nav'>
                    <NavLink to='/history/day'>Find by Day</NavLink>
                    <NavLink to='/history/specific'>Find by Range</NavLink>
                </nav>
            </div>
        );
    }
}

export default History;