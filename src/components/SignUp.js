import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../actions";
import styled from "styled-components";
import { fonts, colors } from "../sharedStyles";

const SignUpSC = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.lavender};
  width: 280px;
  margin: 30px auto;
  border: 1px outset rgb(200, 200, 200);
  border-radius: 10px;
  overflow: hidden;
`;

const TitleSC = styled.h2`
  font-family: ${fonts.title};
  font-weight: bold;
  font-size: 26px;
  letter-spacing: 0.05rem;
  background: ${colors.lightPurple};
  align-self: stretch;
  color: white;
  margin: 0;
  padding: 10px;
`;

const AddChildBoxSC = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 220px;
  height: 140px;
  margin: 0;
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
  margin-right: 5px;
`;

const IconSC = styled.i`
  margin: 0;
  padding: 0;
`;

const InputSC = styled.input`
  width: 140px;
  margin: 5px 0;
  padding: 2px
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
  width: 180px;
  border-color: ${colors.lightPurple};
  border-radius: 5px;
  user-select: none;
  outline: none;
  &:active {
    background: ${colors.purple};
    border-color: ${colors.purple};
  }
`;

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        name: "",
        password: "",
        email: ""
      }
    };
  }

  handleChanges = event => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [event.target.name]: event.target.value
      }
    });
  };

  signUp = event => {
    event.preventDefault();
    this.props.signUp(this.state.credentials).then(() => {
      this.props.history.push("./");
    });
  };

  render() {
    return (
      <SignUpSC>
        <TitleSC>SIGN UP</TitleSC>
        <AddChildBoxSC onSubmit={this.signUp}>
          <InputLineSC>
            <SpanSC>Username:</SpanSC>
            <InputSC
              type="text"
              name="name"
              value={this.state.credentials.name}
              onChange={this.handleChanges}
            />
          </InputLineSC>
          <InputLineSC>
            <SpanSC>Password:</SpanSC>
            <InputSC
              type="password"
              name="password"
              value={this.state.credentials.password}
              onChange={this.handleChanges}
            />
          </InputLineSC>
          <InputLineSC>
            <SpanSC>Email:</SpanSC>
            <InputSC
              type="email"
              name="email"
              value={this.state.credentials.email}
              onChange={this.handleChanges}
            />
          </InputLineSC>
          <ButtonSC>
            <IconSC className="fas fa-paw fa" /> Adopt A Friend
          </ButtonSC>
        </AddChildBoxSC>
      </SignUpSC>
    );
  }
}

const mapStateToProps = state => ({
  pending: state.pending,
  error: state.error,
  errorMessage: state.errorMessage
});

export default connect(
  mapStateToProps,
  { signUp }
)(SignUp);
