import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getFoodByDate} from '../actions'

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

      getFoodByDate = event => {
          event.preventDefault();
          console.log(this.state);
          const info = {
              date: this.state,
              parentId: localStorage.getItem('currentUserId'),
              childId: localStorage.getItem('currentChild') // where is childId?
          }
          console.log(info);
          this.props.getFoodByDate(info)
      }

    render() {
        return (
            <div className='single-date'>
                <form onSubmit={this.getFoodByDate}> Find Caloric Intake by Day 

                    <input
                        type="date"
                        name="singleDate"
                        value={this.state.singleDate}
                        onChange={this.changeHandler}
                        style={{marginLeft: "10px"}}
                 
                    />
                    <button type="submit">Sort</button>
                </form>
            </div>
        );
    }
}

export default connect(null, {getFoodByDate})(SortDateForm);