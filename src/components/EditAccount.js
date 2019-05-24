import React from "react";
import { connect } from "react-redux";
import { getUser, putUser, deleteUser } from "../actions";
import styled from "styled-components";
import { fonts, colors } from "../sharedStyles";

const EditAccountSC = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.lavender};
  max-width: 500px;
  margin: 30px auto 0;
  border: 1px outset rgb(200, 200, 200);
  border-radius: 10px;
  overflow: hidden;
`

const DetailBoxSC = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 180px;
  height: 110px;
  margin: 0px auto;
  padding: 10px;
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
`

const H3SC = styled.h3`
  margin: 0;
  padding: 0;
`;

const PSC = styled.p`
  margin: 12px;
  padding: 0;
`;

const InputLineSC = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SpanSC = styled.span`
  display: flex;
  align-items: center;
  width: 90px;
`;

const InputSC = styled.input`
  width: 90px;
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

class EditAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      editActive: false,
      editInput: {
        name: "",
        email: ""
      }
    };
  }

  componentDidMount(){
    if (this.props.currentUser) {return};
    const id = localStorage.getItem("currentUserId");
    this.props.getUser(id);
  }

  editHandler = ev => {
    ev.preventDefault();
    if (!this.state.editActive) {
      this.setState({
        editActive: true,
        editInput: {
          name: this.props.currentUser.name,
          email: this.props.currentUser.email
        }
      });
    } else {
      const id = localStorage.getItem("currentUserId");
      this.props.putUser(this.state.editInput, id);
      this.setState({
        editActive: false,
        editInput: {
          name: "",
          email: ""
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
    this.props.deleteUser(this.props.currentUser.id);
  };

  render() {
    return (
      <EditAccountSC>
        <TitleSC>Edit Account Details</TitleSC>
        <DetailBoxSC>
          {!this.state.editActive ? (
            <div>
              <H3SC>{this.props.currentUser && this.props.currentUser.name}</H3SC>
              <PSC>{this.props.currentUser && this.props.currentUser.email}</PSC>
            </div>
          ) : (
            <form>
              <InputLineSC>
                <SpanSC>Username:</SpanSC>
                <InputSC
                  type="text"
                  name="name"
                  value={this.state.editInput.name}
                  onChange={this.changeHandler}
                />
              </InputLineSC>
              <InputLineSC>
                <SpanSC>Email:</SpanSC>
                <InputSC
                  type="text"
                  name="email"
                  value={this.state.editInput.email}
                  onChange={this.changeHandler}
                />
              </InputLineSC>
            </form>
          )}
          <div>
            <ButtonSC onClick={this.editHandler}>
              {this.state.editActive ? "Submit" : "Edit"}
            </ButtonSC>
            <ButtonSC onClick={this.deleteHandler}>Delete</ButtonSC>
          </div>
        </DetailBoxSC>
      </EditAccountSC>
    );
  }
}


const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  { getUser, putUser, deleteUser }
)(EditAccount);
