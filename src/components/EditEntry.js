import React from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import { colors, fonts } from "../sharedStyles";
import moment from "moment";
import { putFood } from "../actions";


export const FormSC = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  max-width: 500px;
  margin: 0 auto;
  border: 1px outset rgb(200, 200, 200);
  border-radius: 5px;
  overflow: hidden;
`;

export const TitleSC = styled.h1`
  font-family: ${fonts.title};
  font-weight: bold;
  font-size: 2.2rem;
  letter-spacing: 0.05rem;
  background: ${colors.lightPurple};
  align-self: stretch;
  color: white;
  margin: 0 0 20px;
  padding: 10px;
`;

export const InputBoxSC = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

export const InputSC = styled.input`
  font-family: ${fonts.handwriting};
  font-size: 14px;
  width: 100%;
  padding: 3px;
  margin: 5px 0;
  outline-color: ${colors.purple};
  &::selection {
    background: ${colors.lighterPurple};
    color: white;
  }
`;

export const SelectSC = styled.select`
  font-family: ${fonts.handwriting};
  font-size: 14px;
  width: 260px;
  padding: 3px 0;
  margin: 5px 0;
  outline-color: ${colors.purple};
  color: ${props => (props.placeholder ? "grey" : "black")};
  &::selection {
    background: ${colors.lighterPurple};
    color: white;
  }
`;

export const OptionSC = styled.option`
  color: black;
`;

export const ButtonBoxSC = styled.div`
  margin: 10px 0;
`;

const ButtonSC = styled.button`
  font-family: ${fonts.title};
  font-weight: bold;
  letter-spacing: 0.05rem;
  font-size: 16px;
  background: ${colors.lightPurple};
  color: white;
  padding: 5px 10px;
  margin: 10px;
  border-color: ${colors.lightPurple};
  border-radius: 5px;
  user-select: none;
  outline: none;
  &:active {
    background: ${colors.purple};
    border-color: ${colors.purple};
  }
`;

export const InputButtonSC = styled(ButtonSC)`
  display: ${props => (props.updateTog ? "none" : "inline-block")};
`;

class EditEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        food: "",
        calories: "",
        date: "",
        category: "x"
      }
    };
  }

  componentDidMount() {
      console.log(this.state.input)
      console.log(this.props.location.state);

    const date = moment().format("YYYY-MM-DD");
    this.setState({
      input: {
        ...this.state.input,
        date: date
      }
    });
  }

  changeHandler = ev => {
    this.setState({
      input: { ...this.state.input, [ev.target.name]: ev.target.value }
    });
    console.log(this.state.input)
  };

  submitHandler = ev => {
    ev.preventDefault();
    const inp = this.state.input;
    if (
      inp.childId === "x" ||
      inp.food === "" ||
      inp.calories === "" ||
      inp.category === "x"
    ) {
      return;
    }

    // food: "",
    // calories: "",
    // date: "",
    // category: "x"

    const editedEntry = {
        name: this.props.location.state.name.name,
	    mealTime: this.props.location.state.mealTime,
	    foodType: this.state.input.category,
	    foodName: this.state.input.food,
	    parentId: this.props.location.state.parentId,
	    calories: this.state.input.calories,
	    date: this.state.input.date,
	    id: this.props.location.state.id
    }

    console.log("Edited:", editedEntry)

    this.props.putFood(editedEntry);


    this.setState({
      input: {
        food: "",
        date: moment().format("YYYY-MM-DD"),
        category: "x",
        calories: ""
      }
    });
  };

  render() {

    return (
        <React.Fragment>
        <div className='previous-form'>
                <p style={{textDecoration: 'underline'}}>Previous Entry</p>
                {this.props.location.state.foodType === 'vegetables' && <i class="fas fa-carrot fa-2x"></i>}
                {this.props.location.state.foodType === 'fruits' && <i class="fas fa-apple-alt fa-2x"></i>}
                {this.props.location.state.foodType === 'grains' && <i class="fas fa-bread-slice fa-2x"></i>}
                {this.props.location.state.foodType === 'dairy' && <i class="fas fa-cheese fa-2x"></i>}
                {this.props.location.state.foodType === 'proteins' && <i class="fas fa-bacon fa-2x"></i>}
                {this.props.location.state.foodType === 'junk' && <i class="fas fa-cookie fa-2x"></i>}

                <p><strong>Food Item</strong>: {this.props.location.state.foodName}</p>
                <p><strong>Food Type</strong>: {this.props.location.state.foodType}</p>
                <p><strong>Date</strong>: {this.props.location.state.date}</p>
        </div>
      <FormSC onSubmit={this.submitHandler}>
        <TitleSC>Edit Entry</TitleSC>
        <InputBoxSC spellCheck="false">
          <InputSC
            type="text"
            name="food"
            placeholder="Food"
            value={this.state.input.food}
            onChange={this.changeHandler}
            required
          />
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
          <InputSC
            type="number"
            name="calories"
            placeholder="Calories"
            value={this.state.input.calories}
            onChange={this.changeHandler}
            required
          />
          <InputSC
            type="date"
            name="date"
            value={this.state.input.date}
            onChange={this.changeHandler}
            required
          />
        </InputBoxSC>
        <ButtonBoxSC>
          <InputButtonSC onClick={this.submitHandler}>
            Edit
          </InputButtonSC>
        </ButtonBoxSC>
      </FormSC>
      </React.Fragment>
    );
  }
}


export default connect(
    null,
    { putFood }
)(EditEntry);
