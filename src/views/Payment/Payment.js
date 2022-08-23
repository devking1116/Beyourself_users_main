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
  Checkbox,
  Divider,
  FormControlLabel,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { SportsRugbySharp } from "@material-ui/icons";
import APIService from "services/api.services";
import publicIp from "public-ip";
import { PayPalButton } from "react-paypal-button-v2";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { STRIPE_PUBLISHABLE_KEY, PAYPAL_CLIENT_ID } from "../../utils/utils";

import "../../assets/css/stripe.css";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

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
    marginBottom: 50,
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
  my_wrapper: {
    paddingBottom: 80,
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
  },
  content: {
    width: 460,
    padding: 15,
  },
  content_gift: {
    marginTop: 60,
    width: 460,
    padding: 30,
    borderRadius: 10,
    boxShadow: "5px 10px 18px #B6ACFB",
  },
  div_name: {
    width: "100%",
    display: "flex",
  },
  div_code: {
    width: "100%",
    display: "flex",
  },
  div_input_part: {
    width: "100%",
  },
  div_input_part_lastname: {
    width: "100%",
    marginLeft: 20,
  },
  checkbox: {
    display: "inline-block",
  },
  checkbox_text: {
    display: "inline-block",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 31,
    [theme.breakpoints.down("xs")]: {
      fontSize: 25,
    },
  },
  text_main_title: {
    marginTop: 60,
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 31,
    [theme.breakpoints.down("xs")]: {
      fontSize: 25,
    },
  },
  text_title: {
    textAlign: "left",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 29,
    [theme.breakpoints.down("xs")]: {
      fontSize: 23,
    },
  },
  text_no_title: {
    marginTop: 20,
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 29,
    [theme.breakpoints.down("xs")]: {
      fontSize: 23,
    },
  },
  text_caption: {
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  checkbox_text_caption: {
    display: "inline-block",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 13,
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
  text_description: {
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 15,
  },
  text_no_description: {
    marginTop: 20,
    textAlign: "center",
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
  input_menu: {
    padding: "5%",
    width: "90%",
    height: 42,
    borderRadius: 21,
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderStyle: "solid",
    borderWidth: 1,
    fontSize: 16,
    marginLeft: "5%",
    "&:focus": {
      outline: "none",
    },
  },
  text_click: {
    float: "left",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 15,
    color: "black",
    cursor: "pointer",
  },
  btn_area: {
    width: "100%",
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
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    width: 300,
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
  btn_change: {
    width: "auto",
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
    marginLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 20,
    marginTop: 5,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 30,
    },
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
  form: {
    "& .MuiFormControlLabel-label": {
      fontFamily: "Poppins, sans-serif",
    },
  },
  btn_area_dialog: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  text_agree: {
    fontSize: 13,
    fontWeight: 300,
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
  },
  modifier: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    alignItems: "center",
    justifyContent: "center",
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

const Payment = (props) => {
  const { history } = props;
  const classes = useStyles();

  const anchorPlanRef = React.useRef(null);
  const anchorEmailRef = React.useRef(null);

  const [proUser, setProUser] = React.useState(false);
  const [openPopupMenu, setOpenPopupMenu] = React.useState(false);
  const [showStripePay, setShowStripePay] = React.useState(false);
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [toast, setToast] = React.useState({
    show: false,
    message: "",
    type: "success",
  });

  let token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));

  const [giftCode, setGiftCode] = React.useState("9xg593");
  const [showGiftDetails, setShowGiftDetails] = React.useState(false);
  const [openPopupMenuPlan, setOpenPopupMenuPlan] = React.useState(null);
  const [openPopupMenuEmail, setOpenPopupMenuEmail] = React.useState(null);
  const [state, setState] = React.useState({
    type: "",
    email: "",
    price: "",
    planId: 0,
    coupon: "",
    message: "",
    refferal: "",
    stripe_id: "",
    giftSelected: 0,
    paypalPlanId: "",
    payment_type: "PAYPAL",
    subscription_end_date: "",
    gifts: [
      {
        price: 0,
        duration: 0,
      },
    ],
  });

  const [stripeAgree, setStripeAgree] = React.useState(false);
  const [paypalAgree, setPaypalAgree] = React.useState(false);

  React.useEffect(() => {
    if (!token || !user || !user.email) {
      history.push("/auth");
    }
    if (user.user_type && user.user_type === "PRO") {
      setProUser(true);
    }

    console.log(props.location.state);
    setState({
      ...state,
      ...props.location.state,
    });
  }, []);

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

  const onPayPalCreateSubscriptionSuccess = (data, actions) => {
    return actions.subscription.get().then(function (details) {
      return handleCreateSubscription("PAYPAL", data.subscriptionID);
    });
  };

  const onPayPalCreateSubscription = (data, actions) => {
    if (!paypalAgree)
      return setToast({
        message:
          "Vous devez accepter les conditions generales d'utilisation et la politique de respect de la vie privee.",
        type: "error",
        show: true,
      });

    let plan_id_name = `REACT_APP_PAYPAL_SUBSCRIBTION_${state.planId}`;
    const plan_id = process.env[plan_id_name];

    return actions.subscription.create({
      plan_id: state.coupon.length > 0 ? state.paypalPlanId : plan_id,
    });
  };

  const onPayPalCreateGiftSubscription = (data, actions) => {
    if (!paypalAgree)
      return setToast({
        message:
          "Vous devez accepter les conditions generales d'utilisation et la politique de respect de la vie privee.",
        type: "error",
        show: true,
      });

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: String(
              state.type == "gift"
                ? state.gifts[state.giftSelected].price
                : state.price
            ),
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING", // default is "GET_FROM_FILE"
      },
    });
  };

  const handleCreateGiftSubscription = async (
    payment_gateway,
    gateway_sub_id
  ) => {
    setVisibleIndicator(true);
    APIService.createGiftSubscription({
      data: {
        user: state.email,
        ip_address: await publicIp.v4(),
        name:
          state.planId == 1 ? "Abonnement mensuel" : "Abonnement semestriel",
        canal: "WEB",
        duration: state.planId == 1 ? 1 : 6,
        price: state.planId == 1 ? 5.9 : 29.9,
        status: 0,
        termination_asked: 0,
        payment_status: 1,
        payment_gateway,
        buyer_email: user.email,
        auto_renew: 0,
        giftMessage: state.message,
        sub_type: state.planId,
        gateway_sub_id,
      },
    }).then(
      (response) => {
        setVisibleIndicator(false);
        if (response.data.data.code_id) {
          setToast({
            message: response.data.message,
            type: "success",
            show: true,
          });
          setGiftCode(response.data.data.code_id);
          setShowGiftDetails(true);
        } else {
          setToast({
            message: response.data.message,
            type: "error",
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

  const handleCreateSubscription = async (payment_gateway, gateway_sub_id) => {
    setVisibleIndicator(true);
    APIService.createSubscription({
      type: state.type,
      data: {
        user: user.email,
        ip_address: await publicIp.v4(),
        name:
          state.planId == 1 ? "Abonnement mensuel" : "Abonnement semestriel",
        canal: "WEB",
        duration: state.planId == 1 ? 1 : 6,
        price: state.planId == 1 ? 5.9 : 29.9,
        status: 1,
        termination_asked: 0,
        payment_status: 1,
        payment_gateway,
        buyer_email: "",
        auto_renew: 1,
        sub_type: state.planId,
        gateway_sub_id,
      },
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
          setToast({
            message: response.data.message,
            type: "success",
            show: true,
          });

          setTimeout(() => {
            history.push("/subscription");
          }, 2000);
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

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const ELEMENT_OPTIONS = {
      hidePostalCode: true,
      style: {
        base: {
          color: "#303238",
          fontSize: "16px",
          fontFamily: "sans-serif",
          fontSmoothing: "antialiased",
          "::placeholder": {
            color: "#CFD7DF",
          },
          "::-ms-clear": {
            display: "block",
          },
        },
        invalid: {
          color: "#e5424d",
          ":focus": {
            color: "#303238",
          },
        },
      },
    };

    const handlePaymentStripe = async (event) => {
      event.preventDefault();

      if (!stripeAgree)
        return setToast({
          message:
            "Veuillez accepter les conditions generales d'utilisation et la politique de respect de la vie privee.",
          type: "error",
          show: true,
        });

      let source;
      source = await stripe.createSource(
        elements.getElement(CardNumberElement)
      );

      if (!source)
        return setToast({
          message: "Erreur lors du paiement, veuillez reessayer.",
          type: "error",
          show: true,
        });

      setVisibleIndicator(true);
      APIService.checkStripeUser({
        stripe_id: state.stripe_id,
        email: user.email,
      }).then(
        (response) => {
          setVisibleIndicator(false);
          if (response.data.id) {
            handleStripeSubscription(response.data.id, source.source.id);
          } else {
            return setToast({
              message: response.data.message,
              type: "error",
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

    const handleStripeSubscription = (stripe_id, source_id) => {
      let plan_id_name = `REACT_APP_STRIPE_SUBSCRIBTION_${state.planId}`;
      const plan_id = process.env[plan_id_name];

      console.log(plan_id_name);
      console.log(plan_id);

      setVisibleIndicator(true);
      APIService.createStripeOrder({
        plan_id,
        source_id,
        stripe_id,
        coupon: state.coupon,
        order_type: state.type,
        subscription_end_date: state.subscription_end_date,
        price:
          state.type == "gift"
            ? state.gifts[state.giftSelected].price
            : state.price,
      }).then(
        (response) => {
          setVisibleIndicator(false);
          if (response.data.gateway_sub_id) {
            if (state.type == "pay") {
              handleCreateSubscription("STRIPE", response.data.gateway_sub_id);
            } else if (state.type == "gift") {
              handleCreateGiftSubscription(
                "STRIPE",
                response.data.gateway_sub_id
              );
            } else if (state.type == "change") {
              handleCreateSubscription("STRIPE", response.data.gateway_sub_id);
            }
          } else {
            setToast({
              message: "Erreur lors du paiement. Veuillez reessayer",
              type: "error",
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
      <form onSubmit={handlePaymentStripe}>
        <div>
          <CardNumberElement id="cardNumber" options={ELEMENT_OPTIONS} />

          <CardExpiryElement id="expiry" options={ELEMENT_OPTIONS} />

          <CardCvcElement id="cvc" options={ELEMENT_OPTIONS} />
        </div>

        <div className={classes.btn_area}>
          <button
            style={{ borderWidth: 0 }}
            className={classes.btn}
            type="submit"
            disabled={!stripe}
          >
            {state.type == "change"
              ? "Changer"
              : `Payer ${
                  state.type == "pay"
                    ? state.price
                    : `${parseFloat(
                        state.gifts[state.giftSelected].price
                      ).toFixed(2)}€`
                }`}
          </button>
        </div>
      </form>
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
        keepMounted
        open={showStripePay}
        className={classes.dialog_back}
        TransitionComponent={Transition}
        onClose={() => {
          setShowStripePay(false);
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.dialog}>
          <div
            className={classes.close_btn}
            onClick={() => {
              setShowStripePay(false);
            }}
          >
            <img src="/images/ic_close.png"></img>
          </div>
          <div className={classes.dialog_context_area}>
            <div className={classes.dialog_context}>
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
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

      {showGiftDetails ? (
        <div>
          <div className={classes.content_area}>
            <div className={classes.content_gift}>
              <div className={classes.text_no_title}>Paiement accepté!</div>
              <div className={classes.text_no_description}>
                Votre code cadeau est le:
              </div>
              <div className={classes.text_no_title}>{giftCode}</div>
              <div className={classes.text_no_description}>
                Un email récapitulatif vous a été envoyé, ainsi qu'au
                destinataire.
              </div>

              <div className={classes.btn_area}>
                <div
                  className={classes.btn}
                  onClick={() => {
                    history.push("/subscription");
                  }}
                >
                  Retourner vers l'accueil
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.my_wrapper}>
          {state.type == "gift" ? (
            <div>
              <div className={classes.modifier}>
                <div className={classes.text_caption}>
                  Ma commande : Une carte cadeau Be Yourself{" "}
                  {state.planId == 1 ? "1" : "6"} mois
                </div>
                <div
                  ref={anchorPlanRef}
                  style={{ borderWidth: 0 }}
                  aria-controls="customized-menu-plan"
                  aria-haspopup="true"
                  onClick={() => setOpenPopupMenuPlan(true)}
                  className={classes.btn_change}
                >
                  modifier
                </div>
                <Menu
                  keepMounted
                  id="simple-menu"
                  style={{ marginTop: "3%" }}
                  anchorEl={anchorPlanRef.current}
                  open={Boolean(openPopupMenuPlan)}
                  onClose={() => {
                    setOpenPopupMenuPlan(null);
                  }}
                >
                  <div
                    className={classes.menu_item}
                    onClick={() => {
                      setState({ ...state, planId: 1, giftSelected: 0 });
                      setOpenPopupMenuPlan(null);
                    }}
                  >
                    1 mois
                  </div>
                  <div
                    className={classes.menu_item}
                    onClick={() => {
                      setState({ ...state, planId: 2, giftSelected: 1 });
                      setOpenPopupMenuPlan(null);
                    }}
                  >
                    6 mois
                  </div>
                </Menu>
              </div>

              <div className={classes.modifier}>
                <div className={classes.text_caption}>
                  L'email de votre destinataire : Une carte cadeau Be Yourself{" "}
                  {state.email}
                </div>
                <div
                  ref={anchorEmailRef}
                  style={{ borderWidth: 0 }}
                  aria-controls="customized-menu-email"
                  aria-haspopup="true"
                  onClick={() => setOpenPopupMenuEmail(true)}
                  className={classes.btn_change}
                >
                  modifier
                </div>

                <Menu
                  keepMounted
                  id="simple-menu"
                  style={{ marginTop: "3%" }}
                  anchorEl={anchorEmailRef.current}
                  open={Boolean(openPopupMenuEmail)}
                  onClose={() => {
                    setOpenPopupMenuEmail(null);
                  }}
                >
                  <input
                    className={classes.input_menu}
                    value={state.email}
                    onChange={(event) =>
                      setState({ ...state, email: event.target.value })
                    }
                  />
                </Menu>
              </div>

              <div className={classes.text_caption}>
                Paiement 100% sécurisé.
              </div>
            </div>
          ) : (
            <div className={classes.text_caption}>
              Vous avez choisi de vous abonner à Be yourself avec l'abonnement{" "}
              {state.planId == 1 ? "mensuel" : "semestriel"}. <br /> Paiement
              100% sécurisé.
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 50,
            }}
            className="row"
          >
            <Checkbox
              checked={state.payment_type == "STRIPE"}
              size="medium"
              onClick={() => {
                setState({ ...state, payment_type: "STRIPE" });
                setPaypalAgree(false);
              }}
            />
            <div
              onClick={() => {
                setState({ ...state, payment_type: "STRIPE" });
                setPaypalAgree(false);
              }}
              className={classes.checkbox_text}
            >
              Carte bancaire
            </div>
          </div>

          <div className={classes.content_area}>
            <div className={classes.content}>
              <div className={classes.btn_area_dialog}>
                <div
                  className={classes.btn}
                  onClick={
                    stripeAgree
                      ? () => {
                          setShowStripePay(true);
                        }
                      : () => {
                          return setToast({
                            message:
                              "Veuillez accepter les conditions generales d'utilisation et la politique de respect de la vie privee",
                            type: "error",
                            show: true,
                          });
                        }
                  }
                >
                  {state.type == "change"
                    ? "Changer"
                    : `Payer ${
                        state.type == "pay"
                          ? state.price
                          : `${parseFloat(
                              state.gifts[state.giftSelected].price
                            ).toFixed(2)}€`
                      }`}
                </div>
              </div>
            </div>
          </div>

          {state.payment_type == "STRIPE" ? (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
                className="row"
              >
                <div className={classes.text_agree}>
                  <img
                    style={{ width: 15, height: 19 }}
                    src="/images/lock.png"
                  />{" "}
                  Pour notre sécurité à tous, nous ne conservons aucune
                  information concernant les cartes de crédits dans notre
                  système. La société stripe, est la société en responsabilité
                  de sécuriser les transactions.
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
                className="row"
              >
                <div className={classes.text_agree}>
                  <img
                    style={{ width: 15, height: 19 }}
                    src="/images/lock.png"
                  />{" "}
                  Toutes les données relatives au paiement et aux moyens de
                  paiement sont envoyées via{" "}
                  <a href="https://stripe.com/fr/privacy">stripe payments</a>.
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
                className="row"
              >
                <FormControlLabel
                  value="end"
                  labelPlacement="end"
                  className={classes.form}
                  label="J'accepte les conditions générales d'utilisation et la politique de respect de la vie privée"
                  control={
                    <Checkbox
                      checked={stripeAgree}
                      size="medium"
                      onClick={() => {
                        setPaypalAgree(false);
                        setStripeAgree(!stripeAgree);
                        setState({ ...state, payment_type: "STRIPE" });
                      }}
                    />
                  }
                />
              </div>
            </div>
          ) : (
            <div />
          )}

          <Divider style={{ marginTop: 30, marginBottom: 30 }} />

          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 15 }}
            className="row"
          >
            <Checkbox
              checked={state.payment_type == "PAYPAL"}
              size="medium"
              onClick={() => {
                setState({ ...state, payment_type: "PAYPAL" });
                setStripeAgree(false);
              }}
            />
            <div
              onClick={() => {
                setState({ ...state, payment_type: "PAYPAL" });
                setStripeAgree(false);
              }}
              className={classes.checkbox_text}
            >
              PayPal
            </div>
          </div>

          <div className={classes.content_area}>
            <div className={classes.content}>
              {state.type == "gift" ? (
                <PayPalButton
                  createOrder={onPayPalCreateGiftSubscription}
                  amount={String(
                    state.type == "gift"
                      ? state.gifts[state.giftSelected].price
                      : state.price
                  )}
                  options={{
                    vault: true,
                    disableFunding: "credit,card",
                    clientId: PAYPAL_CLIENT_ID,
                    currency: "EUR",
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(function (details) {
                      return handleCreateGiftSubscription(
                        "PAYPAL",
                        data.orderID
                      );
                    });
                  }}
                />
              ) : (
                <PayPalButton
                  onApprove={onPayPalCreateSubscriptionSuccess}
                  createSubscription={onPayPalCreateSubscription}
                  options={{
                    vault: true,
                    disableFunding: "credit,card",
                    clientId: PAYPAL_CLIENT_ID,
                    currency: "EUR",
                  }}
                />
              )}
            </div>
          </div>

          {state.payment_type == "PAYPAL" ? (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
                className="row"
              >
                <div className={classes.text_agree}>
                  PayPal est une solution de paiement sécurisée qui accepte la
                  majorité des cartes bancaires ou celles que vous avez lié à
                  votre compte bancaire www.paypal.fr
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
                className="row"
              >
                <div className={classes.text_agree}>
                  <img
                    style={{ width: 15, height: 19 }}
                    src="/images/lock.png"
                  />{" "}
                  Pour notre sécurité à tous, nous ne conservons aucune
                  information concernant les cartes de crédits dans notre
                  système. La société Paypal, est la société en responsabilité
                  de sécuriser les transactions.
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
                className="row"
              >
                <div className={classes.text_agree}>
                  <img
                    style={{ width: 15, height: 19 }}
                    src="/images/lock.png"
                  />{" "}
                  Toutes les données relatives au paiement et aux moyens de
                  paiement sont envoyées via{" "}
                  <a href="https://www.paypal.com/fr/webapps/mpp/ua/legalhub-full?locale.x=fr_FR">
                    Paypal
                  </a>
                  .
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
                className="row"
              >
                <FormControlLabel
                  value="end"
                  labelPlacement="end"
                  className={classes.form}
                  label="J'accepte les conditions générales d'utilisation et la politique de respect de la vie privée"
                  control={
                    <Checkbox
                      checked={paypalAgree}
                      size="medium"
                      onClick={() => {
                        setStripeAgree(false);
                        setPaypalAgree(!paypalAgree);
                        setState({ ...state, payment_type: "PAYPAL" });
                      }}
                    />
                  }
                />
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
};

Payment.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Payment);
