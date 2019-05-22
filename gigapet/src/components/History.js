import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import FoodEntries from './FoodEntries';
import TotalCalories from './TotalCalories';


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

                <div className='food-date-wrapper'>
                    <TotalCalories foodEntries={this.props.foodEntries} />
                    <div className='food-entries-wrapper'>
                        {this.props.foodEntries.map(entry => {
                            return <FoodEntries key={entry.food} entry={entry} />
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    foodEntries: state.foodEntries,
  });


export default connect(mapStateToProps, {})(History);