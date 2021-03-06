import React, { Component } from 'react';
import { FormSC, TitleSC, InputBoxSC, SelectSC, OptionSC, InputSC, ButtonBoxSC, InputButtonSC } from './AddEntry';
import { connect } from 'react-redux';
import FoodEntries from './FoodEntries';
import { getChildren, setCurrentChild, getFood, filteredToState } from "../actions";
import {Link} from 'react-router-dom';



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

        const filtered = this.props.foodEntries.filter(item => {
            let categoryCheck = false;
            let dateStartCheck = false;
            let dateEndCheck = false;

            const dateStartParsed = Number(this.state.input.dateStart.replace(/-/g, ""))
            const dateEndParsed = Number(this.state.input.dateEnd.replace(/-/g, ""))
            const dateParsed = Number(item.date.replace(/-/g, ""))

            if (this.state.input.category === "x" || this.state.input.category === item.foodType) {
                categoryCheck = true
            }
            if (this.state.input.dateStart === "" || dateStartParsed <= dateParsed) {
                dateStartCheck = true
            }
            if (this.state.input.dateEnd === "" || dateEndParsed >= dateParsed) {
                dateEndCheck = true
            }

            return (categoryCheck && dateStartCheck && dateEndCheck)
        })
        console.log(this.state.input);
        this.props.filteredToState(filtered);
    }


    render() {
        console.log(this.props.filteredEntries);
        
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

                <div className='child-select-container' >
                    <label>Food History of Superhero: </label>
                    <select onChange={this.childSelectHandler}>
                        {this.props.kids &&
                            this.props.kids.map(el => {
                                return <option value={el.id}>{el.name.toUpperCase()}</option>;
                            })}
                    </select>
                    <button onClick={this.fetch}> View All </button>
                </div>

                <div className='card-container'>
                    {this.state.initialEntries && this.props.filteredEntries.map(entry => {
                        console.log(entry);
                        return <FoodEntries key={entry.id} currentChild={this.props.currentChild} entry={entry} />
                    })}
                </div>

               <Link to='/secret'> <div></div></Link>

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
    { getFood, getChildren, setCurrentChild, filteredToState }
)(SortFormAdvanced);