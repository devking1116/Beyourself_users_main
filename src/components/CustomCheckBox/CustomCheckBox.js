import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    rect: {
        width: 17,
        height: 17,
        borderColor: '#707070',
        borderWidth: 1,
        backgroundColor: 'white',
        borderStyle: 'solid',
    },
    div_check: {
        position: 'absolute',
    }
}));

const CustomCheckBox = props => {
    const { checked } = props;
    const classes = useStyles();

    return (
        <div className={classes.rect}>
            <div className={classes.div_check}>
                {checked ? <img src='/images/checkmark.png' /> : null}
            </div>
        </div>
  );
};

export default CustomCheckBox;
