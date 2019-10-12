import React from 'react';
import { connect } from 'react-redux'

const JokeCard = props => {
  if (props.fetching){
    return <h2>MAKING JOKES...</h2>
  }
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

const mapStateToProps = state => {
  return {
    joke: state.joke,
    isFetching: state.isFetching,
    error: state.error
  };
};

export default connect(
  mapStateToProps, 
  { }
)(JokeCard);