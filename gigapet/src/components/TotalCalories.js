import React from 'react';

function TotalCalories (props) {
    return (
        <div className='total'>
            Calorie Total: {props.foodEntries.reduce((accumulator, entry) => { return entry.calorieCount + accumulator},0)} calories out of minimum "calorie goal here" calories.
        </div>
    );
};


export default TotalCalories;