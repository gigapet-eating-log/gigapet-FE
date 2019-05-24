import React from "react";
import { connect } from "react-redux";
import { postFood } from "../actions";
import styled from "styled-components";
import { colors, fonts } from "../sharedStyles";
import moment from "moment";

export const FormSC = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.lavender};
  max-width: 500px;
  margin: 30px auto;
  border: 1px outset rgb(200, 200, 200);
  border-radius: 10px;
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

class AddEntry extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {
        childId: "x",
        food: "",
        calories: "",
        date: "",
        category: "x"
      }
    };
  }

  componentDidMount() {
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
    const selectedChild = this.props.kids.find(el => {
      return el.id == inp.childId;
    });
    const newEntry = {
      name: selectedChild.name,
      mealTime: "lunch",
      foodType: inp.category,
      foodName: inp.food,
      parentId: localStorage.getItem("currentUserId"),
      calories: inp.calories,
      date: inp.date,
      childId: selectedChild.id
    };
    this.props.postFood(newEntry);
    this.setState({
      input: {
        childId: "x",
        food: "",
        date: moment().format("YYYY-MM-DD"),
        category: "x",
        calories: ""
      }
    });
  };

  render() {
    return (
      <FormSC onSubmit={this.submitHandler}>
        <TitleSC>Add A Food Entry</TitleSC>
        <InputBoxSC spellCheck="false">
          <SelectSC
            placeholder={this.state.input.childId === "x"}
            name="childId"
            value={this.state.input.childId}
            onChange={this.changeHandler}
            required
          >
            <OptionSC value="x" hidden>
              Child
            </OptionSC>
            {this.props.kids &&
              this.props.kids.map(el => {
                return <OptionSC value={el.id}>{el.name}</OptionSC>;
              })}
          </SelectSC>
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
            Send the pupper food
          </InputButtonSC>
        </ButtonBoxSC>
      </FormSC>
    );
  }
}

const mapStateToProps = state => ({
  currentChild: state.currentChild,
  currentUserID: state.currentUserID,
  kids: state.kids
});

export default connect(
  mapStateToProps,
  { postFood }
)(AddEntry);
