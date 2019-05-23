import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getFood} from '../actions';
import FoodEntries from './FoodEntries';
import TotalCalories from './TotalCalories';

class SortDateForm extends Component {
    constructor() {
        super();
        this.state = {
            singleDate: "",
        }
    }

    changeHandler = ev => {
        this.setState({
            [ev.target.name]: ev.target.value })

        console.log(this.state);
      };

      getFood = event => {
          event.preventDefault();
          console.log(this.state);
          const childId = this.props.currentChild
          
          this.props.getFood(childId);
      }

    render() {
        return (
            <div className='single-date'>
                <form onSubmit={this.getFood}> Find Caloric Intake by Day 

                    <input
                        type="date"
                        name="singleDate"
                        value={this.state.singleDate}
                        onChange={this.changeHandler}
                        style={{marginLeft: "10px"}}
                 
                    />
                    <button type="submit">Find</button>
                </form>

                <div className='food-date-wrapper'>
                    <TotalCalories foodEntries={this.props.foodEntries} />
                    <div className='food-entries-wrapper'>
                        {this.props.foodEntries.filter(entry => {
                            return entry.date === this.state.singleDate
                        }).map(entry => {
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

export default connect(mapStateToProps, {getFood})(SortDateForm);