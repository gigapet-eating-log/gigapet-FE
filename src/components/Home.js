import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import { getChildren, getUser, setCurrentChild, hasChildrenInit, getFood, setPupStatus } from "../actions";
import { colors } from "../sharedStyles";
import AddChild from "./AddChild";

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
  margin: 20px auto;
  padding: 0;
  user-select: none;
`;

const LabelSC = styled.label`
  color: ${colors.darkestLavender};
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const SelectSC = styled.select`
  color: ${colors.darkestLavender};
  width: 100%;
  background: transparent;
  font-size: 16px;
  border-radius: 5px;
  padding: 5px 10px 5px;
  z-index: 3;
  outline: none;
`;

const OptionSC = styled.option`
  border-radius: 10px;
`;

const AddChildPromptSC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const AddChildMessageSC = styled.p`
  font-size: 1.4rem;
  max-width: 800px;
`;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      pupStatus: {
        age: "Puppy",
        mood: "1"
      }
    }
  }
  componentDidMount() {
    const id = localStorage.getItem("currentUserId");
    this.props
      .getChildren(id)
      .then(() => {
        this.props.kids &&
        this.props.kids[0] &&
        this.props.hasChildrenInit() &&
        this.props.getFood(this.props.kids[0].id)
      })
      .then(() => {
        this.checkPupStatus();
      })
    this.props.getUser(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pending.get && !this.props.pending.get) {
      this.checkPupStatus();
    }
  }

  childSelectHandler = ev => {
    this.props.setCurrentChild(this.props.kids[ev.target.value]);
    this.props.getFood(this.props.currentChild.id)
    this.checkPupStatus();
  };

  checkPupStatus = () => {
    if (!this.props.foodEntries || !this.props.foodEntries[0]) {
      return this.props.setPupStatus({ "age": "Puppy", "mood": "1" })}
    const foodDates = this.props.foodEntries.map(item => {
      return Number(item.date.replace(/-/g, ""))
    })
    const currentDate = moment().format("YYYYMMDD");
    const lastMeal = Math.max(...foodDates);
    let age = "Puppy"
    let mood = "1"
    if (foodDates.length >= 10) {age = "Adult"}
    if (currentDate - lastMeal <= 0) {mood = 2}
    else if (currentDate - lastMeal >= 2) {mood = 3}
    this.props.setPupStatus({ "age": age, "mood": mood })
  }

  render() {
    return (
      <div>
        <Title>GIGAPET</Title>
        {this.props.kids && this.props.kids[0] && this.props.pupStatus && (
          <DogeBox>
            <Doge src={`img/Dog-${this.props.pupStatus.age}-${this.props.pupStatus.mood}.gif`} alt="" />
          </DogeBox>
        )}
        {this.props.kids && this.props.kids[0] && (
          <SelectBoxSC>
            <LabelSC>OWNER</LabelSC>
            <SelectSC onChange={this.childSelectHandler}>
              {this.props.kids && this.props.kids.map((el, index) => {
                return <OptionSC value={index}>{el.name}</OptionSC>;
              })}
            </SelectSC>
          </SelectBoxSC>
        )}
        {this.props.kids && !this.props.kids[0] && (
          <AddChildPromptSC>
            <AddChildMessageSC>
              Welcome to Gigapet! This app is designed to help your children
              develop healthy and consistent eating habits. Please add a child
              to your account and give him or her a daily calorie goal to get
              started.
            </AddChildMessageSC>
            <AddChild />
          </AddChildPromptSC>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  kids: state.kids,
  currentChild: state.currentChild,
  hasChildren: state.hasChildren,
  pupStatus: state.pupStatus,
  foodEntries: state.foodEntries,
  pending: state.pending
});

export default connect(
  mapStateToProps,
  { getChildren, getUser, setCurrentChild, hasChildrenInit, getFood, setPupStatus}
)(Home);
