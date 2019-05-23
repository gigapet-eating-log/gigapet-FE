import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// Testing Account
// Nguyen22 P: password22
class History extends Component {
    
    render() {
        return (
            <div className='history'>
        
                <nav className='nav'>
                    <NavLink to='/history/advanced'>Advanced Search</NavLink>
                    <NavLink to='/history/day'>Find by Day</NavLink>
                    <NavLink to='/history/specific'>Find by Range</NavLink>
                    <NavLink to='/history/category'>Find by Category</NavLink>
                </nav>

            </div>
        );
    }
}

// const mapStateToProps = state => ({
//     foodEntries: state.foodEntries,
//     kids: state.kids,
//     currentChild: state.currentChild
// });


export default connect(null, {})(History);