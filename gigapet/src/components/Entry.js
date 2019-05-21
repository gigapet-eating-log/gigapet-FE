import React from "react";
import { connect } from "react-redux";
import { putFood, deleteFood } from "../actions";

class Entry extends React.Component {
  constructor() {
    super();
    this.state = {
      editActive: false,
      editInput: {
        food: "",
        date: moment().format('YYYY-MM-DD'),
        category: ""
      }
    };
  }
  editHandler = ev => {
    ev.preventDefault();
    if (!this.state.editActive) {
      this.setState({
        editActive: true,
        editInput: {
          name: this.props.item.name,
          age: this.props.item.age,
          height: this.props.item.height
        }
      });
    } else {
      this.props.putFood(this.state.editInput, this.props.item.id);
      this.setState({
        editActive: false,
        editInput: {
          name: "",
          age: "",
          height: ""
        }
      });
    }
  };

  changeHandler = ev => {
    this.setState({
      editInput: { ...this.state.editInput, [ev.target.name]: ev.target.value }
    });
  };

  deleteHandler = ev => {
    ev.preventDefault();
    this.props.deleteFood(this.props.item.id);
  };

  render() {
    return (
      <div className="Smurf">
        {!this.state.editActive ? (
          <React.Fragment>
            <h3>{this.props.item.name}</h3>
            <p>{this.props.item.age}</p>
            <p>{this.props.item.height}</p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <input
              className="name"
              name="name"
              value={this.state.editInput.name}
              onChange={this.changeHandler}
            />
            <div>
              <input
                className="age"
                name="age"
                value={this.state.editInput.age}
                onChange={this.changeHandler}
              />
            </div>
            <div>
              <input
                className="height"
                name="height"
                value={this.state.editInput.height}
                onChange={this.changeHandler}
              />
            </div>
          </React.Fragment>
        )}
        <div className="button-box">
          <button onClick={this.editHandler}>{this.state.editActive ? "submit" : "edit"}</button>
          <button onClick={this.deleteHandler}>delete</button>
        </div>
      </div>
    );
  }
}

// Smurf.defaultProps = {
//   name: "",
//   height: "",
//   age: ""
// };

export default connect(
  null,
  { putFood, deleteFood }
)(Entry);