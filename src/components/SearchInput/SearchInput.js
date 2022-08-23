import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    flexBasis: 420,    
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
    padding: "0px 5px"
  },
  sortIconContainer: {    
    bottom: 0,
    right: 0,
    width: 15,
    height: 15,
    padding: 0
  },
  sortIcon: {
    width: '100%',
    height: '100%',
  },
  searchHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10
  },
  serachTitle: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
    fontSize: 12,
    color: '#d8d8d8'
  },
  searchInput: {
    display: 'flex',
    backgroundColor: "#F2F5F8"
  }
}));

const SearchInput = props => {
  const { className, onChange, style, ...rest } = props;

  const classes = useStyles();

  return (
    <Paper elevation={0}
    {...rest}
    className={clsx(classes.root, className)}
    style={style}
    >
      <div className={classes.searchHeader}>
        <div className={classes.serachTitle}>
          SEARCH
        </div>
        <IconButton aria-label="sort" className={classes.sortIconContainer}>
          <img
            alt="Under development"
            className={classes.sortIcon}
            src="/images/icons/sort.png"
          />
        </IconButton>        
      </div>
      <Paper elevation={0}
        {...rest}
        className={clsx(classes.searchInput, className)}
        style={style}
      >
        <Input
          {...rest}
          className={classes.input}
          disableUnderline
          onChange={onChange}
        />
        <SearchIcon className={classes.icon} />
      </Paper>

    </Paper>
    
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default SearchInput;
