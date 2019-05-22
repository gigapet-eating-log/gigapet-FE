import React, { Component } from 'react';

class SortDateFormSpecific extends Component {
    constructor() {
        super();
        this.state = {
            dateOne: "",
            dateTwo: ""
        }
    }

      changeHandlerSpecific = ev => {
          this.setState({
                [ev.target.name]: ev.target.value
          })

          console.log(this.state);
      }

      sortSpecific = event => {
          event.preventDefault();
          console.log(this.state);
      }

    render() {
        return (
            <div className='specific-date'>

                <form onSubmit={this.sortSpecific}> Find Caloric Intake from 

                    <input
                        type="date"
                        name="dateOne"
                        value={this.state.dateOne}
                        onChange={this.changeHandlerSpecific}
                        style={{margin: "0 10px"}}
                     
                    />
                    to
                    <input
                        type="date"
                        name="dateTwo"
                        value={this.state.dateTwo}
                        onChange={this.changeHandlerSpecific}
                        style={{marginLeft: "10px"}}
                       
                    /> 
                    <button type="submit">Sort</button>
                </form>
            </div>
        );
    }
}

export default SortDateFormSpecific;