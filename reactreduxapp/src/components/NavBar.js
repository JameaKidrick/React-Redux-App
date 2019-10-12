import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color:'#ffea00',
    border: '2px solid #ffea00',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    color:'#ffea00'
  },
  logo: {
    fontSize: '3.5rem',
    color:'#ffea00',
  }
}));

const NavBar = () => {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{backgroundColor: '#2e3133'}}>
          <IconButton edge="start" className={classes.logo} aria-label="menu">
            <i class="far fa-grin-squint-tears"></i>
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Jokes on You
          </Typography>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar;