import React from "react";
import { connect } from "react-redux";
import { putChildren, deleteChildren } from "../actions";
import styled from "styled-components";
import { fonts, colors } from "../sharedStyles";

const ChildBoxSC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 3px solid ${colors.purple};
  border-radius: 10px;
  width: 180px;
  margin: 10px;
  padding: 10px;
`
const H3SC = styled.h3`
  margin: 0;
  padding: 0;
`

const PSC = styled.p`
  margin: 12px;
  padding: 0;
`

const SpanSC = styled.span`
  width: 100px;
  margin-right: 10px;
`

const InputSC = styled.input`
  width: 50px;
  margin: 5px 0;
`

const ButtonSC = styled.button`
  font-family: ${fonts.title};
  font-weight: bold;
  letter-spacing: .05rem;
  font-size: 16px;
  background: ${colors.lightPurple};
  color: white;
  padding: 5px 10px;
  margin: 2px;
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
        name: "",
        calorieGoal: ""
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
          calorieGoal: ""
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
      <ChildBoxSC>
        {!this.state.editActive ? (
          <div>
            <H3SC>{this.props.data.name}</H3SC>
            <PSC>Calorie goal: {this.props.data.calorieGoal}</PSC>
          </div>
        ) : (
          <form>
              <div>
                <SpanSC>
                  Name:
                </SpanSC>
                  <InputSC
                    type="text"
                    name="name"
                    placeholder="Child Name"
                    value={this.state.editInput.name}
                    onChange={this.changeHandler}
                  />
              </div>
              <div>
                <SpanSC>
                  Calorie Goal:
                </SpanSC>
                  <InputSC
                    type="text"
                    name="calorieGoal"
                    placeholder="Calorie Goal"
                    value={this.state.editInput.calorieGoal}
                    onChange={this.changeHandler}
                  />
              </div>
          </form>
        )}
        <div>
          <ButtonSC onClick={this.editHandler}>{this.state.editActive ? "submit" : "edit"}</ButtonSC>
          <ButtonSC onClick={this.deleteHandler}>delete</ButtonSC>
        </div>
      </ChildBoxSC>
    );
  }
}

export default connect(
  null,
  { putChildren, deleteChildren }
)(Child);