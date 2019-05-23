import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { getChildren, setCurrentChild } from "../actions";
import { colors } from "../sharedStyles";

const Title = styled.h1`
  font-family: "Press Start 2P", cursive;
  margin-top: 60px;
`;

const DogeBox = styled.div`
  width: 300px;
  height: 300px;
  margin: 35px auto 20px;
  padding: 15px;
  border-radius: 50px;
  box-shadow: 0 0 5px 15px ${colors.lightPurple};
  user-select: none;
`;

const Doge = styled.img`
  width: 100%;
  margin-left: 10px;
`;

const SelectBoxSC = styled.div`
  display: flex;
  position: relative;
  width: 200px;
  flex-direction: column;
  color: ${colors.purple};
  background: white;
  font-weight: bold;
  border: 2px solid ${colors.purple};
  border-radius: 10px;
  margin: 20px auto;
  user-select: none;
`;

const LabelSC = styled.label`
  position: absolute;
  padding-left: 14px;
  color: ${colors.purple};
  font-size: 14px;
  font-weight: bold;
`;

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
`;

const dogeAge = "Puppy";
const dogeMood = "2";

class Home extends React.Component {

  componentDidMount() {
    console.log("CDM Home")
    console.log(this.props.currentChild);
    const id = localStorage.getItem("currentUserId");
    this.props.getChildren(id)
    .then(
       (!this.props.currentChild) && 
      this.props.setCurrentChild(this.props.kids[0])
    )
  }

  childSelectHandler = ev => {
    console.log(ev.target.value)
    const selectedChild = this.props.kids.find(el => {
      return el.id == ev.target.value;
    });
    this.props.setCurrentChild(selectedChild);
  };

  render() {
    return (
      <div>
        <Title>GIGAPET</Title>
        <DogeBox>
          <Doge src={`img/Dog-${dogeAge}-${dogeMood}.gif`} alt="" />
        </DogeBox>
        <Link to="/add-entry">Feed The Pupper</Link>
        <SelectBoxSC>
          <LabelSC>OWNER</LabelSC>
          <SelectSC onChange={this.childSelectHandler}>
            {this.props.kids &&
              this.props.kids.map(el => {
                return <option value={el.id}>{el.name.toUpperCase()}</option>;
              })}
          </SelectSC>
        </SelectBoxSC>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  kids: state.kids,
  currentChild: state.currentChild
});

export default connect(
  mapStateToProps,
  { getChildren, setCurrentChild }
)(Home);
