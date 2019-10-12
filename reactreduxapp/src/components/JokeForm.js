import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getJokes } from '../actions'

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { grey, red, yellow } from '@material-ui/core/colors';
  // https://material-ui.com/customization/color/

// STYLING
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: yellow['A400'],
    color: grey[900]
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const ColoredRadio = withStyles({
  root: {
    color: grey[600],
    '&$checked': {
      color: yellow['A400'],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const ColoredCheckbox = withStyles({
  root: {
    color: grey[600],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

// FORM CODE
const JokeForm = props => {
  const classes = useStyles();
  const [value, setValue] = useState('Any');
  const [state, setState] = React.useState(
    {
    nsfw: true,
    religious: true,
    political: true,
    }
  );
  const { nsfw, religious, political } = state;

  const handleChange = e => {
    setValue(e.target.value)
  };

  const handleChange2 = name => event => {
  setState({...state, [name]:event.target.checked})
  };

  const handleSubmit = e => {
    e.preventDefault();
    let str = '';
    for(let key in state){
      if(state[key]){
        str += `${key}`
      }
    }
    if(str.length > 0){
      str = `?blacklistFlags=${str}`
    }
    newJoke(value+str);
  }

  const newJoke = (searchQuery = value) => {
    props.getJokes(searchQuery);
  }

  useEffect(() => {
    newJoke()
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Pick Category</FormLabel>
          <RadioGroup aria-label="category" name="category" value={value} onChange={handleChange}>
            <FormControlLabel value="Any" control={<ColoredRadio />} label="Random" />
              <i style={{color: '#ffea00'}} class="fas fa-random"></i>
            <FormControlLabel value="Dark" control={<ColoredRadio />} label="Dark" />
              <i style={{color: '#ffea00'}} class="fas fa-skull"></i>
            <FormControlLabel value="Miscellaneous" control={<ColoredRadio />} label="Miscellaneous" /> 
              <i style={{color: '#ffea00'}} class="fas fa-asterisk"></i>
            <FormControlLabel value="Programming" control={<ColoredRadio />} label="Programming" />
              <i style={{color: '#ffea00'}} class="fas fa-laptop-code"></i>
          </RadioGroup>
          <br />
          <FormLabel component="legend">Blacklist Topics</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <ColoredCheckbox checked={nsfw} onChange={handleChange2('nsfw')} value="nsfw" />
              }
              label="NSFW"
            />
            <FormControlLabel
              control={
                <ColoredCheckbox checked={religious} onChange={handleChange2('religious')} value="religious" />
              }
              label="Religious"
            />
            <FormControlLabel
              control={
                <ColoredCheckbox checked={political} onChange={handleChange2('political')} value="political" />
              }
              label="Political"
            />
          </FormGroup>
          <Button type='submit' variant="outlined" className={classes.button}>
            New Joke
          </Button>
        </FormControl>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    joke: state.joke
  };
};

export default connect(
  mapStateToProps, 
  { getJokes }
)(JokeForm);