import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles, withStyles } from "@material-ui/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  CircularProgress,
  Slide,
  Dialog,
  Typography,
  MenuItem,
  Menu,
  ListItemText,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { SportsRugbySharp } from "@material-ui/icons";
import APIService from "services/api.services";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    position: "relative",
    height: "100%",
  },
  header: {
    width: "100%",
    height: "20%",
    borderBottomLeftRadius: 42,
    backgroundColor: "#E3E3E3",
    display: "flex",
    alignItems: "center",
  },
  header_title: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 30,
    marginLeft: 180,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 50,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
      marginLeft: 25,
    },
  },
  header_icon: {
    minWidth: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "white",
    boxShadow: "3px 5px 10px #b6acfb",
    marginLeft: "auto",
    marginRight: 70,
    [theme.breakpoints.down("xs")]: {
      marginRight: 30,
    },
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup_pointer: {
    position: "absolute",
    right: 85,
    [theme.breakpoints.down("xs")]: {
      right: 45,
    },
    marginTop: 92,
  },
  menu_item: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 15,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 3,
    marginBottom: 3,
    outline: "none",
    cursor: "pointer",
  },
  content_area: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  content: {
    width: 460,
    padding: 30,
  },
  div_name: {
    width: "100%",
    display: "flex",
  },
  div_input_part: {
    width: "100%",
    marginTop: 20,
  },
  div_input_part_lastname: {
    width: "100%",
    marginTop: 20,
    marginLeft: 20,
  },
  text_description: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 15,
  },
  input: {
    width: "100%",
    height: 42,
    borderRadius: 21,
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
    "&:focus": {
      outline: "none",
    },
  },
  change_password: {
    float: "right",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 15,
    color: "black",
    cursor: "pointer",
    marginTop: 25,
  },
  btn_area: {
    width: "100%",
    marginTop: 66,
    display: "flex",
    justifyContent: "center",
    marginTop: 180,
  },
  btn: {
    width: 200,
    height: 50,
    borderRadius: 25,
    color: "black",
    backgroundColor: "#F0B7A4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
  },
  dialog_back: {
    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "none",
    },
    "& .MuiPaper-elevation24": {
      boxShadow: "5px 10px 15px rgba(182, 172, 251, 0.6)",
    },
  },
  dialog: {
    width: "70vw",
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      paddingLeft: 0,
      paddingRight: 0,
    },
    maxWidth: 800,
    height: "auto",
    borderRadius: 10,
    backgroundColor: "white",
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  close_btn: {
    float: "right",
    marginTop: 15,
    marginRight: 10,
    cursor: "pointer",
  },
  dialog_context_area: {
    width: "100%",
    marginTop: 70,
    display: "flex",
    justifyContent: "center",
  },
  dialog_context: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  dialog_title: {
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 25,
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
    },
  },
  dialog_btn_area: {
    width: "100%",
    marginTop: 66,
    display: "flex",
    justifyContent: "center",
    marginTop: 60,
  },
  div_input_area: {
    marginTop: 55,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  div_indicator: {
    width: "100%",
    height: "100%",
    display: "flex",
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  indicator: {
    color: "white",
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledMenu = withStyles({
  paper: {
    marginTop: 20,
    boxShadow: "5px 8px 10px rgba(182, 172, 251, 0.4)",
    "&.MuiPaper-rounded": {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    "& .MuiList-padding": {
      paddingTop: 20,
      paddingBottom: 20,
    },
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {},
}))(MenuItem);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = (props) => {
  const { history } = props;
  const classes = useStyles();

  const [openPopupMenu, setOpenPopupMenu] = React.useState(false);
  const [profileValue, setProfileValue] = React.useState({
    email: "",
    lastname: "",
    firstname: "",
    referral_code: "",
  });
  const [passwordValue, setPasswordValue] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [openChangePassword, setOpenChangePassword] = React.useState(false);
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [toast, setToast] = React.useState({
    show: false,
    message: "",
    type: "success",
  });
  const [proUser, setProUser] = React.useState(false);

  let token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    if (!token || !user || !user.email) {
      history.push("/auth");
    }
    if (user.user_type && user.user_type === "PRO") {
      setProUser(true);
    }
    getProfile();
  }, []);

  const getProfile = () => {
    setVisibleIndicator(true);
    APIService.getProfile(user.email).then(
      (response) => {
        setVisibleIndicator(false);
        console.log(response.data);
        if (response.data.code !== 200) {
          setToast({
            message: response.data.message,
            type: "error",
            show: true,
          });
        } else {
          const info = {
            email: response.data.data.email,
            lastname: response.data.data.last_name,
            firstname: response.data.data.first_name,
            referral_code: response.data.data.referral_code,
          };
          console.log(info);
          setProfileValue(info);
        }
      },
      (error) => {
        setVisibleIndicator(false);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setToast({ message: resMessage, type: "error", show: true });
      }
    );
  };

  const handleClickIcon = (event) => {
    setOpenPopupMenu(event.currentTarget);
  };

  const handleClickMenu = (type) => {
    setOpenPopupMenu(false);
    if (type === "profile") {
      history.push("/profile");
    } else if (type === "disconnect") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      history.push("/auth");
    } else if (type === "proprofile") {
      history.push("/pro-profile");
    } else if (type === "subscription") {
      history.push("/subscription");
    }
  };

  const handleChangeText = (event, type) => {
    if (type === "email") {
      setProfileValue({ ...profileValue, email: event.target.value });
    } else if (type === "password") {
      setProfileValue({ ...profileValue, password: event.target.value });
    } else if (type === "lastname") {
      setProfileValue({ ...profileValue, lastname: event.target.value });
    } else if (type === "firstname") {
      setProfileValue({ ...profileValue, firstname: event.target.value });
    } else if (type === "referral_code") {
      setProfileValue({ ...profileValue, referral_code: event.target.value });
    }
  };

  const handleChangePassword = (event, type) => {
    if (type === "current") {
      setPasswordValue({
        ...passwordValue,
        currentPassword: event.target.value,
      });
    } else if (type === "new") {
      setPasswordValue({ ...passwordValue, newPassword: event.target.value });
    } else if (type === "confirm") {
      setPasswordValue({
        ...passwordValue,
        confirmPassword: event.target.value,
      });
    }
  };

  const handleClickUpdate = () => {
    if (!profileValue.firstname) {
      setToast({
        message: "Veuillez saisir le prenom.",
        type: "info",
        show: true,
      });
      return;
    }
    if (!profileValue.lastname) {
      setToast({
        message: "Veuillez saisir le nom.",
        type: "info",
        show: true,
      });
      return;
    }
    if (!profileValue.email) {
      setToast({
        message: "Veuillez saisir l'email.",
        type: "info",
        show: true,
      });
      return;
    }

    setVisibleIndicator(true);
    APIService.updatedProfile(
      user.email,
      profileValue.email,
      profileValue.firstname,
      profileValue.lastname
    ).then(
      (response) => {
        setVisibleIndicator(false);
        if (response.data.code !== 200) {
          setToast({
            message: response.data.message,
            type: "error",
            show: true,
          });
        } else {
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.data.token)
          );
          user.email = profileValue.email;
          user.first_name = profileValue.firstname;
          user.last_name = profileValue.lastname;
          localStorage.setItem("user", JSON.stringify(user));
          setToast({
            message: response.data.message,
            type: "success",
            show: true,
          });
        }
      },
      (error) => {
        setVisibleIndicator(false);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setToast({ message: resMessage, type: "error", show: true });
      }
    );
  };

  const handleClickUpdatePassword = () => {
    if (!passwordValue.currentPassword) {
      setToast({
        message: "Veuillez saisir votre mot de passe actuel.",
        type: "info",
        show: true,
      });
      return;
    }
    if (!passwordValue.newPassword) {
      setToast({
        message: "Veuillez saisir le nouveau mot de passe.",
        type: "info",
        show: true,
      });
      return;
    }
    if (!passwordValue.confirmPassword) {
      setToast({
        message: "Veuillez saisir la confirmation du nouveau mot de passe.",
        type: "info",
        show: true,
      });
      return;
    }
    if (passwordValue.newPassword !== passwordValue.confirmPassword) {
      setToast({
        message: "Les mots de passe ne sont pas identiques.",
        type: "info",
        show: true,
      });
      return;
    }

    setVisibleIndicator(true);
    APIService.updatedPassword(
      user.email,
      passwordValue.currentPassword,
      passwordValue.newPassword
    ).then(
      (response) => {
        setVisibleIndicator(false);
        if (response.data.code !== 200) {
          setToast({
            message: response.data.message,
            type: "error",
            show: true,
          });
        } else {
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.data.token)
          );
          setToast({
            message: response.data.message,
            type: "success",
            show: true,
          });
        }
      },
      (error) => {
        setVisibleIndicator(false);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setToast({ message: resMessage, type: "error", show: true });
      }
    );
  };

  return (
    <div className={classes.root}>
      {visibleIndicator ? (
        <div className={classes.div_indicator}>
          {" "}
          <CircularProgress className={classes.indicator} />{" "}
        </div>
      ) : null}
      <Snackbar
        open={Boolean(toast.show)}
        autoHideDuration={6000}
        onClose={() => setToast({ ...toast, show: false })}
      >
        <Alert
          onClose={() => setToast({ ...toast, show: false })}
          severity={toast.type}
        >
          {toast.message}
        </Alert>
      </Snackbar>
      <Dialog
        className={classes.dialog_back}
        open={openChangePassword}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpenChangePassword(false);
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.dialog}>
          <div
            className={classes.close_btn}
            onClick={() => {
              setOpenChangePassword(false);
            }}
          >
            <img src="/images/ic_close.png"></img>
          </div>
          <div className={classes.dialog_context_area}>
            <div className={classes.dialog_context}>
              <div className={classes.dialog_title}>
                Réinitialiser mon mot de passe
              </div>
              <div className={classes.div_input_area}>
                <div className={classes.div_input_part}>
                  <div className={classes.text_description}>
                    Mot de passe actuel
                  </div>
                  <input
                    type="password"
                    className={classes.input}
                    value={passwordValue.currentPassword}
                    onChange={(event) => handleChangePassword(event, "current")}
                  />
                </div>
                <div className={classes.div_input_part}>
                  <div className={classes.text_description}>
                    Nouveau mot de passe
                  </div>
                  <input
                    type="password"
                    className={classes.input}
                    value={passwordValue.newPassword}
                    onChange={(event) => handleChangePassword(event, "new")}
                  />
                </div>
                <div className={classes.div_input_part}>
                  <div className={classes.text_description}>
                    Confirmer le mot de passe
                  </div>
                  <input
                    type="password"
                    className={classes.input}
                    value={passwordValue.confirmPassword}
                    onChange={(event) => handleChangePassword(event, "confirm")}
                  />
                </div>
              </div>
              <div className={classes.dialog_btn_area}>
                <div
                  className={classes.btn}
                  onClick={handleClickUpdatePassword}
                >
                  Enregistrer
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <div className={classes.header}>
        <div className={classes.header_title}>Mon Compte</div>
        <div className={classes.header_icon} onClick={handleClickIcon}>
          <img src="/images/user.png" />
        </div>
        {openPopupMenu ? (
          <div className={classes.popup_pointer}>
            <img src="/images/ic_triangle.png" />
          </div>
        ) : null}
        <StyledMenu
          id="customized-menu"
          anchorEl={openPopupMenu}
          keepMounted
          open={Boolean(openPopupMenu)}
          onClose={() => {
            setOpenPopupMenu(null);
          }}
        >
          <div
            className={classes.menu_item}
            onClick={() => handleClickMenu("profile")}
          >
            Mon compte
          </div>
          {proUser ? (
            <div
              className={classes.menu_item}
              onClick={() => handleClickMenu("proprofile")}
            >
              Mon profil
            </div>
          ) : (
            <div />
          )}
          <div
            className={classes.menu_item}
            onClick={() => handleClickMenu("subscription")}
          >
            Mon Abonnement
          </div>
          <div
            className={classes.menu_item}
            onClick={() => handleClickMenu("disconnect")}
          >
            Déconnexion
          </div>
        </StyledMenu>
      </div>
      <div className={classes.content_area}>
        <div className={classes.content}>
          <div className={classes.div_name}>
            <div className={classes.div_input_part}>
              <div className={classes.text_description}>Nom</div>
              <input
                className={classes.input}
                value={profileValue.lastname}
                onChange={(event) => handleChangeText(event, "lastname")}
              />
            </div>
            <div className={classes.div_input_part_lastname}>
              <div className={classes.text_description}>Prénom</div>
              <input
                className={classes.input}
                value={profileValue.firstname}
                onChange={(event) => handleChangeText(event, "firstname")}
              />
            </div>
          </div>
          <div className={classes.div_input_part}>
            <div className={classes.text_description}>Email</div>
            <input
              className={classes.input}
              value={profileValue.email}
              onChange={(event) => handleChangeText(event, "email")}
            />
          </div>
          {/* <div className={classes.div_input_part}>
                        <div className={classes.text_description} >Code de parrainage</div>
                        <input className={classes.input} disabled={true} value={profileValue.referral_code} onChange={(event) => handleChangeText(event, 'referral_code')} />
                    </div> */}
          <div
            className={classes.change_password}
            onClick={() => {
              setOpenChangePassword(true);
            }}
          >
            Réinitialiser mon mot de passe
          </div>
          <div className={classes.btn_area}>
            <div className={classes.btn} onClick={handleClickUpdate}>
              Enregistrer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Profile);
