import React from "react";
import { connect } from "react-redux";
import { getChildren } from "../actions";
import Child from "./Child";
import styled from "styled-components";
import { fonts, colors } from "../sharedStyles";

const EditChildrenSC = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.lavender};
  width: 280px;
  margin: 30px;
  border: 1px outset rgb(200, 200, 200);
  border-radius: 10px;
  overflow: hidden;
`

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

const ChildAndArrowsSC = styled.div`
  display: flex;
  justify-content: center;
`;

const ArrowSC = styled.span`
  color: ${colors.purple};
  align-self: flex-start;
  font-size: 50px;
  margin: 24px 5px 0;
  cursor: pointer;
`

class EditChildren extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedChildNum: 0
    };
  }

  componentDidMount() {
    const id = localStorage.getItem("currentUserId");
    this.props.getChildren(id).then(() => {
      if (this.props.kids) {
        this.setState({
          localChild: this.props.kids[this.state.localChildNum]
        });
      }
    });
  }

  clickHandler = num => {
    if (!this.props.kids) {return}
    let newNum = this.state.localChildNum + num;
    if (newNum < 0) {newNum = this.props.kids.length - 1};
    if (newNum > this.props.kids.length - 1) {newNum = 0};
    console.log(newNum)
    this.setState({
      localChildNum: newNum,
      localChild: this.props.kids[newNum]
    })
  }

  render() {
    if (!this.state.localChild) {
      return <div />;
    } else
      return (
        <EditChildrenSC>
          <TitleSC>Edit Children</TitleSC>
          <ChildAndArrowsSC>
            <ArrowSC onClick={() => this.clickHandler(-1)} className="fas fa-chevron-left" />
            <Child data={this.state.localChild} />
            <ArrowSC onClick={() => this.clickHandler(1)} className="fas fa-chevron-right" />
          </ChildAndArrowsSC>
        </EditChildrenSC>
      );
  }
}

const mapStateToProps = state => {
  return {
    kids: state.kids,
    currentChild: state.currentChild
  };
};

export default connect(
  mapStateToProps,
  { getChildren }
)(EditChildren);
