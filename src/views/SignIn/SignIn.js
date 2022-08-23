import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {
  Grid,
  Slide,
  Dialog,
  CircularProgress,
  ListItemSecondaryAction,
} from '@material-ui/core';
import APIService from 'services/api.services';
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from '../../utils/utils';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
      minimum: 6,
    }
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    position: 'relative',
    height: '100%',
  },
  grid: {
    position: 'absolute',
    minHeight: '100vh',
  },
  row_content: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
  },
  img_content: {
    height: '100%',
    position: 'relative',
    marginRight: 'auto',
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '0%',
    },
    width: '40%',
    backgroundColor: '#F0B7A4',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  img_back: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    width: '60%',
    paddingBottom: 30,
  },
  div_logo: {
    width: '100%',
    marginTop: '15vh',
    display: 'flex',
    justifyContent: 'center',
    '@media (max-width: 767px) and (max-height: 811px)': {
      marginTop: '10vh',
    },
    '@media (max-width: 374px)': {
      marginTop: '5vh',
    }
  },
  img_logo: {
    width: '20%',
    height: '30%',
    '@media (max-width: 767px)': {
      width: 200,
      height: 250,
    },
    '@media (max-width: 413px)': {
      width: 150,
      height: 200,
    },
    '@media (max-width: 374px)': {
      width: 100,
      height: 130,
    }
  },
  text_area: {
    marginTop: 42,
    '@media (max-width: 413px)': {
      marginTop: 22,
    }
  },
  text_beyourself: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: 44,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: '110%',
    paddingBottom: 15,
    '@media (max-width: 767px)': {
      fontSize: 25,
      paddingBottom: 5,
    }
  },
  text_discription: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300,
    fontSize: 24,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    '@media (max-width: 767px)': {
      fontSize: 16,
    }
  },
  div_button_area: {
    width: '100%',
    marginTop: 39
  },
  main_signup: {
    width: 'max-content',
    height: 'auto',
    borderRadius: 28,
    backgroundColor: '#F0B7A4',
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  main_signin: {
    width: 'max-content',
    height: 'auto',
    borderRadius: 28,
    borderColor: '#F0B7A4',
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#F0B7A4',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
  },
  bottom_description: {
    color: 'rgba(0, 0, 0, 0.45)',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 25,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    '@media (max-width: 767px)': {
      fontSize: 13,
    }
  },
  dialog_back: {
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(6px)',
    },
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 'none',
      maxHeight: 'none',
      margin: 0,
    },
    '& .MuiPaper-elevation24': {
      boxShadow: '5px 10px 18px #B6ACFB'
    },
    '& .MuiDialog-root': {
      overflow: 'auto',
      height: 'auto',
      margin: 0,
    },
    overflow: 'auto',
    height: 'auto',
    margin: 0,
  },
  dialog: {
    width: '70vw',
    [theme.breakpoints.down('sm')]: {
      width: '90vw',
    },
    maxWidth: 600,
    height: 'auto',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingBottom: 50,
    //overflow: 'hidden',
  },
  dialog_forgot: {
    width: '70vw',
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
    maxWidth: 600,
    height: 'auto',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingBottom: 30
  },
  close_btn: {
    float: 'right',
    marginTop: 15,
    marginRight: 10,
    cursor: 'pointer',
  },
  dialog_context_area: {
    width: '100%',
    marginTop: 61,
    display: 'flex',
    justifyContent: 'center',
  },
  dialog_context: {
    width: '85%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    }
  },
  signin_title: {
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: 25,
  },
  div_input_area: {
    marginTop: 20,
  },
  div_input_part: {
    width: '100%',
    marginTop: 20,
  },
  div_input_part_lastname: {
    width: '100%',
    marginTop: 20,
    marginLeft: 20,
  },
  text_description: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300,
    fontSize: 15,
  },
  input: {
    width: '100%',
    height: 30,
    borderRadius: 21,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
    '&:focus': {
      outline: 'none'
    }
  },
  forgot_password: {
    float: 'right',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300,
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.51)',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'rgba(0, 0, 0, 0.51)',
    cursor: 'pointer'
  },
  dialog_sigin_btn_area: {
    width: '100%',
    marginTop: 66,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 70
  },
  dialog_signup_btn_area: {
    width: '100%',
    marginTop: 66,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40
  },
  dialog_forgot_btn_area: {
    width: '100%',
    marginTop: 66,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 50
  },
  dialog_btn: {
    width: 'auto',
    height: 'auto',
    marginBottom: 30,
    borderRadius: 25,
    color: 'black',
    backgroundColor: '#F0B7A4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  auth_text: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: 20,
    textAlign: 'center',
  },
  div_social: {
    marginTop: 10,
    justifyContent: 'center'
  },
  btn_facebook: {
    width: '90%',
    maxWidth: 340,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#406093',
    display: 'flex',
    cursor: 'pointer',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  icon_facebook: {
    width: 40,
    height: 40,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: '#304878',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_facebook: {
    width: 'calc(100% - 60px)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300,
    fontSize: 14,
    textAlign: 'center',
  },
  btn_google: {
    width: '90%',
    maxWidth: 340,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#707070',
    display: 'flex',
    marginTop: 7,
    cursor: 'pointer',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  icon_google: {
    width: 40,
    height: 40,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_google: {
    width: 'calc(100% - 60px)',
    color: '#6E6C6C',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300,
    fontSize: 14,
    textAlign: 'center',
  },
  div_name: {
    width: '100%',
    display: 'flex'
  },
  forgot_description: {
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.83)',
    marginTop: 50,
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
  google: {
    display: 'none !important'
  }
}));

const SignIn = props => {
  const { history } = props;
  const classes = useStyles();

  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [signInValue, setSignInValue] = React.useState({
    email: '',
    password: '',
  })
  const [signUpValue, setSignUpValue] = React.useState({
    email: '',
    password: '',
    lastname: '',
    firstname: '',
  })
  const [forgotPassword, setForgotPassword] = React.useState('');
  const [openForgotPassword, setOpenForgotPassword] = React.useState(false);
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [toast, setToast] = React.useState({
    show: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user.user_type && user.user_type === 'PRO') {
        history.push('/pro-profile');
      } else {
        history.push('/subscription');
      }
    }
  }, []);

  const handleCloseDialog = () => {
    setOpenSignIn(false);
    setOpenSignUp(false);
    setTimeout(function () {
      setOpenForgotPassword(false);
    }, 1000);
  }

  const handleChangeTextSignIn = (event, type) => {
    if (type === 'email') {
      setSignInValue({ ...signInValue, email: event.target.value });
    } else if (type === 'password') {
      setSignInValue({ ...signInValue, password: event.target.value });
    }
  }

  const handleChangeTextSignUp = (event, type) => {
    if (type === 'email') {
      setSignUpValue({ ...signUpValue, email: event.target.value });
    } else if (type === 'password') {
      setSignUpValue({ ...signUpValue, password: event.target.value });
    } else if (type === 'lastname') {
      setSignUpValue({ ...signUpValue, lastname: event.target.value });
    } else if (type === 'firstname') {
      setSignUpValue({ ...signUpValue, firstname: event.target.value });
    }
  }

  const handleClickSignIn = () => {
    if (!signInValue.email) {
      setToast({ message: 'Veuillez saisir l\'email.', type: 'info', show: true })
      return;
    }
    if (!signInValue.password) {
      setToast({ message: 'Veuillez saisir le mot de passe.', type: 'info', show: true })
      return;
    }

    setVisibleIndicator(true);
    APIService.login(signInValue)
      .then(
        response => {
          setVisibleIndicator(false);
          console.log(response.data);
          if (response.data.code !== 200) {
            setToast({ message: response.data.message, type: 'error', show: true })
          } else {
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
            if (response.data.data.user.user_type && response.data.data.user.user_type === 'PRO') {
              history.push('/pro-profile');
            } else {
              history.push('/subscription');
            }
          }
        },
        error => {
          setVisibleIndicator(false);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setToast({ message: resMessage, type: 'error', show: true });
        }
      );
  }

  const handleClickSignup = () => {
    if (!signUpValue.lastname) {
      setToast({ message: 'Veuillez saisir le nom', type: 'info', show: true })
      return;
    }
    if (!signUpValue.firstname) {
      setToast({ message: 'Veuillez saisir le prenom', type: 'info', show: true })
      return;
    }
    if (!signUpValue.email) {
      setToast({ message: 'Veuillez saisir l\'email.', type: 'info', show: true })
      return;
    }
    if (!signUpValue.password) {
      setToast({ message: 'Veuillez saisir le mot de passe', type: 'info', show: true })
      return;
    }

    setVisibleIndicator(true);
    APIService.register(signUpValue)
      .then(
        response => {
          setVisibleIndicator(false);
          console.log(response.data);
          if (response.data.code !== 200) {
            setToast({ message: response.data.message, type: 'error', show: true });
          } else {
            setToast({ message: 'Vous etes inscrit. Veuillez confirmer votre email afin de vous connecter.', type: 'success', show: true })
            setOpenSignUp(false);
            setTimeout(
              function () {
                setOpenSignIn(true);
              }, 200)
          }
        },
        error => {
          setVisibleIndicator(false);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setToast({ message: resMessage, type: 'error', show: true });
        }
      );
  }

  const handleClickForgotPassword = () => {
    if (!forgotPassword) {
      setToast({ message: 'Veuillez saisir l\'email.', type: 'info', show: true })
      return;
    }

    setVisibleIndicator(true);
    APIService.forgotpassword(forgotPassword)
      .then(
        response => {
          setVisibleIndicator(false);
          console.log(response.data);
          if (response.data.code !== 200) {
            setToast({ message: response.data.message, type: 'error', show: true });
          } else {
            setToast({ message: response.data.message, type: 'success', show: true })
            setOpenSignUp(false);
            setTimeout(
              function () {
                setOpenSignIn(true);
              }, 200)
          }
        },
        error => {
          setVisibleIndicator(false);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setToast({ message: resMessage, type: 'error', show: true });
        }
      );
  }

  const responseGoogleSuccess = (result) => {

    setVisibleIndicator(true);
    APIService.googleAuth(result.profileObj)
      .then(
        response => {
          setVisibleIndicator(false);
          console.log(response.data);
          if (response.data.code !== 200) {
            setToast({ message: response.data.message, type: 'error', show: true })
          } else {
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
            localStorage.setItem("user", JSON.stringify(result.profileObj));
            history.push('/subscription');
          }
        },
        error => {
          setVisibleIndicator(false);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setToast({ message: resMessage, type: 'error', show: true });
        }
      );
  }

  const responseFacebook = (result) => {
    console.log(result);
    if (!result.userID && !result.email) {
      return;
    }

    const user_info = {
      email: result.email ? result.email : result.userID,
      firstname: result.name.split(' ')[0],
      lastname: result.name.split(' ')[1] ? result.name.split(' ')[1] : '',
    }

    APIService.facebookAuth(user_info)
      .then(
        response => {
          setVisibleIndicator(false);
          console.log(response.data);
          if (response.data.code !== 200) {
            setToast({ message: response.data.message, type: 'error', show: true })
          } else {
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
            localStorage.setItem("user", JSON.stringify(user_info));
            history.push('/subscription')
          }
        },
        error => {
          setVisibleIndicator(false);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setToast({ message: resMessage, type: 'error', show: true });
        }
      );

    //     name: "Mai Tran"
    // signedRequest: "5AokzY2ADe5qjFcJv6TNv9cvtKZJcK7pMHZbAsxKMqY.eyJ1c2VyX2lkIjoiNDA2NDk4MTEzNjg4NTM0OCIsImNvZGUiOiJBUUNraE15bEZSYmloT1JsSE9JaWJVQlhZS0V1THpxNWtyUkdjZ2hXMEEtc05xeVdWZ0E0SHpjYnZZVnF2TkM1Nl80TFFwdlIxaXJEN1YtZkRhZ3I5aXdxRnExQnNZdnpWM0dyRll0NEZSSTJyR09fUXoxSzVBUzhjZ290ejJNRWJOLV9uMFd2cG51T3dRa0FoM0NQa1pJVXhaYnpTOV9ZS0huLWVDX3c3SW1fZzZMVzM4cVJmZmZrcGEyQUF3Z1ZCYWU4Z2dXcGYxNFNzOFVqQmV6ZkdGRHgyb3ltRC1qUHRjVDVzLTlVTDcyYllVbmFWYlVycGJaNWRMOFBZLWVmRkh6UXQ4T1QwWkRwSXo5YTRUdGZjVnBxdDAxaDc4WW1mdDY0UFpKZGJEeEk1UHpGbF82dkV1UURLLUotOXcxNzJxMklZUkZuMkpQLVluMEpxQktBOVZmOCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjE1NDExNzcyfQ"
    // userID: "4064981136885348"

  }

  const responseGoogleFail = (result, type) => {
    console.log(type)
    console.log(result);
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
      <Dialog
        scroll='body'
        className={classes.dialog_back}
        open={openSignIn}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        //disableScrollLock={true}
        aria-describedby="alert-dialog-slide-description"
      >
        {openForgotPassword ?
          <div className={classes.dialog_forgot}>
            <div className={classes.close_btn} onClick={handleCloseDialog}>
              <img src='/images/ic_close.png'></img>
            </div>
            <div className={classes.dialog_context_area}>
              <div className={classes.dialog_context}>
                <div className={classes.signin_title}>Mot de passe oublié</div>
                <div className={classes.forgot_description}>
                  Pas de panique !<br />Saisissez votre email afin de réinitialiser votre mot de passe.
                </div>
                <div className={classes.div_input_area}>
                  <div className={classes.div_input_part}>
                    <div className={classes.text_description} >Email</div>
                    <input className={classes.input} value={forgotPassword} onChange={(event) => { setForgotPassword(event.target.value) }} />
                  </div>
                </div>
                <div className={classes.dialog_forgot_btn_area}>
                  <div className={classes.dialog_btn} onClick={handleClickForgotPassword}>Réinitialiser</div>
                </div>
              </div>
            </div>
          </div> :
          <div className={classes.dialog}>
            <div className={classes.close_btn} onClick={handleCloseDialog}>
              <img src='/images/ic_close.png'></img>
            </div>
            <div className={classes.dialog_context_area}>
              <div className={classes.dialog_context}>
                <div className={classes.signin_title}>Connexion</div>
                <div className={classes.div_input_area}>
                  <div className={classes.div_input_part}>
                    <div className={classes.text_description} >Email</div>
                    <input className={classes.input} value={signInValue.email} onChange={(event) => handleChangeTextSignIn(event, 'email')} />
                  </div>
                  <div className={classes.div_input_part}>
                    <div className={classes.text_description}>Mot de passe</div>
                    <input type="password" className={classes.input} value={signInValue.password} onChange={(event) => handleChangeTextSignIn(event, 'password')} />
                  </div>
                </div>
                <div className={classes.forgot_password} onClick={() => { setOpenForgotPassword(true) }}>Mot de passe oublié</div>
                <div className={classes.dialog_sigin_btn_area}>
                  <div className={classes.dialog_btn} onClick={handleClickSignIn}>Se connecter</div>
                </div>
                <div className={classes.auth_text}>Ou...</div>
                <div className={classes.div_social}>
                  <FacebookLogin
                    appId={FACEBOOK_APP_ID}
                    // autoLoad
                    callback={responseFacebook}
                    fields="name,email,id"
                    render={renderProps => (
                      <div className={classes.btn_facebook} onClick={renderProps.onClick}>
                        <div className={classes.icon_facebook}>
                          <img src='/images/facebook.png'></img>
                        </div>
                        <div className={classes.text_facebook}>Se connecter avec Facebook</div>
                      </div>
                    )}
                  />

                  <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={responseGoogleSuccess}
                    onFailure={result => responseGoogleFail(result, 1)}
                    render={renderProps => (
                      <div className={classes.btn_google} onClick={renderProps.onClick}>
                        <div className={classes.icon_google}>
                          <img src='/images/ic_google.png'></img>
                        </div>
                        <div className={classes.text_google}>Se connecter avec Google</div>
                      </div>
                    )}
                  />
                </div>

              </div>
            </div>
          </div>
        }
      </Dialog>
      <Dialog
        scroll='body'
        className={classes.dialog_back}
        open={openSignUp}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        //disableScrollLock={true}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.dialog}>
          <div className={classes.close_btn} onClick={handleCloseDialog}>
            <img src='/images/ic_close.png'></img>
          </div>
          <div className={classes.dialog_context_area}>
            <div className={classes.dialog_context}>
              <div className={classes.signin_title}>Inscription</div>
              <div className={classes.div_input_area}>
                <div className={classes.div_name}>
                  <div className={classes.div_input_part}>
                    <div className={classes.text_description} >Nom</div>
                    <input className={classes.input} value={signUpValue.lastname} onChange={(event) => handleChangeTextSignUp(event, 'lastname')} />
                  </div>
                  <div className={classes.div_input_part_lastname}>
                    <div className={classes.text_description}>Prénom</div>
                    <input className={classes.input} value={signUpValue.firstname} onChange={(event) => handleChangeTextSignUp(event, 'firstname')} />
                  </div>
                </div>
                <div className={classes.div_input_part}>
                  <div className={classes.text_description} >Email</div>
                  <input className={classes.input} value={signUpValue.email} onChange={(event) => handleChangeTextSignUp(event, 'email')} />
                </div>
                <div className={classes.div_input_part}>
                  <div className={classes.text_description}>Mot de passe</div>
                  <input type="password" className={classes.input} value={signUpValue.password} onChange={(event) => handleChangeTextSignUp(event, 'password')} />
                </div>
              </div>
              <div className={classes.dialog_signup_btn_area}>
                <div className={classes.dialog_btn} onClick={handleClickSignup}>Je m'inscris</div>
              </div>
              <div className={classes.auth_text}>Ou...</div>
              <div className={classes.div_social}>
                <FacebookLogin
                  appId={FACEBOOK_APP_ID}
                  //autoLoad
                  callback={responseFacebook}
                  fields="name,email,id"
                  render={renderProps => (
                    <div className={classes.btn_facebook} onClick={renderProps.onClick}>
                      <div className={classes.icon_facebook}>
                        <img src='/images/facebook.png'></img>
                      </div>
                      <div className={classes.text_facebook}>S'inscrire avec Facebook</div>
                    </div>
                  )}
                />
                <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="SignUp"
                  onSuccess={responseGoogleSuccess}
                  onFailure={result => responseGoogleFail(result, 2)}
                  render={renderProps => (
                    <div className={classes.btn_google} onClick={renderProps.onClick}>
                      <div className={classes.icon_google}>
                        <img src='/images/ic_google.png'></img>
                      </div>
                      <div className={classes.text_google}>S'inscrire avec Google</div>
                    </div>
                  )}
                />
              </div>

            </div>
          </div>
        </div>
      </Dialog>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.row_content}
          item
        >
          <Grid className={classes.img_content}>
            <img src="/images/img_back.png" className={classes.img_back} />
          </Grid>
          <div className={classes.content}>
            <div className={classes.div_logo}>
              <img src='/images/logo.png' className={classes.img_logo}></img>
            </div>
            <div className={classes.text_area}>
              <div className={classes.text_beyourself}>Soyez vous-même</div>
              <div className={classes.text_discription}>les autres sont déjà pris !</div>
            </div>
            <div className={classes.div_button_area}>
              <div className={classes.main_signup} onClick={() => { setOpenSignUp(true) }}>Je m'inscris !</div>
              <div className={classes.main_signin} onClick={() => { setOpenSignIn(true) }}>J'ai déjà un compte</div>
            </div>
            <div className={classes.bottom_description}>En continuant, vous acceptez les Conditions Générales d'Utilisation et la Politique de Confidentialité.</div>

          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
