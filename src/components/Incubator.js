import React, { Component } from 'react';
import { connect } from 'react-redux';
import {GameFont} from '../components/DragonLair';
import {Title} from '../components/Home';



class Incubator extends Component {
    constructor() {
        super();
        this.state = {
            message: "Continue to eat daily and healthy to hatch your new friend!"
        }
    }


    render() {
        return (
            <div className='incubator-container'>
                <div className='pet-container'>
                    <Title>Incubator</Title>

                    {this.props.dragonStatus.eggRegular && <img src={require('../assets/Egg_Regular.gif')} alt="loading..." />}
                    {this.props.dragonStatus.eggPeace && <img src={require('../assets/Egg_Peace.gif')} alt="loading..." />}


                    <GameFont>{this.state.message}</GameFont>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    pending: state.pending,
    dragonStatus: {
        available: state.dragonStatus.available,
        eggRegular: state.dragonStatus.eggRegular,
        eggPeace: state.dragonStatus.eggPeace
    }
});

export default connect(mapStateToProps, {})(Incubator);