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
  const [selectedValue, setSelectedValue] = useState('')
  const [value, setValue] = useState('Programming');
  
  const [selectedState, setSelectedState] = useState([])
  const [state, setState] = React.useState([]
  //   {
  //   gilad: true,
  //   jason: false,
  //   antoine: false,
  // }
  );
  const { nsfw, religious, political } = state;
  const error = [nsfw, religious, political].filter(v => v).length < 2;

  const handleChange = e => {
    setSelectedValue(e.target.value)
  };

  const handleChange2 = name => event => {
  setSelectedState(event.target.checked === true ? [...state, name] : false
  )};

  console.log('VALUE', value)
  console.log('SELECTEDVALUE', selectedValue)
  console.log('STATE', state)
  console.log('SECLECTEDSTATE', selectedState)

  const handleSubmit = e => {
    e.preventDefault();

  }

  const handleSubmit2 = e => {
    e.preventDefault();
    setSelectedValue('')
    };

  useEffect(() => {
    props.getJokes(value);
  }, [value]);

  
  if (props.isFetching){
    return <h2>MAKING JOKES...</h2>
  }
  return (
    <div>
      {props.error && <p>{props.error}</p>}
      <FormControl required error={error} onSubmit={handleSubmit} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Pick Category</FormLabel>
        <FormHelperText>Be careful</FormHelperText>
        <RadioGroup aria-label="category" name="category" value={value, selectedValue} onChange={handleChange}>
          <FormControlLabel value="Any" control={<Radio />} label="Any" />
          <FormControlLabel value="Dark" control={<Radio />} label="Dark" />
          <FormControlLabel value="Miscellaneous" control={<Radio />} label="Miscellaneous" />
          <FormControlLabel value="Programming" control={<Radio />} label="Programming" />
        </RadioGroup>
      </FormControl>
      
      <FormControl onSubmit={handleSubmit2} component="fieldset" className={classes.formControl}>
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
      </FormControl>

      <br />
      <Button type='submit' variant="outlined" className={classes.button} onClick={() => {setValue(selectedValue);
      setState(selectedState)}}>
        New Joke
      </Button>
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