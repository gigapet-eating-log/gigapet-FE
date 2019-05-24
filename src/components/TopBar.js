import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { logout } from "../actions";
import { colors } from "../sharedStyles";

const TopBarContainerSC = styled.div`
  background: white;
  margin-top: -10px;
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid #bbb;
`;

const TopBarSC = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  justify-content: center;
  margin: 10px auto 0;
`;

const activeClassName = "active";
const NavLinkSC = styled(NavLink).attrs({
  activeClassName: activeClassName
})`
  /* color: ${colors.purple};
  background: white;
  font-weight: bold;
  border: 2px solid ${colors.purple};
  border-radius: 10px;
  margin: 0 10px;
  padding: 5px 10px; */

  display: inline-block;
  height: 38px;
  padding: 0 20px;
  margin: 5px;
  color: #555555;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  background: ${colors.lavender};
  border-radius: 4px;
  border: 1px solid #bbb;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    color: #333;
    border-color: #888888;
    outline: 0;
  };

  &:active {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.3);
  };
  
  &.${activeClassName} {
    background: white;
  };
`;

const FixedLinkSC = styled(NavLinkSC)`
  &.${activeClassName} {
    background: ${colors.lavender};
  }
`;

class TopBar extends React.Component {
  visibleHandler = () => {
    return localStorage.getItem("token");
  };

  render() {
    if (this.visibleHandler()) {
      return (
        <TopBarContainerSC>
          <TopBarSC>
            <NavLinkSC exact to="/">
              HOME
            </NavLinkSC>
            <NavLinkSC to="/add-entry">ADD FOOD</NavLinkSC>
            <NavLinkSC to="/history">FOOD HISTORY</NavLinkSC>
            <NavLinkSC to="/manage-account">MANAGE ACCOUNT</NavLinkSC>
            <FixedLinkSC onClick={this.props.logout}>LOGOUT</FixedLinkSC>
          </TopBarSC>
        </TopBarContainerSC>
      );
    } else {
      return (
        <TopBarContainerSC>
          <TopBarSC>
            <FixedLinkSC to="/auth">LOG IN / SIGN UP</FixedLinkSC>
          </TopBarSC>
        </TopBarContainerSC>
      );
    }
  }
}

const mapStateToProps = state => ({
  pending: state.pending
});

export default connect(
  mapStateToProps,
  { logout }
)(TopBar);

