import React, { Component } from 'react';
import { Title } from './Home';
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../sharedStyles";


const GameFont = styled.div`
  font-family: "Press Start 2P", cursive;
  color: ${colors.darkestLavender};
  font-size: 20px;
`;


class DragonLair extends Component {
    constructor() {
        super();
        this.state = {
            anything: "",
            category: "x",
            message: "What's this? How did you get here?",
            counter: 0,
            egg: true,
            eggCrack: false,
            baby: false,
            adult: false,
            eggSatisfied: false,
            eggCrackSatisfied: false,
            babySatisfied: false,
            adultSatisfied: false,
            retirement: false,
        }
    }

    changeHandler = ev => {
        this.setState({
          ...this.state, [ev.target.name]: ev.target.value })}


    interact = event => {

        event.preventDefault();
        // Interact Default Counter Value
        this.setState({ ...this.state, counter: this.state.counter + 1 });

        // Pity System
        // this.state.counter > 15 && this.setState({ ...this.state, message: "Something's happening", counter: this.state.counter + 1, egg: false, eggCrack: true})
        // this.state.counter > 25 && this.setState({ ...this.state, message: "Hatched!", counter: this.state.counter + 1, egg: false, eggCrack: false, baby: true})
        // this.state.counter > 35 && this.setState({ ...this.state, message: "Adult!", counter: this.state.counter + 1, egg: false, eggCrack: false, baby: false, adult: true})
        // this.state.counter > 45 && this.setState({ ...this.state, message: "Retirement! Let's reminisce!", counter: this.state.counter + 1, egg: false, eggCrack: false, baby: false, adult: false, retirement: true})

        this.state.counter > 2 && this.state.egg && this.setState({ ...this.state, message: "Something might be happening soon, but it seems to be craving something. Are you the mother?", counter: this.state.counter + 1 }) // Egg Form Basic Counter
        this.state.counter > 2 && this.state.eggSatisfied && this.setState({ ...this.state, message: "Hmm, something seems to be happening. Soon...", counter: this.state.counter + 1, egg: false, baby: false, adult: false, eggCrack: true }) // Transform to Egg Crack
        this.state.counter > 2 && this.state.eggCrack && this.setState({ ...this.state, message: "It's a little chilly here. Who invited the Night King?", counter: this.state.counter + 1 }) // Egg Crack
        this.state.counter > 2 && this.state.baby && this.setState({ ...this.state, message: "Wow, the egg has hatched! A miracle of the century.", counter: this.state.counter + 1, egg: false, eggCrack: false, baby: true, adult: false  }) // Baby
        this.state.counter > 30 && this.state.baby && this.setState({ ...this.state, message: "Your dragon looks very unamused.", counter: this.state.counter + 1 }) // Baby
        this.state.counter > 2 && this.state.baby && this.state.babySatisfied && this.setState({ ...this.state, message: "That was delicious, can I have more?", counter: this.state.counter + 1 }) // Baby Satisfied
        this.state.counter > 50 && this.state.babySatisfied && this.setState({ ...this.state, message: "Now that I am grown, what do you ask of me?", counter: this.state.counter + 1, egg: false, eggCrack: false, baby: false, adult: true, retirement: false }) // Dragon
        // this.state.counter > 25 && this.state.adultSatisfied && this.setState({ ...this.state, message: "Your Dragon is satisfied. The world is as good as yours.", counter: this.state.counter + 1, baby: false, adult: true }) // Dragon
        // this.state.counter > 100 && this.state.adultSatisfied && this.setState({ ...this.state, message: "You've conquered the world. Your dragon says his goodbyes and departs this world. You reminisce on his long life.", counter: this.state.counter + 1, baby: false, adult: false, retirement: true }) // Dragon
        // console.log(this.state.counter, this.state);

        if (this.state.anything.toLowerCase().includes("love")) {this.setState({...this.state, eggSatisfied: true, counter: this.state.counter + 1, anything: "", egg: false, eggCrack: true, baby: false, adult: false, retirement: false})}
        if (this.state.anything.toLowerCase().includes("dracarys")) {this.setState({...this.state, eggCrackSatisfied: true, counter: this.state.counter + 1, anything: "", egg: false, eggCrack: false, baby: true, adult: false, retirement: false})}
        if (this.state.category.includes("junk")) {this.state.baby && this.setState({...this.state, babySatisfied: true, counter: this.state.counter + 5, category: "x"})}
        if (this.state.category.includes("vegetables")) {this.setState({...this.state, babySatisfied: false, counter: this.state.counter - 3, category: "x"})}
        this.state.category.includes("proteins") && this.state.anything.toLowerCase().includes('lift') && this.state.adult && this.setState({...this.state, adultSatisfied: true, counter: this.state.counter + 1, category: "x", anything: ""})

        console.log(this.state);
 
    }


    componentDidUpdate() {
        console.log(this.state)
    }



    render() {
        return (
            <div className='lair'>
                <Title>Welcome to the Secret Lair</Title>

                <div className='dragon-state'>
                    {this.state.egg === true && <img src={require('../assets/Egg_Shiny.gif')} alt="loading..." />}
                    {this.state.eggCrack === true && <img src={require('../assets/Egg_Crack.gif')} alt="loading..." />}
                    {this.state.baby === true && <img src={require('../assets/Baby.gif')} alt="loading..." />}
                    {this.state.adult === true && <img src={require('../assets/Adult.gif')} alt="loading..." />}
                    {this.state.retirement === true && <img src={require('../assets/Egg_To_Adult.gif')} alt="loading..." />}
                </div>

                <div className='state'>
                    <p>Anything: {this.state.anything} Category: {this.state.category} Counter: {this.state.counter}</p>
                </div>

                <GameFont>{this.state.message}</GameFont>

                <form onSubmit={this.interact}>
                        <div className='interact-form' spellCheck="false">
                            <input
                                type="text"
                                name="anything"
                                placeholder="Endless Possibilities."
                                value={this.state.anything}
                                onChange={this.changeHandler}
                                
                            />
                            
                            <select
                                name="category"
                                placeholder="x"
                                value={this.state.category}
                                onChange={this.changeHandler}
                                >

                                <option value="vegetables">Vegetables</option>
                                <option value="fruits">Fruits</option>
                                <option value="grains">Grains</option>
                                <option value="dairy">Dairy</option>
                                <option value="proteins">Proteins</option>
                                <option value="junk">Junk</option>
                            </select>
                            <i class="fas fa-hand-paper fa-2x" onClick={this.interact}></i>
                            {/* <button type="form">Interact</button> */}
                        </div>
                </form>
            </div>
        );
    }
}

// anything: "",
// category: "x",
// message: "What's this? How did you get here?",
// counter: 0,
// egg: true,
// eggCrack: false,
// baby: false,
// adult: false,
// eggSatisfied: false,
// eggCrackSatisfied: false,
// babySatisfied: false,
// adultSatisfied: false,
// retirement: false,

const mapStateToProps = state => ({
    kids: state.kids,
});

export default connect(mapStateToProps, {})(DragonLair);