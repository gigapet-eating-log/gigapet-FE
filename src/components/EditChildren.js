import React from "react";
import { connect } from "react-redux";
import { getChildren } from "../actions";
import Child from "./Child";

class EditChildren extends React.Component {
  componentDidMount() {
    const id = localStorage.getItem("currentUserId");
    this.props.getChildren(id);
  }

  render() {
    return (
      <div className="EditChildren">
        <p>test</p>
        {this.props.kids &&
          this.props.kids.map(item => {
            return <Child data={item} key={item.id} />;
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    kids: state.kids
  };
};

export default connect(mapStateToProps, { getChildren })(EditChildren);