import React from 'react';
import { connect } from 'react-redux'

import SyncLoader from 'react-spinners/SyncLoader'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { yellow} from '@material-ui/core/colors';

/*************************** STYLING *****************************/
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
    color:'rgb(24,26,27)'
  },
  card: {
    border: '2px solid #ffea00',
    backgroundColor: 'rgb(24,26,27)',
    fontFamily:'Roboto, sans serif',
    color: 'white',
    marginTop:'25%',
    padding: '5%'
  },
}));

const styleParent = {
  display: 'flex',
  alignItems: 'center'
}

const styleExpand = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '24%',
  marginLeft:'70%'
}

const styleChild1 = {
  color: '#ffea00', 
  fontFamily:'Roboto, sans serif',
  width: 'auto'
}

const styleChild2 = {
  color: '#ffea00',
  width: '2%'
}

/*************************** FUNCTIONALITY *****************************/

const JokeCard = props => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  if (props.fetching){
    return(
      <SyncLoader
        color={'#ffea00'}
      />)
  }
  return(
    <Card className={classes.card}>
      <section style={styleParent}>
        <CardHeader style={{width: '10%'}}
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
        />
        <Typography variant='h5' style={{width: '50%'}}>{props.joke.category}</Typography>
      </section>
      {
        props.joke.type === 'single' ? 
        <p>{props.joke.joke}</p> : 
        <>
          <p>{props.joke.setup}</p>
          <section style={styleExpand}>
            <div style={styleChild1}>{!expanded ? 'See More':'Collapse'}</div>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              style={styleChild2}
            >
              <ExpandMoreIcon />
            </IconButton>
          </section>
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