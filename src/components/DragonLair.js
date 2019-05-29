import React, { Component } from 'react';
import { Title } from './Home';
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../sharedStyles";
import {launchIncubatorRegular, launchIncubatorPeace} from '../actions';


export const GameFont = styled.div`
  font-family: "Press Start 2P", cursive;
  color: ${colors.darkestLavender};
  font-size: 18px;
  width:70%;
  margin: 0 auto;
  padding:1%;
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
            adultPeace: false,
            adultWar: false,
            endGame: false
        }
    }

    changeHandler = ev => {
        this.setState({
          ...this.state, [ev.target.name]: ev.target.value })}

    incubatorLaunch = event => {
        event.preventDefault();

        this.state.endGame && this.state.retirement && this.props.launchIncubatorRegular();
        this.state.endGame && this.state.adultPeace && this.props.launchIncubatorPeace();

        this.setState({...this.state, message: "Check out your new Incubator Tab at the top!"})

    }


    interact = event => {

        event.preventDefault();
        // Interact Default Counter Value
        this.setState({ ...this.state, counter: this.state.counter + 1 });

        // Conditionals for transitioning between form changes
        this.state.counter > 2 && this.state.egg && this.setState({ ...this.state, message: "Something might be happening soon, but it seems to be craving something. Are you the mother?", counter: this.state.counter + 1 }) // Egg Form Basic Counter
        this.state.counter > 2 && this.state.eggSatisfied && this.setState({ ...this.state, message: "Hmm, something seems to be happening. Soon...", counter: this.state.counter + 1, egg: false, baby: false, adult: false, eggCrack: true }) // Transform to Egg Crack
        this.state.counter > 2 && this.state.eggCrack && this.setState({ ...this.state, message: "It's a little chilly here. Who invited the Night King?", counter: this.state.counter + 1 }) // Egg Crack
        this.state.counter > 2 && this.state.baby && this.setState({ ...this.state, message: "Your dragon looks thin and pale...", counter: this.state.counter + 1, egg: false, eggCrack: false, baby: true, adult: false  }) // Baby
        this.state.counter > 20 && this.state.baby && this.setState({ ...this.state, message: "Your dragon looks very unamused.", counter: this.state.counter + 1 }) // Baby
        this.state.counter > 2 && this.state.baby && this.state.babySatisfied && this.setState({ ...this.state, message: "That was delicious, can I have more?", counter: this.state.counter + 1 }) // Baby Satisfied
        this.state.counter > 30 && this.state.babySatisfied && this.setState({ ...this.state, message: 'Amazing, the dragon have grown quite a bit!', counter: this.state.counter + 1, egg: false, eggCrack: false, baby: false, adult: true, retirement: false }) // Dragon
        this.state.counter > 30 && this.state.adult && this.setState({ ...this.state, message: 'I need to grow bigger and stronger! What should I do? What should I eat?', counter: this.state.counter + 1})
        this.state.counter > 30 && this.state.adultSatisfied && this.setState({ ...this.state, message: "Your Dragon is satisfied and will follow your command. The world is as good as yours, but that is your choice? Choose. Peace or War?", counter: this.state.counter + 1, baby: false, adult: true }) // Dragon Satisfied
        

        // Conditionals for input and select 
        if (this.state.anything.toLowerCase().includes("love")) {this.state.egg && this.setState({...this.state, eggSatisfied: true, counter: this.state.counter + 1, anything: "", egg: false, eggCrack: true, baby: false, adult: false, retirement: false, message: "Wow, what did you do?"})}
        if (this.state.anything.toLowerCase().includes("dracarys")) {this.state.eggCrack && this.setState({...this.state, eggCrackSatisfied: true, counter: this.state.counter + 1, anything: "", egg: false, eggCrack: false, baby: true, adult: false, retirement: false, message: "Wow, the egg has hatched! A miracle of the century."})}
        if (this.state.category.includes("vegetables")) {this.state.baby && this.setState({...this.state, babySatisfied: true, counter: this.state.counter + 5, category: "x", message: "That was delicious, can I have more?"})}
        if (this.state.category.includes("grains")) {this.state.baby && this.setState({...this.state, counter: this.state.counter + 2, category: "x", message: "This piece of grain is pretty good! Do you have some, what was it... peanut butta?"})}
        if (this.state.category.includes("fruits")) {this.state.baby && this.setState({...this.state, counter: this.state.counter + 2, category: "x", message: "Yummy, very sweet! More please..."})}
        if (this.state.category.includes("dairy")) {this.state.baby && this.setState({...this.state, counter: this.state.counter + 2, category: "x", message: "This looks weird, where did this come from? ... you consume this?"})}
        if (this.state.category.includes("proteins")) {this.state.baby && this.setState({...this.state, counter: this.state.counter + 2, category: "x", message: "I can feel the energy from this. Chewy..."})}
        if (this.state.category.includes("junk")) {this.state.baby && this.setState({...this.state, babySatisfied: false, counter: this.state.counter - 5, category: "x", message: "That was disgusting..."})}
        this.state.category.includes("proteins") && this.state.anything.toLowerCase().includes('lift') && this.state.adult && this.setState({...this.state, adultSatisfied: true, counter: this.state.counter + 1, category: "x", anything: "", message: "You're right, a dragon is nothing without its strength!"})

        // From this point, the Dragon has three choices it could go: Peace, War, or Neither/None where he retires and hands you an un-lockable egg that you can grow into your very own avatar on your home-screen. Peace also grants the egg avatar. 
        this.state.anything.toLowerCase().includes("war") && this.state.adultSatisfied && this.state.adult && this.setState({...this.state, counter: this.state.counter + 1, anything: "", egg: false, eggCrack: false, baby: false, adult: false, retirement: false, adultPeace: false, adultWar: true, endGame: true, message: "With great power comes with great responsibilities. Think it over next time..."})
        this.state.anything.toLowerCase().includes("peace") && this.state.adultSatisfied && this.state.adult && this.setState({...this.state, counter: this.state.counter + 1, anything: "", egg: false, eggCrack: false, baby: false, adult: false, retirement: false, adultPeace: true, adultWar: false, endGame: true, message: "Coexistence is hard but necessary. Looks like your dragon has left something behind for you. Take good care of it!"})
        this.state.anything.toLowerCase().includes("neither") && this.state.adultSatisfied && this.state.adult && this.setState({...this.state, counter: this.state.counter + 1, anything: "", egg: false, eggCrack: false, baby: false, adult: false, retirement: true, adultPeace: false, adultWar: false, endGame: true, message: "Sometimes it really is best to do nothing... Looks like your dragon has left something behind for you. Take good care of it!"})
 
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
                    {this.state.adultPeace === true && <img src={require('../assets/Adult_Peace.gif')} alt="loading..." />}
                    {this.state.adultWar === true && <img src={require('../assets/Adult_War.gif')} alt="loading..." />}
                    {this.state.retirement === true && <img src={require('../assets/Adult_Retire.gif')} alt="loading..." />}
                </div>

                <GameFont>{this.state.message}</GameFont>

                { !this.state.endGame && <form onSubmit={this.interact} autocomplete="off">
                        <div className='interact-form-lair' spellCheck="false">
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
                                <option value="x" hidden>
                                Choose
                                </option>
                                <option value="grains">Grains</option>
                                <option value="fruits">Fruits</option>
                                <option value="vegetables">Vegetables</option>
                                <option value="dairy">Dairy</option>
                                <option value="proteins">Proteins</option>
                                <option value="junk">Junk</option>
                            </select>

                            <i class="fas fa-hand-paper fa-2x" onClick={this.interact}></i>
                        </div>
                </form> }

                {this.state.endGame && !this.state.adultWar && <i class="fas fa-egg fa-2x" onClick={this.incubatorLaunch}></i>}

            </div>
        );
    }
}


const mapStateToProps = state => ({
    currentChild: state.currentChild
});

export default connect(mapStateToProps, {launchIncubatorRegular, launchIncubatorPeace})(DragonLair);