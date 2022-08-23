import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {

    },
    btn_close: {
        background: '#04ff71',
        textTransform: 'none',
        color: 'white',
        '&:hover': {
            background: '#04ff71',
        }
    },
    btn_ok: {
        background: 'linear-gradient(rgba(242, 3, 31, 1), rgba(244, 92, 67, 1))',
        textTransform: 'none',
        color: 'white',
    },
    btn_area: {
        justifyContent: 'center',
        marginLeft: '30px',
        marginRight: '30px'
    }
}));

const CustomAlertDialog = props => {
    const { open, onClickClose, onClickOk, message, ...rest } = props;
    const classes = useStyles();

    return (
        <div>
        <Dialog
            open={open}
            onClose={() => props.onClickClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {message}
            </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.btn_area} >
            <Button className={classes.btn_close} onClick={() => props.onClickClose() }>
                Close
            </Button>
            <Button className={classes.btn_ok} onClick={() => props.onClickOk() }>
                OK
            </Button>
            </DialogActions>
        </Dialog>
        </div>
  );
};

export default CustomAlertDialog;
