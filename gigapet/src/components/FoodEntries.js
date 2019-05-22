import React from 'react';

function FoodEntries (props) {
    return (
        <div className="entry">
            <h3>Superhero: {props.entry.name}</h3>
            <p>{props.entry.name} ate {props.entry.foodName} for {props.entry.mealTime} on {props.entry.date} totaling {props.entry.calorieCount} calories.</p>
        </div>
    );
}

export default FoodEntries;