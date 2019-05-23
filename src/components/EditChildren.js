import React from "react";
import { connect } from "react-redux";
import { getChildren } from "../actions";
import Child from "./Child";
import styled from "styled-components";
import { colors } from "../sharedStyles";

const ChildAndArrowsSC = styled.div`
  display: flex;
  justify-content: center;
`;

const ArrowSC = styled.span`
  color: ${colors.purple};
  align-self: center;
  font-size: 50px;
  margin: 0 2px;
  transform: scale(.75, 1);
  cursor: pointer;
`

class EditChildren extends React.Component {
  constructor() {
    super();
    this.state = {
      localChild: {},
      localChildNum: 0
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
        <div>
          <h2>Edit Children</h2>
          <ChildAndArrowsSC>
            <ArrowSC onClick={() => this.clickHandler(-1)} className="fas fa-chevron-left" />
            <Child data={this.state.localChild} key={this.state.localChild.id} />
            <ArrowSC onClick={() => this.clickHandler(1)} className="fas fa-chevron-right" />
          </ChildAndArrowsSC>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    kids: state.kids
  };
};

export default connect(
  mapStateToProps,
  { getChildren }
)(EditChildren);
