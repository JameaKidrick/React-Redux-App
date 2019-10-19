import React from 'react'
import JokeCard from './JokeCard'
import JokeForm from './JokeForm'

const styles = {
  display: 'flex',
  justifyContent: 'space-between'
}

const formStyles = {
  width: '50%',
  paddingLeft: '10%'
}

const cardStyles = {
  width: '50%',
  paddingRight: '10%'
}

const Joke = props => {
  return(
    <div style={styles}>
      {props.error && <p>{props.error}</p>}
      <section style={formStyles}>
        <JokeForm />
      </section>
      <section style={cardStyles}>
        <JokeCard />
      </section>
    </div>
  )
}


export default Joke;