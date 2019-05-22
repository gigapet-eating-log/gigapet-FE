import React from "react";
import { connect } from "react-redux";
import { getFood } from "../actions";

import FoodItem from "./Entry";

class AllEntries extends React.Component {
  componentDidMount() {
    this.props.getFood();
  }

  render() {
    return (
      <div className="AllEntries">
        {this.props.foodEntries &&
          this.props.foodEntries.map(item => {
            return <FoodItem data={item} key={item.id} />;
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    foodEntries: state.foodEntries
  };
};

export default connect(mapStateToProps, { getFood })(AllEntries);