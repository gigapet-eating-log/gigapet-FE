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
                <NavLink to='/history/day'>Sort by Day</NavLink>
                <NavLink to='/history/specific'>Sort by Range</NavLink>
            </div>
        );
    }
}

export default History;