import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

// TEMPORARY DRAWER
  // https://material-ui.com/components/drawers/

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
  },
  list: {
    width: 250,
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
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
            <MenuIcon onClick={toggleDrawer('left', true)} />
            <Drawer anchor="right" open={state.right} onClose=    {toggleDrawer('right', false)}>
              {sideList('right')}
            </Drawer>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar;