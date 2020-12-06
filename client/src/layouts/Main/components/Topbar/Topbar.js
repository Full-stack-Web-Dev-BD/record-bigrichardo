import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Avatar, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { logoutUser } from '../../../../actions/authActions'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  avatar:{
    cursor:'pointer'
  }
}));

const Topbar = props => {
  const { className, logoutUser, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };

  const onLogoutClick=(e)=> {
    e.preventDefault();
    logoutUser();
  }
  const logout=()=>{
    window.localStorage.removeItem('jwtToken')
    window.location.href="/"
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <div style={{width:'280px',backgroundColor:'#F7F7F7'}}>
          <RouterLink to="/dashboard" style={{color:'white'}}>
            <img src='/images/offervid.jpg' style={{width:'165px'}}/>
          </RouterLink>
        </div>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
        <ArrowForwardIcon style={{color:'black'}}/><span  style={{color:'black',fontWeight:500,marginRight:'60px'}}>Log Out</span>
          {/* <IconButton onClick={logout} color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <ExitToAppIcon />
            </Badge>
          </IconButton> */}
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser})(
  Topbar
);