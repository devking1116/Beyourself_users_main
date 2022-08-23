import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {ReactComponent as DashboardIcon} from '../../../../assets/img/dashboard.svg';
import {ReactComponent as UsersIcon} from '../../../../assets/img/users.svg';
import {ReactComponent as CameraIcon} from '../../../../assets/img/camera.svg';
import {ReactComponent as ProductionIcon} from '../../../../assets/img/production.svg';
import {ReactComponent as SubscriptionIcon} from '../../../../assets/img/subscription.svg';
import {ReactComponent as MoneyIcon} from '../../../../assets/img/money.svg';
import {ReactComponent as LoginIcon} from '../../../../assets/img/robot.svg';

import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
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
    padding: theme.spacing(4)
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

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: <UsersIcon />
    },
    {
      title: 'Device',
      href: '/admin/device',
      icon: <CameraIcon />
    },
    {
      title: 'Product',
      href: '/admin/production',
      icon: <ProductionIcon />
    },
    {
      title: 'Subscription',
      href: '/admin/subscription',
      icon: <SubscriptionIcon />
    },
    {
      title: 'Currency',
      href: '/admin/currency',
      icon: <MoneyIcon />
    },
    {
      title: 'Logins',
      href: '/admin/logins',
      icon: <LoginIcon />
    },
  ];

  const pagesuser = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: <UsersIcon />
    },
    {
      title: 'Device',
      href: '/admin/device',
      icon: <CameraIcon />
    },
    {
      title: 'Product',
      href: '/admin/production',
      icon: <ProductionIcon />
    }
  ];

  const privilege = JSON.parse(localStorage.getItem('user')).privilege;

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
          pages={privilege === 0 ? pages : pagesuser}
        />

      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
