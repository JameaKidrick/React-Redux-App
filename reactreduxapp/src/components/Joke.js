import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import JokeCard from './JokeCard'
import { getJokes } from '../actions'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';

// STYLING
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const Joke = props => {
  const classes = useStyles();
  const [value, setValue] = useState('Programming');
  const [state, setState] = React.useState(
    {
    nsfw: true,
    religious: false,
    political: false,
  }
  );
  const { nsfw, religious, political } = state;
  const error = [nsfw, religious, political].filter(v => v).length < 2;

  const handleChange = e => {
    setValue(e.target.value)
  };

  const handleChange2 = name => event => {
    // console.log('here')
  setState({...state, [name]:event.target.checked})
};

  console.log('VALUE', value)
  console.log('STATE', state)

  const handleSubmit = e => {
    e.preventDefault();
    let str = '';
    for(let key in state){
      if(state[key]){
        str += `${key}`
      }
    }
    console.log('str', str)
    if(str.length > 0){
      str = `?blacklistFlags=${str}`
    }
    newJoke(value+str);
    console.log(value+str)
  }

  const newJoke = (searchQuery = value) => {
    props.getJokes(searchQuery);
  }

  useEffect(() => {
    newJoke()
  }, []);

  
  if (props.isFetching){
    return <h2>MAKING JOKES...</h2>
  }
  return (
    <div>
      {props.error && <p>{props.error}</p>}
      <form onSubmit={handleSubmit}>
      <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Pick Category</FormLabel>
        <FormHelperText>Be careful</FormHelperText>
        <RadioGroup aria-label="category" name="category" value={value} onChange={handleChange}>
          <FormControlLabel value="Any" control={<Radio />} label="Any" />
          <FormControlLabel value="Dark" control={<Radio />} label="Dark" />
          <FormControlLabel value="Miscellaneous" control={<Radio />} label="Miscellaneous" />
          <FormControlLabel value="Programming" control={<Radio />} label="Programming" />
        </RadioGroup>
        <FormLabel component="legend">WORK IN PROGRESS: Blacklist Topics</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={nsfw} onChange={handleChange2('nsfw')} value="nsfw" />}
            label="NSFW"
          />
          <FormControlLabel
            control={<Checkbox checked={religious} onChange={handleChange2('religious')} value="religious" />}
            label="Religious"
          />
          <FormControlLabel
            control={
              <Checkbox checked={political} onChange={handleChange2('political')} value="political" />
            }
            label="Political"
          />
        </FormGroup>
        <Button type='submit' variant="outlined" className={classes.button}>
        New Joke
      </Button>
      </FormControl>
      </form>

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
  { getJokes }
)(Joke);