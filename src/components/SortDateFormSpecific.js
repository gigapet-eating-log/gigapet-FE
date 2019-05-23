import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFood } from '../actions';
import FoodEntries from './FoodEntries';
import TotalCalories from './TotalCalories';

class SortDateFormSpecific extends Component {
    constructor() {
        super();
        this.state = {
            dateOne: "",
            dateTwo: ""
        }
    }

    changeHandlerSpecific = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        })

        console.log(this.state);
    }

    getFood = event => {
        event.preventDefault();
        console.log(this.state);
        const childId = this.props.currentChild

        this.props.getFood(childId);
    }

    render() {
        return (
            <div className='specific-date'>

                <form onSubmit={this.getFood}> Find Caloric Intake from

                    <input
                        type="date"
                        name="dateOne"
                        value={this.state.dateOne}
                        onChange={this.changeHandlerSpecific}
                        style={{ margin: "0 10px" }}

                    />
                    to
                    <input
                        type="date"
                        name="dateTwo"
                        value={this.state.dateTwo}
                        onChange={this.changeHandlerSpecific}
                        style={{ marginLeft: "10px" }}

                    />
                    <button type="submit">Find</button>
                </form>

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

export default connect(mapStateToProps, { getFood })(SortDateFormSpecific);