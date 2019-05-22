import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../sharedStyles';
import AddChild from './AddChild';

const DogeBox = styled.div`
  width: 300px;
  height: 300px;
  margin: 50px auto 20px;
  padding: 15px;
  border-radius: 50px;
  box-shadow: 0 0 5px 15px ${colors.lightPurple};
`

const Doge = styled.img`
  width: 100%;
  margin-left: 10px;
`

const dogeAge = "Puppy"
const dogeMood = "2"

const Home = () => {
  return (
    <div>
      <h1>BEHOLD THE DOGGO</h1>
      <DogeBox>
        <Doge src={`img/Dog-${dogeAge}-${dogeMood}.gif`} alt=""/>
      </DogeBox>
      <Link to="/add-entry">Feed The Pupper</Link>
      <AddChild />
    </div>
  )
}

export default Home