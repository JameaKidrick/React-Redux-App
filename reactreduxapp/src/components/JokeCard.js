import React from 'react';



const JokeCard = props => {
  return(
    <div>
      <h2>{`${props.joke.category} Joke`}</h2>
      {
        props.joke.type === 'single' ? 
        <p>{props.joke.joke}</p> : 
        <>
          <h3>{props.joke.setup}</h3> 
          <p>{props.joke.delivery}</p> 
        </>
      }
    </div>
  )
}

export default JokeCard;