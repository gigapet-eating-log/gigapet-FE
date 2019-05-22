import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { setCurrentChild } from "../actions";
import { colors } from "../sharedStyles";

const Title = styled.h1`
  font-family: 'Press Start 2P', cursive;
  margin-top: 60px;
`

const DogeBox = styled.div`
  width: 300px;
  height: 300px;
  margin: 35px auto 20px;
  padding: 15px;
  border-radius: 50px;
  box-shadow: 0 0 5px 15px ${colors.lightPurple};
`;

const Doge = styled.img`
  width: 100%;
  margin-left: 10px;
`;

const SelectBoxSC = styled.div`
  display: flex;
  position: relative;
  width: 100px;
  flex-direction: column;
  color: ${colors.purple};
  background: white;
  font-weight: bold;
  border: 2px solid ${colors.purple};
  border-radius: 10px;
  margin: 20px auto;
`

const LabelSC = styled.label`
  position: absolute;
  padding-left: 14px;
  color: ${colors.purple};
  font-size: 14px;
  font-weight: bold;
`

const SelectSC = styled.select`
  color: ${colors.purple};
  width: 100%;
  background: transparent;
  border: none;
  font-weight: bold;
  border-radius: 10px;
  padding: 20px 10px 0;
  z-index: 3;
  outline: none;
`

const dogeAge = "Puppy";
const dogeMood = "2";

const Home = (props) => {
  const childSelectHandler = ev => {
    const selectedChild = props.children.filter(el => {
      return (el.id == ev.target.value)
    })
    props.setCurrentChild(selectedChild)
  }

  return (
    <div>
      <Title>GIGAPET</Title>
      <DogeBox>
        <Doge src={`img/Dog-${dogeAge}-${dogeMood}.gif`} alt="" />
      </DogeBox>
      <Link to="/add-entry">Feed The Pupper</Link>
      <SelectBoxSC>
        <LabelSC>OWNER</LabelSC>
        <SelectSC onChange={childSelectHandler}>
          {props.children.map(el => {
            return <option value={el.id}>{el.name.toUpperCase()}</option>;
          })}
        </SelectSC>
      </SelectBoxSC>
    </div>
  );
};

const mapStateToProps = state => ({
  children: state.children,
  currentChild: state.currentChild
});

export default connect(
  mapStateToProps,
  { setCurrentChild }
)(Home);