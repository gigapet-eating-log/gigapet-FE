import React, { Component } from 'react';
import { FormSC, TitleSC, InputBoxSC, SelectSC, OptionSC, InputSC, ButtonBoxSC, InputButtonSC } from './AddEntry';
import { getFood } from "../actions";
import {connect} from 'react-redux';
import FoodEntries from './FoodEntries';


// Possibly add all of these styles in one file and import where they are used/re-used


class SortFormAdvanced extends Component {
    constructor() {
        super();
        this.state = {
            initialEntries: true,
            input: {
                dateStart: "",
                dateEnd: "",
                category: "x"
            }
        }
    }

    componentDidMount() {
        console.log("I AM IN CDM in Advanced Form");
        const childId = this.props.currentChild.id; 
        this.props.getFood(childId);
    }

    componentDidUpdate() {
        console.log("I AM IN CDU")
    }


    changeHandler = ev => {
        this.setState({
            input: { ...this.state.input, [ev.target.name]: ev.target.value }
        });
    };

    render() {
        console.log(`Current Child: ${this.props.currentChild}`);

        return (
            <div className='advanced-search'>
                <FormSC onSubmit={this.submitHandler}>
                    <TitleSC>Search by Category and Date</TitleSC>
                    <InputBoxSC spellCheck="false">

                        <SelectSC
                            placeholder={this.state.input.category === "x"}
                            name="category"
                            value={this.state.input.category}
                            onChange={this.changeHandler}
                            required
                        >
                            <OptionSC value="x" hidden>
                                Category
                            </OptionSC>
                            <OptionSC value="vegetables">Vegetables</OptionSC>
                            <OptionSC value="fruits">Fruits</OptionSC>
                            <OptionSC value="grains">Grains</OptionSC>
                            <OptionSC value="dairy">Dairy</OptionSC>
                            <OptionSC value="proteins">Proteins</OptionSC>
                            <OptionSC value="junk">Junk</OptionSC>
                        </SelectSC>

                        Date Start
                        <InputSC
                            type="date"
                            name="dateStart"
                            value={this.state.input.dateStart}
                            onChange={this.changeHandler}
                            required
                        />

                        Date End
                        <InputSC
                            type="date"
                            name="dateEnd"
                            value={this.state.input.dateEnd}
                            onChange={this.changeHandler}
                            required
                        />

                    </InputBoxSC>
                    <ButtonBoxSC>
                        <InputButtonSC onClick={this.submitHandler}>
                            Find
                    </InputButtonSC>
                    </ButtonBoxSC>
                </FormSC>

                <div className='card-container'>
                    {this.state.initialEntries && this.props.filteredEntries.map(entry => {
                        return <FoodEntries key={entry.food} entry={entry} />
                    })} TESTING
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    foodEntries: state.foodEntries,
    kids: state.kids,
    currentChild: state.currentChild,
    filteredEntries: state.filteredEntries
});


export default connect(
    mapStateToProps,
    { getFood }
)(SortFormAdvanced);