import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// takes individual objects from filtered array or original array and display the contents
class FoodEntries extends Component {
    constructor(props) {
        super(props);
    }


    delete = () => {

    }

    render() {
        return (

            <div className="entry-card" id={this.props.key}>
                {this.props.entry.foodType === 'vegetables' && <i class="fas fa-carrot"></i>}
                {this.props.entry.foodType === 'fruits' && <i class="fas fa-apple-alt"></i>}
                {this.props.entry.foodType === 'grains' && <i class="fas fa-bread-slice"></i>}
                {this.props.entry.foodType === 'dairy' && <i class="fas fa-cheese"></i>}
                {this.props.entry.foodType === 'proteins' && <i class="fas fa-bacon"></i>}
                {this.props.entry.foodType === 'junk' && <i class="fas fa-cookie"></i>}

                <p><strong>Food Item</strong>: {this.props.entry.foodName}</p>
                <p><strong>Food Type</strong>: {this.props.entry.foodType}</p>
                <p><strong>Date</strong>: {this.props.entry.date}</p>

                <div className='options'>

                    <Link to={{
                        pathname: "/edit-entry",
                        state: {
                            name: this.props.currentChild,
                            mealTime: this.props.entry.mealTime,
                            foodType: this.props.entry.foodType,
                            foodName: this.props.entry.foodName,
                            parentId: localStorage.get('currentUserId'),
                            calories: 100,
                            date: this.props.entry.date,
                            id: this.props.entry.key
                        }
                    }}><i class="fas fa-edit"></i></Link>

                    {/* <i class="fas fa-edit" onClick={this.edit}></i> */}
                    <i class="fas fa-trash-alt" onClick={this.delete}></i>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    currentChild: state.currentChild,
});

export default connect(
    mapStateToProps,
    {}
)(FoodEntries);
