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
          ...this.state, [ev.target.name]: ev.target.value })
        
        console.log(this.state)}


    interact = event => {

        event.preventDefault();
        this.setState({ ...this.state, counter: this.state.counter + 1 });
        this.state.counter > 10 && this.setState({ ...this.state, message: "Something's happening", counter: this.state.counter + 1, egg: false, eggCrack: true})
        this.state.counter > 20 && this.setState({ ...this.state, message: "Hatched!", counter: this.state.counter + 1, egg: false, eggCrack: false, baby: true})
        this.state.counter > 30 && this.setState({ ...this.state, message: "Adult!", counter: this.state.counter + 1, egg: false, eggCrack: false, baby: false, adult: true})
        this.state.counter > 40 && this.setState({ ...this.state, message: "Retirement! Let's reminisce!", counter: this.state.counter + 1, egg: false, eggCrack: false, baby: false, adult: false, retirement: true})
        console.log(this.state);

        // this.state.anything === "love" && this.setState({...this.state, eggSatisfied: true, counter: this.state.counter + 1})
        // this.state.anything === "fire" && this.setState({...this.state, eggCrackSatisfied: true, counter: this.state.counter + 1})
        // this.state.category === "junk" && this.state.baby && this.setState({...this.state, babySatisfied: true, counter: this.state.counter + 1})
        // this.state.category === "vegetables" && this.setState({...this.state, babySatisfied: false, counter: this.state.counter - 3})
        // this.state.category === "proteins" && this.state.anything.includes('lift') && this.state.baby && this.setState({...this.state, adultSatisfied: true, counter: this.state.counter + 1})

     


        // this.state.counter > 0 && this.state.counter < 5 && this.setState({ ...this.state, message: "Something might be happening soon.", counter: this.state.counter + 1 }) // Egg Form
        // this.state.counter > 0 && this.state.eggSatisfied && this.setState({ ...this.state, message: "Hmm, something seems to be happening.", counter: this.state.counter + 1, eggCrack: true, egg: false }) // Egg Crack
        // this.state.counter > 7 && this.setState({ ...this.state, message: "You have a feeling something will happen soon.", counter: this.state.counter + 1 }) // Egg Crack
        // this.state.counter > 10 && this.state.eggCrackSatisfied === true && this.setState({ ...this.state, message: "Wow, the egg has hatched! A miracle of the century.", counter: this.state.counter + 1, eggCrack: false, egg:false, baby: true  }) // Baby
        // this.state.counter > 10 && this.state.baby && this.setState({ ...this.state, message: "Your dragon looks very unamused.", counter: this.state.counter + 1 }) // Baby
        // this.state.counter > 18 && this.state.babySatisfied && this.setState({ ...this.state, message: "Dracarys.", counter: this.state.counter + 1, baby: false, adult: true }) // Dragon
        // this.state.counter > 25 && this.state.adultSatisfied && this.setState({ ...this.state, message: "Your Dragon is satisfied. The world is as good as yours.", counter: this.state.counter + 1, baby: false, adult: true }) // Dragon
        // this.state.counter > 100 && this.state.adultSatisfied && this.setState({ ...this.state, message: "You've conquered the world. Your dragon says his goodbyes and departs this world. You reminisce on his long life.", counter: this.state.counter + 1, baby: false, adult: false, retirement: true }) // Dragon
        // console.log(this.state.counter, this.state);
    }


    componentDidUpdate() {
        console.log("i  am in CDU")
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
                            <button type="form">Interact</button>
                        </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    kids: state.kids,
});

export default connect(mapStateToProps, {})(DragonLair);