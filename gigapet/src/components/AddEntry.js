import React from "react";
import { connect } from "react-redux";
import { postFood } from "../actions";
import styled from 'styled-components';
import { colors, fonts } from "../sharedStyles"; 
import moment from "moment";


const FormSC = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  max-width: 500px;
  margin: 0 auto;
  border: 1px outset rgb(200, 200, 200);
  border-radius: 5px;
  overflow: hidden;
`

const TitleSC = styled.h1`
  font-family: ${fonts.title};
  font-weight: bold;
  font-size: 2.2rem;
  letter-spacing: .05rem;
  background: ${colors.lightPurple};
  align-self: stretch;
  color: white;
  margin: 0 0 20px;
  padding: 10px;
`

const InputBoxSC = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`

const InputSC = styled.input`
  font-family: ${fonts.handwriting};
  font-size: 14px;
  width: 100%;
  padding: 3px;
  margin: 5px 0;
  outline-color: ${colors.purple};
    &::selection{
      background: ${colors.lighterPurple};
      color: white;
    }
`

const SelectSC = styled.select`
  font-family: ${fonts.handwriting};
  font-size: 14px;
  width: 260px;
  padding: 3px 0;
  margin: 5px 0;
  outline-color: ${colors.purple};
  color: ${props => props.placeholder ? "grey" : "black"};
  &::selection{
      background: ${colors.lighterPurple};
      color: white;
    }
`

const OptionSC = styled.option`
  color: black;
`

const ButtonBoxSC = styled.div`
  margin: 10px 0;
`

const ButtonSC = styled.button`
  font-family: ${fonts.title};
  font-weight: bold;
  letter-spacing: .05rem;
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

const InputButtonSC = styled(ButtonSC)`
  display: ${props => (props.updateTog ? "none" : "inline-block")};
`;

class AddEntry extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {
        food: "",
        date: moment().format('YYYY-MM-DD'),
        category: ""
      },
    };
  }

  changeHandler = ev => {
    this.setState({ input: { ...this.state.input, [ev.target.name]: ev.target.value } });
  };

  submitHandler = ev => {
    ev.preventDefault();
    this.props.postFood(this.state.input)
    this.setState({ input: { name: "", date: moment().format('yyyy-mm-dd'), height: "" } })
  }

  render() {
    return (
    <FormSC onSubmit={this.submitHandler}>
      <TitleSC>ADD SOME FOOD</TitleSC>
      <InputBoxSC spellCheck="false" required>
        <SelectSC placeholder={!this.state.input.category} name="category" value={this.state.input.category} onChange={this.changeHandler} required>
          {}<OptionSC hidden>Category</OptionSC>
          <OptionSC value="vegetables">Vegetables</OptionSC>
          <OptionSC value="fruits">Fruits</OptionSC>
          <OptionSC value="grains">Grains</OptionSC>
          <OptionSC value="dairy">Dairy</OptionSC>
          <OptionSC value="proteins">Proteins</OptionSC>
          <OptionSC value="junk">Junk</OptionSC>
        </SelectSC>
        <InputSC
          type="text"
          name="food"
          placeholder="Food"
          value={this.state.input.food}
          onChange={this.changeHandler}
        />
        <SelectSC placeholder={!this.state.input.category} name="category" value={this.state.input.category} onChange={this.changeHandler} required>
          <OptionSC hidden>Category</OptionSC>
          <OptionSC value="vegetables">Vegetables</OptionSC>
          <OptionSC value="fruits">Fruits</OptionSC>
          <OptionSC value="grains">Grains</OptionSC>
          <OptionSC value="dairy">Dairy</OptionSC>
          <OptionSC value="proteins">Proteins</OptionSC>
          <OptionSC value="junk">Junk</OptionSC>
        </SelectSC>
        <InputSC
          type="date"
          name="date"
          value={this.state.input.date}
          onChange={this.changeHandler}
          required
        />
      </InputBoxSC>
      <ButtonBoxSC>
        <InputButtonSC type="submit">
          Send the pupper food
        </InputButtonSC>
      </ButtonBoxSC>
    </FormSC>
    );
  }
}

export default connect(
  null,
  { postFood }
)(AddEntry);