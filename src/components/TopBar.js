import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { setCurrentChild } from "../actions"
import { colors } from "../sharedStyles"

const TopBarContainerSC = styled.div`
  background: silver;
  margin-top: -10px;
  margin-bottom: 20px;
  padding: 20px;
`;

const TopBarSC = styled.div`
  display: flex;
  width: 700px;
  justify-content: center;
  margin: 10px auto 0;
`;

const LinkSC = styled(Link)`
  color: ${colors.purple};
  background: white;
  font-weight: bold;
  border: 2px solid ${colors.purple};
  border-radius: 10px;
  margin: 0 10px;
  padding: 5px 10px;
`;

const logout = ev => {
  ev.preventDefault();
  if (!localStorage.getItem("token")) {
    return;
  }
  localStorage.clear();
  setTimeout(() => window.location.reload(), 10);
};



class TopBar extends React.Component {

  visibleHandler = () => {
    return localStorage.getItem("token");
  };

  render() {
    if (this.visibleHandler()) {
      return (
        <TopBarContainerSC>
          <TopBarSC>
            <LinkSC to="/">HOME</LinkSC>
            <LinkSC to="/add-entry">ADD FOOD</LinkSC>
            <LinkSC to="/history">FOOD HISTORY</LinkSC>
            <LinkSC to="/manage-account">MANAGE ACCOUNT</LinkSC>
            <LinkSC onClick={logout}>LOGOUT</LinkSC>
          </TopBarSC>
        </TopBarContainerSC>
      );
    } else {
      return (
        <TopBarContainerSC>
          <TopBarSC>
            <LinkSC to="/auth">LOG IN / SIGN UP</LinkSC>
          </TopBarSC>
        </TopBarContainerSC>
      );
    }
  }
}

export default TopBar