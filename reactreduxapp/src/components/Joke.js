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
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });
  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter(v => v).length < 2;

  const handleChange = e => {
    setSelectedValue(e.target.value)
  };

  const handleChange2 = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValue(e.target.value);
  }
  console.log(state)

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
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={gilad} onChange={handleChange2('gilad')} value="gilad" />}
            label="Gilad Gray"
          />
          <FormControlLabel
            control={<Checkbox checked={jason} onChange={handleChange2('jason')} value="jason" />}
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange2('antoine')} value="antoine" />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
      </FormControl>

      <br />
      <Button type='submit' variant="outlined" className={classes.button} onSubmit={handleSubmit} onClick={() => setValue(selectedValue)}>
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