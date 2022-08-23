import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Grid, Menu, ListItemIcon, ListItemText, MenuItem} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import EditIcon from '@material-ui/icons/Edit';
import DraftsIcon from '@material-ui/icons/Drafts';


const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  },
  appbar: {
    backgroundImage: 'linear-gradient(rgba(242, 3, 31, 1), rgba(244, 92, 67, 1))',
  },
  title: {
    color: 'white',
    fontSize: '28px',
    marginTop: '-7px',
    marginLeft: '30px',
    fontWeight: 500,
  },
  admin_div: {    
    width: '100%',
    position: 'fixed',
    paddingRight: '50px',
    justifyContent: 'flex-end',
  },
  admin: {
    color: 'white',
    fontSize: '18px',
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
  const { className, onClickLogout, onClickEditAdmin, adminName, ...rest } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const onClickAdmin = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      {...rest}
      className={classes.appbar}
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <Typography className={classes.title} >IP Camera</Typography>
        </RouterLink>
        <Grid container className={classes.admin_div}>
          <Typography className={classes.admin  } onClick={onClickAdmin} >{adminName} </Typography>
          <ArrowDropDownIcon onClick={onClickAdmin} />
        </Grid>
      </Toolbar>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => onClickEditAdmin()}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit infomation" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => onClickLogout()}>
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
  className: PropTypes.string
};

export default Topbar;
