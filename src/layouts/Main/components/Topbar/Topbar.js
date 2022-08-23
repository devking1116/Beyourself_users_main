import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles,withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Menu, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import DraftsIcon from '@material-ui/icons/Drafts';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  appbar: {
    backgroundImage: 'linear-gradient(rgba(242, 3, 31, 1), rgba(244, 92, 67, 1))',
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  setting_icon: {
    marginLeft: '10px'
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#f2272d',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Topbar = props => {
  const { className, onSidebarOpen, onClickLogout, onClickEditAdmin, onClickBack, ...rest } = props;

  const classes = useStyles();
  const [notifications] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const privilege = JSON.parse(localStorage.getItem('user')).privilege;

  const onClickAdmin = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickEditAdmin = () => {
    setAnchorEl(null);
    props.onClickEditAdmin();
  }

  const handleClickLogout = () => {
    setAnchorEl(null);
    props.onClickLogout();
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.appbar, className)}
    >    

      <Toolbar>
        <RouterLink to="/">

        </RouterLink>
        <ArrowBackIosIcon onClick={() => props.onClickBack()} />

        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <SettingsIcon onClick={onClickAdmin}/>
        </Hidden>
        <Hidden lgUp>
            <MenuIcon  onClick={() => props.onSidebarOpen()} />
            <SettingsIcon className={classes.setting_icon} onClick={onClickAdmin}/>
        </Hidden>
      </Toolbar>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClickEditAdmin}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit infomation" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClickLogout}>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </StyledMenuItem>
      </StyledMenu>

    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
