import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import { Topbar } from './components';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 55,
    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

const Minimal = props => {
  const { children, history } = props;
  const [ adminName, setAdminName ] = useState('');

  const classes = useStyles();

  function handleClickLogout() {
  }

  useEffect(() => {
  
  },[]);

  return (
    <div className={classes.root}>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default withRouter(Minimal);
