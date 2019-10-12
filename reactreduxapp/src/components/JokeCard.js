import React from 'react';
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { yellow } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: yellow['A400'],
  },
  card: {
    border: '2px solid #ffea00',
    width: '50%'
  }
}));

const JokeCard = props => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  if (props.fetching){
    return <h2>MAKING JOKES...</h2>
  }
  return(
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {
              props.joke.category === 'Any' ? <i class="fas fa-random"></i> : 
              props.joke.category === 'Dark' ? <i class="fas fa-skull"></i> :
              props.joke.category === 'Miscellaneous' ? <i class="fas fa-asterisk"></i> :
              props.joke.category === 'Programming' ? <i class="fas fa-laptop-code"></i> : false
            }
          </Avatar>
        }
        title={`${props.joke.category}`}
      />
      {
        props.joke.type === 'single' ? 
        <p>{props.joke.joke}</p> : 
        <>
          <h3>{props.joke.setup}</h3>
          <div style={{color: '#ffea00'}}>See More</div>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            style={{color: '#ffea00'}}
          >
            <ExpandMoreIcon />
          </IconButton>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <p>{props.joke.delivery}</p> 
          </ Collapse>
        </>
      }
    </Card>
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