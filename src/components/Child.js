import React from "react";
import { connect } from "react-redux";
import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import { putChildren, deleteChildren } from "../actions";
import styled from "styled-components";
import { fonts, colors } from "../sharedStyles";

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

class Child extends React.Component {
  constructor() {
    super();
    this.state = {
      editActive: false,
      editInput: {
        food: "",
        date: "",
        category: ""
      }
    };
  }
  editHandler = ev => {
    ev.preventDefault();
    if (!this.state.editActive) {
      this.setState({
        editActive: true,
        editInput: {
          name: this.props.data.name,
          calorieGoal: this.props.data.calorieGoal
        }
      });
    } else {
      this.props.putChildren(this.state.editInput, this.props.data.id);
      this.setState({
        editActive: false,
        editInput: {
          name: "",
          age: "",
          height: ""
        }
      });
    }
  };

  changeHandler = ev => {
    this.setState({
      editInput: { ...this.state.editInput, [ev.target.name]: ev.target.value }
    });
  };

  deleteHandler = ev => {
    ev.preventDefault();
    this.props.deleteChildren(this.props.data.id);
  };

  render() {
    return (
      <div>
        {!this.state.editActive ? (
          <div>
            <h3>{this.props.data.name}</h3>
            <p>Calorie goal: {this.props.data.calorieGoal}</p>
          </div>
        ) : (
          <Form onSubmit={this.editChildren}>
            <FormGroup row>
              <Label for="name" sm={2}>
                Name
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Child Name"
                  value={this.state.input.name}
                  onChange={this.handleChanges}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="calorieGoal" sm={2}>
                Calorie Goal
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="calorieGoal"
                  placeholder="Calorie Goal"
                  value={this.state.input.calorieGoal}
                  onChange={this.handleChanges}
                />
              </Col>
            </FormGroup>
          <ButtonSC>
            SUBMIT <span class="fas fa-baby-carriage" />
          </ButtonSC>
          </Form>
        )}
        <div>
          <button onClick={this.editHandler}>{this.state.editActive ? "submit" : "edit"}</button>
          <button onClick={this.deleteHandler}>delete</button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { putChildren, deleteChildren }
)(Child);