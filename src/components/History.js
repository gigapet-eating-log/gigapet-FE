import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getChildren, setCurrentChild } from "../actions";

// Testing Account
// Nguyen22 P: password22
class History extends Component {
    
    componentDidMount() {
        console.log("CDM in History.js")
        const id = localStorage.getItem("currentUserId");
        this.props.getChildren(id);
      }
    
      childSelectHandler = ev => {
        const selectedChild = this.props.kids.find(el => {
          return el.id === ev.target.value;
        });
        this.props.setCurrentChild(selectedChild);
        console.log(`Current Child: ${this.props.currentChild}`);
      };

    render() {
        return (
            <div className='history'>
                <div>Caloric Intake History of </div>

                <div className='child-select-container' > 
                    <label>Superhero: </label>
                    <select onChange={this.childSelectHandler}>
                        {this.props.kids &&
                            this.props.kids.map(el => {
                                return <option value={el.id}>{el.name.toUpperCase()}</option>;
                            })}
                    </select>
                </div>

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

const mapStateToProps = state => ({
    foodEntries: state.foodEntries,
    kids: state.kids,
    currentChild: state.currentChild
});


export default connect(mapStateToProps, {getChildren, setCurrentChild})(History);