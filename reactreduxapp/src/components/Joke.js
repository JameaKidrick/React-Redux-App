import React from 'react'
import JokeCard from './JokeCard'
import JokeForm from './JokeForm'


const Joke = props => {
  return(
    <div>
      {props.error && <p>{props.error}</p>}
      <JokeForm />
      <JokeCard />
    </div>
  )
}


export default Joke;