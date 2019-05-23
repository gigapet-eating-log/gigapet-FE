import React, { Component } from 'react';
import { FormSC, TitleSC, InputBoxSC, SelectSC, OptionSC, InputSC, ButtonBoxSC, InputButtonSC } from './AddEntry';
import {connect} from 'react-redux';
import FoodEntries from './FoodEntries';
import { getChildren, setCurrentChild, getFood } from "../actions";



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
            },
            categoryChoose: false,
            dateOneChoose: false,
            dateTwoChoose:false,
        }
    }

    componentDidMount() {
        const id = localStorage.getItem("currentUserId");
        this.props.getChildren(id);

    }

    childSelectHandler = ev => {
        const selectedChild = this.props.kids.find(el => {
          return el.id == ev.target.value;
        });
        this.props.setCurrentChild(selectedChild);

        const childId = this.props.currentChild.id;
        this.props.getFood(childId);
      };

   
    changeHandler = ev => {
        this.setState({
            input: { ...this.state.input, [ev.target.name]: ev.target.value }
        });



        console.log(this.state.input);
    };

    fetch = () => {
        const childId = this.props.currentChild.id;
        this.props.getFood(childId);
    }

    submitHandler = event => {
        event.preventDefault();
       
        // this.state.input.category !== "x" || "" && this.setState({ ...state, categoryChoose: true});
        // this.state.input.dateStart !== "" && this.setState({ ...state, dateStart: true});
        // this.state.input.dateEnd !== "" && this.setState({ ...state, dateStart: true});

    }


    render() {
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

                <button onClick={this.fetch}> Fetch Food for Child </button>
                <div className='card-container'>
                    {this.state.initialEntries && this.props.filteredEntries.map(entry => {
                        return <FoodEntries key={entry.food} entry={entry} />
                    })}
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
    { getFood, getChildren, setCurrentChild }
)(SortFormAdvanced);