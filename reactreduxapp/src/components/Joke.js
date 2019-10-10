import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import JokeCard from './JokeCard'
import { getJokes } from '../actions'

const Joke = props => {
  useEffect(() => {
    props.getJokes();
  }, []);

  if (props.isFetching){
    return <h2>MAKING JOKES...</h2>
  }
  console.log('JOKEPROPS', props)
  return (
      <div>
        {props.error && <p>{props.error}</p>}
        <JokeCard joke={props.joke}/>
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
  { getJokes }
)(Joke);