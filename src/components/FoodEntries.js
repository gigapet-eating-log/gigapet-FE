import React from 'react';

// takes individual objects from filtered array or original array and display the contents

function FoodEntries (props) {
    return (
        <div className="entry-card">
            {props.entry.foodType === 'vegetables' && <i class="fas fa-carrot"></i>}
            {props.entry.foodType === 'fruits' && <i class="fas fa-apple-alt"></i>}
            {props.entry.foodType === 'grains' && <i class="fas fa-bread-slice"></i>}
            {props.entry.foodType === 'dairy' && <i class="fas fa-cheese"></i> }
            {props.entry.foodType === 'proteins' && <i class="fas fa-bacon"></i>}
            {props.entry.foodType === 'junk' && <i class="fas fa-cookie"></i>}

            <p>Superhero: {props.entry.name}</p>
            <p>{props.entry.name} ate {props.entry.foodName} for {props.entry.mealTime} on {props.entry.date} totaling {props.entry.calorieCount} calories.</p>
        </div>
    );
}

// vegetables fruits grains dairy proteins junk

export default FoodEntries;