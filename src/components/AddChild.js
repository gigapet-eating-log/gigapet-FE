import React, { Component } from "react";
import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { getChildren, postChildren } from "../actions";
import styled from "styled-components";
import { fonts, colors } from "../sharedStyles";

const AddChildBoxSC = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border: 3px solid ${colors.purple};
  border-radius: 10px;
  width: 220px;
  height: 110px;
  margin: 10px auto;
  padding: 10px;
`;

const InputLineSC = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SpanSC = styled.span`
  display: flex;
  align-items: center;
  width: 100px;
  margin-right: 10px;
`;

const InputSC = styled.input`
  width: 80px;
  margin: 5px 0;
`;

const ButtonSC = styled.button`
  font-family: ${fonts.title};
  font-weight: bold;
  letter-spacing: 0.05rem;
  font-size: 16px;
  background: ${colors.lightPurple};
  color: white;
  padding: 5px 10px;
  margin: 10px 0 2px;
  border-color: ${colors.lightPurple};
  border-radius: 5px;
  user-select: none;
  outline: none;
  &:active {
    background: ${colors.purple};
    border-color: ${colors.purple};
  }
`;

class AddChild extends Component {
  constructor() {
    super();
    this.state = {
      input: {
        name: "",
        calorieGoal: ""
      }
    };
  }

  handleChanges = event => {
    this.setState({
      input: {
        ...this.state.input,
        [event.target.name]: event.target.value
      }
    });
  };

  addChild = event => {
    event.preventDefault();
    const id = localStorage.getItem("currentUserId");
    const newChild = {
      parentId: id,
      name: this.state.input.name,
      calorieGoal: this.state.input.calorieGoal
    };
    this.props.postChildren(newChild)
      .then(this.props.getChildren(id))
    this.setState({
      input: {
        name: "",
        calorieGoal: ""
      }
    });
  };

  render() {
    return (
      <div>
        <h2>Add a Child</h2>
        <AddChildBoxSC onSubmit={this.addChild}>
          <InputLineSC>
            <SpanSC>Child Name:</SpanSC>
            <InputSC
              type="text"
              name="name"
              value={this.state.input.name}
              onChange={this.handleChanges}
            />
          </InputLineSC>
          <InputLineSC>
            <SpanSC>Calorie Goal:</SpanSC>
            <InputSC
              type="text"
              name="calorieGoal"
              value={this.state.input.calorieGoal}
              onChange={this.handleChanges}
            />
          </InputLineSC>
          <ButtonSC>Submit</ButtonSC>
        </AddChildBoxSC>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  children: state.children
});

export default connect(
  mapStateToProps,
  { getChildren, postChildren }
)(AddChild);
