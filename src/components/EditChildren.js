import React from "react";
import { connect } from "react-redux";
import { getChildren } from "../actions";
import Child from "./Child";
import styled from "styled-components";

const ChildrenBoxSC = styled.div`
  display: flex;
  justify-content: center;
`;

class EditChildren extends React.Component {
  componentDidMount() {
    const id = localStorage.getItem("currentUserId");
    this.props.getChildren(id);
  }

  render() {
    console.log(this.props.kids);
    return (
      <div>
        <h2>Edit Children</h2>
        <ChildrenBoxSC>
          {this.props.kids &&
            this.props.kids.map(item => {
              return <Child data={item} key={item.id} />;
            })}
        </ChildrenBoxSC>
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
