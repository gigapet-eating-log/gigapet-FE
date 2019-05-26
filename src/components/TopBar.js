import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { logout } from "../actions";
import { colors } from "../sharedStyles";

const BackgroundWrapperSC = styled.div`
  background: rgb(230, 230, 255);
  background: linear-gradient(
    118deg,
    rgba(230, 230, 255, 1) 156px,
    rgba(99, 99, 99, 1) 157px,
    rgba(255, 255, 255, 1) 158px
  );
`;

const TopBarContainerSC = styled.div`
  position: relative;
  margin-top: -10px;
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid #bbb;
`;

const TopBarSC = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  justify-content: center;
  padding: 0 120px;
  margin: 10px auto 0;
`;

const LogoSC = styled.p`
  position: absolute;
  top: 30px;
  color: black;
  font-family: "Press Start 2P", cursive;
  user-select: none;
`;

const activeClassName = "active";
const NavLinkSC = styled(NavLink).attrs({
  activeClassName: activeClassName
})`
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
  }

  &:active {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.3);
  }

  &.${activeClassName} {
    background: white;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
  }
`;

const FixedLinkSC = styled(NavLinkSC)`
  &.${activeClassName} {
    background: ${colors.lavender};
    box-shadow: none;

    &:active {
    box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.3);
  }
  }
`;

class TopBar extends React.Component {
  visibleHandler = () => {
    return localStorage.getItem("token");
  };

  render() {
    if (this.visibleHandler()) {
      return (
        <BackgroundWrapperSC>
          <TopBarContainerSC>
            <LogoSC>GIGAPET</LogoSC>
            <TopBarSC>
              <NavLinkSC exact to="/">
                HOME
              </NavLinkSC>
              <NavLinkSC to="/add-entry">ADD FOOD</NavLinkSC>
              <NavLinkSC to="/history">FOOD HISTORY</NavLinkSC>
              {this.props.dragonStatus.available && <NavLinkSC to="/incubator">Incubator</NavLinkSC>}
              <NavLinkSC to="/manage-account">MANAGE ACCOUNT</NavLinkSC>
              <FixedLinkSC onClick={this.props.logout}>LOGOUT</FixedLinkSC>
            </TopBarSC>
          </TopBarContainerSC>
        </BackgroundWrapperSC>
      );
    } else {
      return (
        <BackgroundWrapperSC>
          <TopBarContainerSC>
            <LogoSC>GIGAPET</LogoSC>
            <TopBarSC>
              <NavLinkSC to="/signUp">SIGN UP</NavLinkSC>
              <NavLinkSC to="/login">LOG IN</NavLinkSC>
            </TopBarSC>
          </TopBarContainerSC>
        </BackgroundWrapperSC>
      );
    }
  }
}

const mapStateToProps = state => ({
  pending: state.pending,
  dragonStatus: {
    available: state.dragonStatus.available
  }
});

export default connect(
  mapStateToProps,
  { logout }
)(TopBar);
