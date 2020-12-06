import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Drawer, Typography } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FeedbackIcon from '@material-ui/icons/Feedback';
import UpdateIcon from '@material-ui/icons/Update';
import { SidebarNav } from './components';
import { connect } from 'react-redux';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import HomeIcon from '@material-ui/icons/Home';



import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import LibraryAddCheckSharpIcon from '@material-ui/icons/LibraryAddCheckSharp';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


const useStyles = makeStyles(theme => ({
  drawer: {
    width: 280,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;
  const {user}=props.auth
  const classes = useStyles();

  
  const UserPages = [
    {
      title: 'Record',
      href: '/create',
      icon: <VideocamOutlinedIcon />
    },
    {
      title: 'Library ',
      href: '/library',
      icon: <LibraryAddCheckSharpIcon />
    },
    {
      title: 'Upgrade',
      href: '/upgrade',
      icon: <ArrowUpwardOutlinedIcon style={{color:'#E4A157',border:'2px  solid #E4A157' ,padding:'2px ',borderRadius:'100%'}} />
    },
    {
      title: 'Help',
      href: '/help',
      icon: <HelpOutlineIcon />
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
          <SidebarNav
            className={classes.nav}
            pages={UserPages}
          />
      </div>
      
      <Box
        p={2}
        m={2}
        style={{backgroundColor:'#f7f7f7',textAlign:'center'}}
      >
        <p>powered by <span className="sellc">sellcrowd</span></p>
        <p style={{fontSize:'14px'}}>2020 © OfferVid. All Right Reserved</p>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
        </Box>
      </Box>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};
const mapStateToProps=state=>({
  auth:state.auth
})
export default connect(mapStateToProps,null)(Sidebar);
