import React, { Component } from "react";
import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { postChild } from "../actions";

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
    const newChild = {
      parentId: localStorage.getItem("currentUserId"),
      name: this.state.input.name,
      calorieGoal: this.state.input.calorieGoal
    };
    this.props.postChild(newChild);
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
          <button>
            <i class="fas fa-baby-carriage"> SUBMIT</i>
          </button>
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
  { postChild }
)(AddChild);
