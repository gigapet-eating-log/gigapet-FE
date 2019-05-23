import React, { Component } from "react";
import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { getChildren, postChildren } from "../actions";
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
      parentId: localStorage.getItem("currentUserId"),
      name: this.state.input.name,
      calorieGoal: this.state.input.calorieGoal
    };
    this.props.postChildren(newChild);
    this.setState({
      input: {
        name: "",
        calorieGoal: ""
      }
    })
  };

  render() {
    return (
      <div>
        <h2>Add a child</h2>
        <Form onSubmit={this.addChild}>
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
