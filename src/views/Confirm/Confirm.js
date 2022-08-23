import React from 'react';
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';
import APIService from 'services/api.services';
import { makeStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { CircularProgress } from '@material-ui/core';
import { withRouter, useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    div_indicator: {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'fixed',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    indicator: {
        color: 'white',
    },
    content_area: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: 460,
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '5px 10px 18px #B6ACFB'
    },
    text_main_title: {
        marginTop: 20,
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 700,
        fontSize: 31,
        [theme.breakpoints.down('xs')]: {
            fontSize: 25,
        }
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Confirm = props => {
    const { history } = props;
    const classes = useStyles();
    const { token } = useParams();

    const [visibleIndicator, setVisibleIndicator] = React.useState(false);
    const [text, setText] = React.useState('')
    const [toast, setToast] = React.useState({
        show: false,
        message: '',
        type: 'success',
    });

    React.useEffect(() => {
        getAccountConfirm();
    }, [])

    const getAccountConfirm = () => {
        setVisibleIndicator(true);
        APIService.getAccountConfirm(token)
            .then(
                response => {
                    setVisibleIndicator(false);
                    setText(response.data.message);

                    setTimeout(() => {
                        history.push('/auth')
                    }, 2000);
                },
                error => {
                    setVisibleIndicator(false);
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setText(resMessage);
                }
            );
    }

    return (
        <div className={classes.root}>
            {
                visibleIndicator ? <div className={classes.div_indicator}> <CircularProgress className={classes.indicator} /> </div> : null
            }
            <Snackbar open={Boolean(toast.show)} autoHideDuration={6000} onClose={() => setToast({ ...toast, show: false })}>
                <Alert onClose={() => setToast({ ...toast, show: false })} severity={toast.type}>
                    {toast.message}
                </Alert>
            </Snackbar>

            <div className={classes.content_area}>
                <div className={classes.content}>
                    <div className={classes.text_main_title}>{text}</div>
                </div>
            </div>
        </div>
    )
};

Confirm.propTypes = {
    history: PropTypes.object
};

export default withRouter(Confirm);