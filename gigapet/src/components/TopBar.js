import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TopBarContainerSC = styled.div`
    background: silver;
    margin-top: -10px;
    margin-bottom: 20px;
    padding: 20px;
`

const TopBarSC = styled.div`
  display: flex;
  width: 500px;
  justify-content: center;
  margin: 10px auto 0;
`

const LinkSC = styled(Link)`
  display: ${props => props.visible ? "block" : "none"};
`

const Logout = styled(LinkSC)`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`

const logout = () => {
  if (!localStorage.getItem('token')) {return};
  localStorage.clear();
  setTimeout(() => window.location.reload(), 500)
}

const visibleHandler = () => {
  return (localStorage.getItem('token'))
}

const TopBar = () => {
  return (
    <TopBarContainerSC>
      <TopBarSC>
        <Link to="/auth">LOG IN / SIGN UP</Link>
        <LinkSC visible={visibleHandler()} to="/">HOME</LinkSC>
        <LinkSC visible={visibleHandler()} to="/add-entry">ADD FOOD</LinkSC>
        <LinkSC visible={visibleHandler()} to="/history">FOOD HISTORY</LinkSC>
        <Logout visible={visibleHandler()} onClick={logout}>LOGOUT</Logout>
      </TopBarSC>
    </TopBarContainerSC>
  )
}

export default TopBar