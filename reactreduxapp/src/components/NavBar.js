import React from 'react';
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// TEMPORARY DRAWER
  // https://material-ui.com/components/drawers/

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'rgb(46,49,51)'
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
  },
  list: {
    width: 250
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      className={classes.root}
    >
      <List>
        <ListItem>
          <ListItemIcon style={{fontSize:'180%', color:'#ffea00'}}><i class="fab fa-github"/></ListItemIcon>
          <ListItemText>
            <a style={{fontSize:'110%', textDecoration:'none', color:'white'}} href='https://github.com/JameaKidrick/'>My GitHub</a>
          </ListItemText>
        </ListItem>
        
        <ListItem>
          <ListItemIcon style={{fontSize:'180%', color:'#ffea00'}}><i class="fas fa-file-code"></i></ListItemIcon>
          <ListItemText>
            <a style={{fontSize:'110%', textDecoration:'none', color:'white'}} href='https://github.com/JameaKidrick/React-Redux-App/tree/jamea-kidrick'>Project GitHub</a>
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon style={{fontSize:'180%', color:'#ffea00'}}><i class="fab fa-linkedin"/></ListItemIcon>
          <ListItemText>
            <a style={{fontSize:'110%', textDecoration:'none', color:'white'}} href='https://www.linkedin.com/in/jameakidrick/'>Linkedin</a>
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon style={{fontSize:'180%', color:'#ffea00'}}><i class="fas fa-portrait"/></ListItemIcon>
          <ListItemText>
            <a style={{fontSize:'110%', textDecoration:'none', color:'white'}} href='https://jameakidrick.netlify.com'>Portfolio</a>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

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
          <IconButton edge="start" className={classes.menuButton} aria-label="menu" >
            <MenuIcon onClick={toggleDrawer('right', true)} />
            <Drawer  anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
              {sideList('right')}
            </Drawer>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar;