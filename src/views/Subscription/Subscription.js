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
  Select,
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
    paddingLeft: 30,
    paddingRight: 30,
  },
  content: {
    width: 460,
    padding: 30,
    borderRadius: 10,
    boxShadow: "5px 10px 18px #B6ACFB",
  },
  content_sub_area: {
    marginTop: 80,
  },
  content_area_row: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  content_left: {
    margin: 5,
    padding: 30,
    width: "30%",
    borderRadius: 10,
    boxShadow: "5px 10px 18px #B6ACFB",
    backgroundColor: "#fff",
    marginLeft: 30,
    marginRight: 10,
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      display: "block",
      marginLeft: "5%",
      marginRight: 0,
      marginTop: 40,
      marginBottom: 10,
      padding: 20,
    },
  },
  content_right: {
    margin: 5,
    padding: 30,
    width: "30%",
    borderRadius: 10,
    boxShadow: "5px 10px 18px #B6ACFB",
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 30,
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      display: "block",
      marginLeft: "5%",
      marginRight: 0,
      padding: 20,
    },
  },
  div_code: {
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
  text_main_title: {
    marginTop: 20,
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 23,
    paddingRight: 30,
    paddingLeft: 30,
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  text_title: {
    textAlign: "left",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 20,
    [theme.breakpoints.down("xs")]: {
      fontSize: 17,
    },
  },
  text_no_title: {
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 20,
    paddingBottom: 20,
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
    },
  },
  text_description: {
    paddingTop: 5,
    paddingBottom: 20,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 15,
  },
  text_no_caption: {
    padding: 10,
    marginLeft: "20%",
    marginRight: 30,
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 12,
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 30,
      paddingRight: 30,
    },
  },
  text_no_description: {
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 15,
  },
  sub_container: {
    paddingBottom: 100,
  },
  input: {
    width: "100%",
    height: 35,
    borderRadius: 21,
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: -10,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
    "&:focus": {
      outline: "none",
    },
  },
  input_message: {
    width: "100%",
    height: 142,
    borderRadius: 21,
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderStyle: "solid",
    borderWidth: 1,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    fontSize: 14,
    marginTop: -10,
    "&:focus": {
      outline: "none",
    },
  },
  text_click: {
    float: "left",
    marginBottom: 15,
    textDecoration: "underline",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 15,
    color: "black",
    cursor: "pointer",
  },
  btn_area: {
    width: "100%",
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
  },
  btn_area_sub: {
    width: "100%",
    marginTop: 40,
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
  },
  btn_area_dialog: {
    width: "100%",
    marginTop: 40,
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
  },
  btn_area_code: {
    width: 200,
    marginLeft: 50,
    display: "flex",
    justifyContent: "center",
  },
  btn_area_btm: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    width: "auto",
    height: "auto",
    borderRadius: 25,
    color: "black",
    backgroundColor: "#F0B7A4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  dialog_back: {
    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "none",
      margin: 0,
    },
    "& .MuiPaper-elevation24": {
      boxShadow: "5px 10px 15px rgba(182, 172, 251, 0.6)",
    },
  },
  dialog: {
    width: "70vw",
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
    },
    maxWidth: 800,
    height: "100%",
    borderRadius: 10,
    backgroundColor: "white",
    paddingBottom: 30,
  },
  close_btn: {
    float: "right",
    marginTop: 15,
    marginRight: 10,
    cursor: "pointer",
  },
  dialog_context_area: {
    width: "100%",
    marginTop: 91,
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
    fontSize: 36,
    [theme.breakpoints.down("xs")]: {
      fontSize: 28,
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
    width: "80%",
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Subscription = (props) => {
  const { history } = props;
  const classes = useStyles();

  const [proUser, setProUser] = React.useState(false);
  const [showGift, setShowGift] = React.useState(false);
  const [planTime, setPlanTime] = React.useState("1 mois");
  const [planPrice, setPlanPrice] = React.useState("5.90");
  const [paypalPlanId, setPaypalPlanId] = React.useState("");
  const [showDiscount, setShowDiscount] = React.useState(false);
  const [showEnterGift, setShowEnterGift] = React.useState(false);
  const [openPopupMenu, setOpenPopupMenu] = React.useState(false);
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [toast, setToast] = React.useState({
    show: false,
    message: "",
    type: "success",
  });

  let token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));

  const [isPromoApplied, setIsPromoApplied] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [gifts, setGifts] = React.useState([]);
  const [promos, setPromos] = React.useState([]);
  const [refferal, setRefferal] = React.useState("");
  const [showSubs, setShowSubs] = React.useState(true);
  const [giftEmail, setGiftEmail] = React.useState("");
  const [giftMessage, setGiftMessage] = React.useState("");
  const [giftSelected, setGiftSelected] = React.useState(0);
  const [activationCode, setActivationCode] = React.useState("");
  const [displaySubEnd, setDisplaySubEnd] = React.useState("");
  const [displaySubStart, setDisplaySubStart] = React.useState("");
  const [displayTitleText, setDisplayTitleText] = React.useState("");
  const [subscription, setSubscription] = React.useState({
    id: "",
    name: "",
    code_id: null,
    stripe_id: "",
    subtype_id: 0,
    gateway_sub_id: "",
    payment_gateway: "",
    status: { data: [0] },
    subscription_end_date: "",
    auto_renew: { data: [0] },
    subscription_start_date: "",
    termination_asked: { data: [0] },
  });

  React.useEffect(() => {
    if (!token || !user || !user.email) {
      history.push("/auth");
    }
    if (user.user_type && user.user_type === "PRO") {
      setProUser(true);
    }
    getGifts();
    getPromos();
    getUserSubscription();
  }, []);

  React.useEffect(() => {
    if (subscription.status.data[0] == 0) setShowSubs(true);
    else setShowSubs(false);
  }, [subscription]);

  const getGifts = () => {
    setVisibleIndicator(true);
    APIService.getGifts().then(
      (response) => {
        setVisibleIndicator(false);
        if (response.data.code !== 200) {
          setToast({
            message: response.data.message,
            type: "error",
            show: true,
          });
        } else {
          setGifts(response.data.data);
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

  const getPromos = () => {
    setVisibleIndicator(true);
    APIService.getPromos().then(
      (response) => {
        setVisibleIndicator(false);
        if (response.data.code !== 200) {
          setToast({
            message: response.data.message,
            type: "error",
            show: true,
          });
        } else {
          setPromos(response.data.data);
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

  const getUserSubscription = () => {
    setVisibleIndicator(true);
    APIService.getUserSubscription(user.email).then(
      (response) => {
        setVisibleIndicator(false);
        if (response.data.code !== 200) {
          // setToast({ message: response.data.message, type: 'error', show: true })
        } else {
          let display_start =
            response.data.data.subscription_start_date.split(" ")[0];
          display_start = display_start.split("-");
          setDisplaySubStart(
            display_start[2] + "-" + display_start[1] + "-" + display_start[0]
          );

          let display_end =
            response.data.data.subscription_end_date.split(" ")[0];
          display_end = display_end.split("-");
          setDisplaySubEnd(
            display_end[2] + "-" + display_end[1] + "-" + display_end[0]
          );
          setSubscription(response.data.data);

          console.log(response.data.data);

          if (response.data.data.termination_asked.data[0] != 0)
            setDisplayTitleText(
              `Je bénéficie d'un abonnement depuis le ${
                display_start[2] +
                "-" +
                display_start[1] +
                "-" +
                display_start[0]
              }. Il prendra fin le ${
                display_end[2] + "-" + display_end[1] + "-" + display_end[0]
              } suite à ma demande de résiliation`
            );
          else if (response.data.data.code_id != null)
            setDisplayTitleText(
              `Je bénéficie de l'accès gratuit à tous les contenus BE YOURSELF grâce à ma carte cadeau, jusqu'au ${
                display_end[2] + "-" + display_end[1] + "-" + display_end[0]
              }`
            );
          else
            setDisplayTitleText(
              `Je bénéficie d'un Abonnement depuis le ${
                display_start[2] +
                "-" +
                display_start[1] +
                "-" +
                display_start[0]
              }`
            );
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

  const handleCheckPromoCode = () => {
    if (!isPromoApplied) {
      let isCorrectPromo = false;
      let isPromoExpired = false;
      let isPromoNotActive = false;

      for (let iCount = 0; iCount < promos.length; iCount++) {
        const promo = promos[iCount];

        if (promo.name == code) {
          if (promo.status == 1) {
            const now = new Date();
            const dateTo = new Date(promo.end_date.split(" ")[0]);
            const dateFrom = new Date(promo.start_date.split(" ")[0]);

            if (now > dateFrom && now < dateTo) {
              setPaypalPlanId(
                planTime.split(" ")[0] == "1"
                  ? promo.paypal_plan_1
                  : promo.paypal_plan_2
              );
              setPlanPrice(
                `${String(
                  parseFloat(
                    (parseInt(planPrice) * promo.discount_value) / 100
                  ).toFixed(2)
                ).replace(".", ",")}€`
              );

              isCorrectPromo = true;
            } else isPromoExpired = true;
          } else isPromoNotActive = true;
        }
      }

      if (isCorrectPromo) {
        setIsPromoApplied(true);
        return setToast({
          message: "Code applique avec succes.",
          type: "success",
          show: true,
        });
      } else if (isPromoExpired)
        return setToast({
          message: "Le code saisi a expire. Merci de saisir un autre code.",
          type: "error",
          show: true,
        });
      else if (isPromoNotActive)
        return setToast({
          message: "Le code saisi est inactif. Merci de saisir un autre code.",
          type: "error",
          show: true,
        });

      return setToast({
        message: "Le code saisi n'existe pas. Merci de saisir un autre code.",
        type: "error",
        show: true,
      });
    }
  };

  const handleCancelSubscription = () => {
    setVisibleIndicator(true);
    APIService.cancelSubscription({
      gateway_sub_id: subscription.gateway_sub_id,
      payment_gateway: subscription.payment_gateway,
    }).then(
      (response) => {
        setVisibleIndicator(false);
        if (response.data.code !== 200) {
          setToast({
            message: response.data.message,
            type: "error",
            show: true,
          });
        } else {
          window.location.reload();
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

  const handleActivationCode = () => {
    setVisibleIndicator(true);
    APIService.activateGiftCode({ email: user.email, activationCode }).then(
      (response) => {
        console.log(response);
        setVisibleIndicator(false);
        if (response.data.code !== 200) {
          setToast({
            message: response.data.message,
            type: "error",
            show: true,
          });
        } else {
          setShowEnterGift(false);
          window.location.reload();
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

  const handlePaymentRedirect = (type) => {
    if (type == "pay") {
      history.push({
        pathname: "/payment",
        state: {
          type,
          refferal,
          coupon: code,
          price: planPrice,
          paypalPlanId: paypalPlanId,
          stripe_id: subscription.stripe_id,
          planId: planTime.split(" ")[0] == "1" ? 1 : 2,
        },
      });
    } else if (type == "gift") {
      const email = giftEmail.trim();
      const pattern =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (pattern.test(email) === false) {
        return setToast({
          message: "Email invalide",
          type: "error",
          show: true,
        });
      } else {
        history.push({
          pathname: "/payment",
          state: {
            type,
            email,
            gifts,
            giftSelected,
            coupon: code,
            message: giftMessage,
            price: gifts[giftSelected].price,
            stripe_id: subscription.stripe_id,
            planId: planTime.split(" ")[0] == "1" ? 1 : 2,
          },
        });
      }
    } else if (type == "change") {
      history.push({
        pathname: "/payment",
        state: {
          type,
          price: subscription.price,
          stripe_id: subscription.stripe_id,
          planId: subscription.duration == 1 ? 1 : 2,
          subscription_end_date: subscription.subscription_end_date,
        },
      });
    }
  };

  const setGiftPricingTitle = (gift) => {
    switch (gift.duration) {
      case 1:
        return `${parseFloat(gift.price).toFixed(2)}€/mois`;
      case 3:
        return `${parseFloat(gift.price).toFixed(2)}€/3 mois`;
      case 6:
        return `${parseFloat(gift.price).toFixed(2)}€/semestre`;
      case 12:
        return `${parseFloat(gift.price).toFixed(2)}€/an`;
      case 24:
        return `${parseFloat(gift.price).toFixed(2)}€/2 ans`;
      default:
        return "";
    }
  };

  const setGiftPricing = (gift) => {
    switch (gift.duration) {
      case 1:
        return `${parseFloat(gift.price).toFixed(2)}€`;
      case 3:
        return `${parseFloat(gift.price).toFixed(2)}€`;
      case 6:
        return `${parseFloat(gift.price).toFixed(2)}€`;
      case 12:
        return `${parseFloat(gift.price).toFixed(2)}€`;
      case 24:
        return `${parseFloat(gift.price).toFixed(2)}€`;
      default:
        return "";
    }
  };

  const setGiftTime = (gift) => {
    switch (gift.duration) {
      case 1:
        return `${gift.duration} mois`;
      case 3:
        return `${gift.duration} mois`;
      case 6:
        return `${gift.duration} semestre`;
      case 12:
        return `${gift.duration} an`;
      case 24:
        return `${gift.duration} 2 ans`;
      default:
        return "";
    }
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
        scroll="body"
        className={classes.dialog_back}
        open={showEnterGift}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setShowEnterGift(false);
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.dialog}>
          <div
            className={classes.close_btn}
            onClick={() => {
              setShowEnterGift(false);
            }}
          >
            <img src="/images/ic_close.png"></img>
          </div>
          <div className={classes.dialog_context_area}>
            <div className={classes.dialog_context}>
              <div className={classes.text_no_title}>
                Activer une carte cadeau
              </div>

              <div className={classes.div_input_part}>
                <div className={classes.text_description}>Code</div>
                <input
                  className={classes.input}
                  value={activationCode}
                  onChange={(event) => {
                    setActivationCode(event.target.value);
                  }}
                />
              </div>

              <div className={classes.btn_area_dialog}>
                <div className={classes.btn} onClick={handleActivationCode}>
                  Activer
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        scroll="body"
        className={classes.dialog_back}
        open={showGift}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setShowGift(false);
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.dialog}>
          <div
            className={classes.close_btn}
            onClick={() => {
              setShowGift(false);
            }}
          >
            <img src="/images/ic_close.png"></img>
          </div>
          <div className={classes.dialog_context_area}>
            <div className={classes.dialog_context}>
              <div className={classes.text_no_title}>
                Acheter une carte cadeau
              </div>

              <div className={classes.text_description}>Durée</div>
              <Select
                value={giftSelected}
                style={{ width: "100%", padding: 10 }}
                onChange={(event) => {
                  setPlanPrice(`${setGiftPricing(gifts[event.target.value])}`);
                  setPlanTime(`${setGiftTime(gifts[event.target.value])}`);
                  setGiftSelected(event.target.value);
                }}
              >
                {gifts.map((gift, i) => (
                  <MenuItem key={i} value={i}>
                    {setGiftPricingTitle(gift)}
                  </MenuItem>
                ))}
              </Select>

              <div className={classes.div_input_part}>
                <div className={classes.text_description}>
                  Email du destinataire *
                </div>
                <input
                  className={classes.input}
                  value={giftEmail}
                  onChange={(event) => {
                    setGiftEmail(event.target.value);
                  }}
                />
              </div>

              <div className={classes.div_input_part}>
                <div className={classes.text_description}>
                  Texte envoyé au destinataire
                </div>
                <textarea
                  className={classes.input_message}
                  value={giftMessage}
                  onChange={(event) => {
                    setGiftMessage(event.target.value);
                  }}
                />
              </div>

              <div className={classes.btn_area_dialog}>
                <div
                  className={classes.btn}
                  onClick={() => handlePaymentRedirect("gift")}
                >
                  Acheter
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        className={classes.dialog_back}
        open={showDiscount}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setShowDiscount(false);
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.dialog}>
          <div
            className={classes.close_btn}
            onClick={() => {
              setShowDiscount(false);
            }}
          >
            <img src="/images/ic_close.png"></img>
          </div>
          <div className={classes.dialog_context_area}>
            <div className={classes.dialog_context}>
              <div className={classes.text_no_title}>Je m'abonne</div>
              <div className={classes.text_no_description}>
                {planTime} -{" "}
                <span
                  style={{ fontWeight: "bold" }}
                  className={classes.text_no_description}
                >
                  {planPrice}
                </span>
              </div>

              <div className={classes.div_input_part}>
                <div className={classes.text_description}>Code promo *</div>

                <div className={classes.div_code}>
                  <input
                    className={classes.input}
                    value={code}
                    onChange={(event) => {
                      setCode(event.target.value);
                    }}
                  />

                  <div className={classes.btn_area_code}>
                    <div className={classes.btn} onClick={handleCheckPromoCode}>
                      Appliquer
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.div_input_part}>
                <div className={classes.text_description}>
                  Code de parrainage
                </div>
                <input
                  className={classes.input}
                  value={refferal}
                  onChange={(event) => {
                    setRefferal(event.target.value);
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="row"
              >
                <div className={classes.btn_area_dialog}>
                  <div
                    className={classes.btn}
                    onClick={() => handlePaymentRedirect("pay")}
                  >
                    Paiement
                  </div>
                </div>

                <div className={classes.btn_area_dialog}>
                  <div
                    className={classes.btn}
                    onClick={() => handlePaymentRedirect("pay")}
                  >
                    Je n'ai pas de code
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <div className={classes.header}>
        <div className={classes.header_title}>Mon Abonnement</div>
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
      {showSubs ? (
        <div className={classes.sub_container}>
          <div className={classes.text_main_title}>
            Vous êtes en freemium, abonnez-vous pour découvrir tout l'univers Be
            Yourself
          </div>
          <div className={classes.content_area_row}>
            <div className={classes.content_left}>
              <div className={classes.text_no_title}>Abonnement mensuel</div>
              <div className={classes.text_no_description}>Sans engagement</div>
              <div className={classes.text_no_description}>
                Annulation en 1 clic !
              </div>
              <div className={classes.text_no_title}>5,90€ par mois*</div>

              <div className={classes.btn_area}>
                <div
                  className={classes.btn}
                  onClick={() => {
                    setPlanPrice("5,90€");
                    setPlanTime("1 mois");
                    setShowDiscount(true);
                  }}
                >
                  Je m'abonne
                </div>
              </div>
            </div>
            <div className={classes.content_right}>
              <div className={classes.text_no_title}>Abonnement semestriel</div>
              <div className={classes.text_no_description}>Sans engagement</div>
              <div className={classes.text_no_description}>
                Annulation en 1 clic !
              </div>
              <div className={classes.text_no_title}>
                29,90€ tous les 6 mois*
              </div>

              <div className={classes.btn_area}>
                <div
                  className={classes.btn}
                  onClick={() => {
                    setPlanPrice("29,90€");
                    setPlanTime("6 semestre");
                    setShowDiscount(true);
                  }}
                >
                  Je m'abonne
                </div>
              </div>
            </div>
          </div>

          <div className={classes.text_no_caption}>
            *Votre abonnement sera facturé en un seul paiement de 5,90 € pour
            l'abonnement mensuel et de 29,90 € pour l'abonnement semestriel.
            Pour éviter toute discontinuité de votre accès, votre abonnement Be
            Yourself sera renouvelé automatiquement sur une période équivalente
            à celle initialement souscrite. Vous pouvez bien sûr annuler le
            renouvellement automatique de votre abonnement à tout moment à
            partir de la page "Mon compte" dans l'onglet "Abonnement". La
            notification de résilier l'abonnement devra être faite par le membre
            à Be Yourself au plus tard 48 heures avant la date d'échéance de
            l'abonnement en cours. Conformément à l'article L. 221-3 du Code de
            la Consommation vous disposez d'un délai de quinze jours francs à
            compter de la souscription de votre abonnement pour exercer votre
            droit de rétractation. Pour consulter nos conditions générales
            d'utilisation, cliquez <a href="#">ici</a>.
          </div>

          <div className={classes.btn_area_btm}>
            <div
              className={classes.btn}
              onClick={() => {
                setShowGift(true);
              }}
            >
              Acheter une carte cadeau
            </div>
          </div>

          <div className={classes.btn_area_btm}>
            <div
              className={classes.btn}
              onClick={() => {
                setShowEnterGift(true);
              }}
            >
              Activer une carte cadeau
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.content_sub_area}>
          <div className={classes.content_area}>
            <div className={classes.content}>
              <div className={classes.text_title}>Je suis abonné(e)</div>
              <div className={classes.text_description}>
                {displayTitleText}.
              </div>
              <div className={classes.text_title}>Prochain prélevement</div>
              <div className={classes.text_description}>
                {subscription.auto_renew.data[0] == 0 ? "-" : displaySubEnd}
              </div>

              <div
                className={classes.text_click}
                onClick={() => handlePaymentRedirect("change")}
              >
                Changer mon moyen de paiement
              </div>
              {subscription.termination_asked.data[0] == 0 &&
              subscription.code_id == null ? (
                <div
                  className={classes.text_click}
                  onClick={() => handleCancelSubscription()}
                >
                  Résilier mon abonnement
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>

          <div className={classes.btn_area_sub}>
            <div
              className={classes.btn}
              onClick={() => {
                setShowGift(true);
              }}
            >
              Acheter une carte cadeau
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Subscription.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Subscription);
