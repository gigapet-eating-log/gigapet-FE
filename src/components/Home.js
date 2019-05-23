import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { getChildren, setCurrentChild } from "../actions";
import { colors } from "../sharedStyles";

const Title = styled.h1`
  font-family: "Press Start 2P", cursive;
  color: ${colors.darkestLavender};
  font-size: 40px;
  margin-top: 60px;
`;

const DogeBox = styled.div`
  max-width: 350px;
  max-height: 350px;
  margin: 35px auto 35px;
  padding: 15px;
  border-radius: 50px;
  box-shadow: 0 0 5px 15px ${colors.darkLavender};
  user-select: none;
`;

const Doge = styled.img`
  width: 100%;
  margin-left: 10px;
`;

const SelectBoxSC = styled.div`
  display: flex;
  position: relative;
  width: 150px;
  flex-direction: column;
  color: ${colors.darkestLavender};
  background: white;
  font-weight: bold;
  outline: ${colors.lavender};
  border: 1px solid ${colors.darkestLavender};
  border-radius: 8px;
  /* border-radius: 4px;
  border: 1px solid #bbb; */
  margin: 20px auto;
  padding: 0;
  user-select: none;
`;

const LabelSC = styled.label`
  position: absolute;
  padding-left: 14px;
  color: ${colors.darkestLavender};
  font-size: 16px;
  font-weight: bold;
`;

const SelectSC = styled.select`
  color: ${colors.darkestLavender};
  width: 100%;
  background: transparent;
  border: none;
  font-size: 16px;
  border-radius: 10px;
  padding: 25px 10px 5px;
  z-index: 3;
  outline: none;
`;

const OptionSC = styled.option`
    border-radius: 10px;
`;

const dogeAge = "Puppy";
const dogeMood = "2";

class Home extends React.Component {
  componentDidMount() {
    const id = localStorage.getItem("currentUserId");
    this.props.getChildren(id);
  }

  childSelectHandler = ev => {
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
        <SelectBoxSC>
          <LabelSC>OWNER</LabelSC>
          <SelectSC onChange={this.childSelectHandler}>
            {this.props.kids &&
              this.props.kids.map(el => {
                return <OptionSC value={el.id}>{el.name}</OptionSC>;
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
