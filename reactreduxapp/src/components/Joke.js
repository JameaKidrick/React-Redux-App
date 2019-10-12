import React from 'react'
import { connect } from 'react-redux'
import JokeCard from './JokeCard'
import JokeForm from './JokeForm'


const Joke = props => {
  return(
    <div>
      <JokeForm />
      <JokeCard 
      key={props.joke.id}
      joke={props.joke}
      />
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
)(Joke);