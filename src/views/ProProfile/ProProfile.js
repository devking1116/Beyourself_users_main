import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles, withStyles } from "@material-ui/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Slide,
  Dialog,
  Typography,
  MenuItem,
  Menu,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { SportsRugbySharp } from "@material-ui/icons";
import APIService from "services/api.services";
import CustomCheckBox from "../../components/CustomCheckBox";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { PRO_URL } from "utils/utils";

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
    backgroundColor: "#FFD8BE",
    display: "flex",
    alignItems: "center",
  },
  header_title: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 44,
    marginLeft: 180,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 50,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 28,
    },
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
    width: "65%",
    marginTop: 90,
    marginLeft: 180,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 100,
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      width: "100%",
      padding: 20,
    },
  },
  content: {
    width: 460,
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
    marginTop: 20,
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
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
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
    marginTop: 65,
  },
  btn_area: {
    marginTop: 66,
    display: "flex",
    marginLeft: 180,
    marginTop: 100,
    paddingBottom: 180,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
      justifyContent: "center",
    },
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
    width: 800,
    height: 670,
    borderRadius: 10,
    backgroundColor: "white",
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
  },
  dialog_title: {
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 36,
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
    marginLeft: 70,
    marginRight: 70,
  },
  information_area: {},
  title: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 20,
  },
  div_left: {
    width: "100%",
  },
  div_right: {
    width: "100%",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
    marginTop: 22,
  },
  div_profile: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  autocomplete: {
    "& .MuiAutocomplete-popper": {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 300,
      fontSize: 15,
    },
  },
  speciality_area: {
    width: "100%",
    marginTop: 25,
  },
  speciality_context: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
    marginTop: 7,
    justifyContent: "space-between",
  },
  div_check: {
    display: "flex",
    marginTop: 15,
    cursor: "pointer",
  },
  text_check: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.75)",
    marginLeft: 15,
  },
  profile_area: {
    marginTop: 70,
  },
  div_picture: {
    width: 240,
    height: 240,
    borderRadius: 120,
    marginTop: 50,
    boxShadow: "5px 8px 10px rgba(182, 172, 251, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  change_picture: {
    width: "fit-content",
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 14,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.75)",
    borderBottomColor: "rgba(0, 0, 0, 0.75)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    cursor: "pointer",
  },
  picture_area: {
    width: 240,
  },
  input_file: {
    display: "none",
  },
  user_image: {
    width: 240,
    height: 240,
    borderRadius: 120,
  },
  description_area: {
    width: "100%",
    marginTop: 45,
  },
  textarea: {
    width: "100%",
    height: 280,
    borderRadius: 9,
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 5,
    padding: 25,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    resize: "none",
    "&:focus": {
      outline: "none",
    },
  },
  price_title: {
    width: "100%",
    display: "flex",
    marginTop: 50,
  },
  price_label: {
    width: "70%",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 16,
  },
  price_price: {
    marginLeft: 35,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 10,
    },
    width: "30%",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 16,
  },
  div_btn: {
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 25,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 10,
    },
  },
  price_part: {
    display: "flex",
    marginTop: 20,
  },
  circle_btn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFD8BE",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  circle_btn_icon: {
    color: "white",
  },
  input_type_div: {
    width: "100%",
    height: 42,
    borderRadius: 21,
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  bowser_input_part: {
    width: "35%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    marginTop: 20,
  },
  text_browser: {
    width: 95,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    borderLeftColor: "rgba(0, 0, 0, 0.12)",
    borderLeftStyle: "solid",
    borderLeftWidth: 1,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.33)",
  },
  list_degeree: {
    display: "flex",
    marginTop: 20,
    alignItems: "center",
  },
  degree_name: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.75)",
    marginLeft: 15,
  },
  degree_remove: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.75)",
    marginLeft: 50,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    borderBottomStyle: "solid",
    cursor: "pointer",
  },
  degree_icon: {
    cursor: "pointer",
  },
  div_media: {
    width: "fit-content",
    display: "grid",
    justifyContent: "center",
    marginRight: 20,
  },
  media_remove: {
    width: "fit-content",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.75)",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    borderBottomStyle: "solid",
    cursor: "pointer",
  },
  media_file: {
    height: 280,
    [theme.breakpoints.down("xs")]: {
      height: 140,
    },
  },
  media_list: {
    width: "100%",
    display: "flex",
    overflowX: "auto",
    paddingBottom: 5,
  },
  div_events_area: {
    marginTop: 70,
    marginLeft: 180,
    marginRight: 180,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 100,
      marginRight: 100,
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      marginRight: 0,
      width: "100%",
      padding: 20,
    },
  },
  event_title: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    marginTop: 50,
  },
  event_title_small: {
    width: "100%",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      marginTop: 15,
    },
  },
  event_list: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
    marginTop: 20,
  },
  event_date: {
    width: "20%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 16,
  },
  event_address: {
    width: "30%",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    marginLeft: 30,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  event_description: {
    width: "40%",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    marginLeft: 30,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  event_price: {
    width: "10%",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    marginLeft: 30,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  hide_calendar: {
    display: "none",
  },
  show_calendar: {
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
    zIndex: 2,
    position: "absolute",
    marginTop: 50,
    "& .react-calendar__navigation__label": {
      textTransform: "capitalize",
    },
    "& .react-calendar__month-view__weekdays": {
      textTransform: "capitalize",
    },
    "& .react-calendar__year-view__months button": {
      textTransform: "capitalize",
    },
  },
  div_back_hide: {
    display: "none",
  },
  div_back_show: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    zIndex: 1,
  },
  div_btn_event: {
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 25,
    [theme.breakpoints.down("sm")]: {
      marginTop: 10,
      marginLeft: "auto",
    },
  },
  circle_btn_event: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFD8BE",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
}));

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
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProProfile = (props) => {
  const { history } = props;
  const classes = useStyles();

  const [toast, setToast] = React.useState({
    show: false,
    message: "",
    type: "success",
  });
  const [visibleIndicator, setVisibleIndicator] = React.useState(false);
  const [openPopupMenu, setOpenPopupMenu] = React.useState(false);
  const [profileValue, setProfileValue] = React.useState({
    email: "",
    lastname: "",
    firstname: "",
    address: "",
    phone_number: "",
    formation: "",
    website: "",
    facebook: "",
    linkedin: "",
    description: "",
    updateStatus: "",
    school: "",
  });
  const [special, setSpecial] = React.useState({
    domicile: false,
    child: false,
    pregnancy: false,
    individual: false,
    adult: false,
    sport: false,
    grp: false,
    teenager: false,
    enterprise: false,
  });

  const [openChangePassword, setOpenChangePassword] = React.useState(false);
  const [listAddress, setListAddress] = React.useState([]);
  const listFormation = [
    "Praticien",
    "Praticien spécialisé",
    "Psycho praticien",
  ];
  const [profileImage, setProfileImage] = React.useState(null);
  const [prices, setPrices] = React.useState([]);
  const [newPrice, setNewPrice] = React.useState({
    label: "",
    price: "",
  });
  const [degreeFiles, setDegreeFiles] = React.useState([]);
  const [removeDegreeFiles, setRemoveDegreeFiles] = React.useState([]);
  const [mediaFiles, setMediaFiles] = React.useState([]);
  const [removeMediaFiles, setRemoveMediaFiles] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [newEvent, setNewEvent] = React.useState({
    date: "",
    address: "",
    description: "",
    price: "",
  });
  const [listEventAddress, setListEventAddress] = React.useState([]);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState(new Date());

  let token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    if (!token || !user || !user.id) {
      history.push("/auth");
    }
    getProProfile(false);
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

  const handleChangeText = (event, type) => {
    if (type === "email") {
      setProfileValue({ ...profileValue, email: event.target.value });
    } else if (type === "password") {
      setProfileValue({ ...profileValue, password: event.target.value });
    } else if (type === "lastname") {
      setProfileValue({ ...profileValue, lastname: event.target.value });
    } else if (type === "firstname") {
      setProfileValue({ ...profileValue, firstname: event.target.value });
    } else if (type === "address") {
      searchLocation(event.target.value, "user");
      setProfileValue({ ...profileValue, address: event.target.value });
    } else if (type === "phone") {
      setProfileValue({ ...profileValue, phone_number: event.target.value });
    } else if (type === "formation") {
      setProfileValue({ ...profileValue, formation: "" });
    } else if (type === "website") {
      setProfileValue({ ...profileValue, website: event.target.value });
    } else if (type === "facebook") {
      setProfileValue({ ...profileValue, facebook: event.target.value });
    } else if (type === "linkedin") {
      setProfileValue({ ...profileValue, linkedin: event.target.value });
    } else if (type === "school") {
      setProfileValue({ ...profileValue, school: event.target.value });
    } else if (type === "description") {
      setProfileValue({ ...profileValue, description: event.target.value });
    }
  };

  const handleChangeEventAddress = (event) => {
    setNewEvent({ ...newEvent, address: event.target.value });
    searchLocation(event.target.value, "event");
  };

  const searchLocation = (searchKey, type) => {
    APIService.searchLocation(searchKey).then(
      (response) => {
        if (response.data.code !== 200) {
          setToast({
            message: response.data.message,
            type: "error",
            show: true,
          });
        } else {
          if (type === "user") {
            setListAddress(response.data.data.data.myAddresses.predictions);
          } else if (type === "event") {
            setListEventAddress(
              response.data.data.data.myAddresses.predictions
            );
          }
        }
      },
      (error) => {
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

  const handleSelectAutoComplete = (values, type) => {
    if (type === "user") {
      setProfileValue({ ...profileValue, address: values.description });
    } else if (type === "formation") {
      setProfileValue({ ...profileValue, formation: values });
    } else if (type === "event") {
      setNewEvent({ ...newEvent, address: values.description });
    }
  };

  const handleCheckboxChange = (inputname) => {
    switch (inputname) {
      case "domicile":
        setSpecial((special) => ({ ...special, domicile: !special.domicile }));
        break;
      case "child":
        setSpecial((special) => ({ ...special, child: !special.child }));
        break;
      case "pregnancy":
        setSpecial((special) => ({
          ...special,
          pregnancy: !special.pregnancy,
        }));
        break;
      case "individual":
        setSpecial((special) => ({
          ...special,
          individual: !special.individual,
        }));
        break;
      case "adult":
        setSpecial((special) => ({ ...special, adult: !special.adult }));
        break;
      case "sport":
        setSpecial((special) => ({ ...special, sport: !special.sport }));
        break;
      case "grp":
        setSpecial((special) => ({ ...special, grp: !special.grp }));
        break;
      case "teenager":
        setSpecial((special) => ({ ...special, teenager: !special.teenager }));
        break;
      case "enterprise":
        setSpecial((special) => ({
          ...special,
          enterprise: !special.enterprise,
        }));
        break;
    }
  };

  const handleOpenImage = (event, type) => {
    if (!event.target.files[0]) {
      return;
    }

    if (type === "user") {
      setProfileImage({ uri: event.target.files[0], new: true });
    } else if (type === "certificate") {
      let degree = [...degreeFiles];
      const newdata = {
        file_path: event.target.files[0].name,
        uri: event.target.files[0],
        new: true,
      };
      degree.push(newdata);
      setDegreeFiles(degree);
    } else if (type === "media") {
      let media = [...mediaFiles];
      const newdata = {
        file_path: event.target.files[0],
        name: event.target.files[0].name,
        new: true,
      };
      media.push(newdata);
      setMediaFiles(media);
    }
    event.target.value = null;
  };

  const handleRemovePrice = (index) => {
    let listPrice = [...prices];
    listPrice.splice(index, 1);
    setPrices(listPrice);
  };

  const handleAddPrice = () => {
    if (!newPrice.label) {
      setToast({
        message: "Veuillez saisir un titre pour votre tarif.",
        type: "info",
        show: true,
      });
      return;
    }
    if (!newPrice.price) {
      setToast({
        message: "Veuillez saisir un prix pour votre tarif",
        type: "info",
        show: true,
      });
      return;
    }

    let listPrice = [...prices];
    listPrice.push(newPrice);
    setPrices(listPrice);
    setNewPrice({ label: "", price: "" });
  };

  const handleRemoveDegree = (index) => {
    let listDegree = [...degreeFiles];
    if (!listDegree[index].new) {
      let newListDegree = [...removeDegreeFiles];
      newListDegree.push(listDegree[index]);
      setRemoveDegreeFiles(newListDegree);
    }
    listDegree.splice(index, 1);
    setDegreeFiles(listDegree);
  };

  const handleRemoveMedia = (index) => {
    let listMedias = [...mediaFiles];
    if (!listMedias[index].new) {
      let newListMedia = [...removeMediaFiles];
      newListMedia.push(listMedias[index]);
      setRemoveMediaFiles(newListMedia);
    }
    listMedias.splice(index, 1);
    setMediaFiles(listMedias);
  };

  const handleAddEvent = () => {
    if (!newEvent.date) {
      setToast({
        message: "Veuillez saisir la date de l'evenement.",
        type: "info",
        show: true,
      });
      return;
    }
    if (!newEvent.description) {
      setToast({
        message: "Veuillez saisir la description de l'evenement.",
        type: "info",
        show: true,
      });
      return;
    }
    if (!newEvent.price) {
      setToast({
        message: "Veuillez saisir le prix de l'evenement.",
        type: "info",
        show: true,
      });
      return;
    }

    let listEvent = [...events];
    listEvent.push(newEvent);
    setEvents(listEvent);
    setNewEvent({
      date: "",
      address: "",
      description: "",
      price: "",
    });
  };

  const handleRemoveEvent = (index) => {
    const listEvent = [...events];
    listEvent.splice(index, 1);
    setEvents(listEvent);
  };

  const handleChangeCalendar = (value) => {
    setNewEvent({
      ...newEvent,
      date:
        value.getDate() +
        "/" +
        (value.getMonth() + 1) +
        "/" +
        value.getFullYear(),
    });
  };

  const getCustomDateString = (string) => {
    if (!string) {
      return;
    }
    let list_string = string.split("/");
    let date;
    if (list_string.length > 1) {
      let new_string =
        list_string[1] + "/" + list_string[0] + "/" + list_string[2];
      date = new Date(new_string);
    } else {
      date = new Date(string);
    }
    let dateString = date.getDate();
    let monthString = date.getMonth() + 1;
    let yearString = date.getFullYear();

    return `${dateString}/${monthString}/${yearString}`;
  };

  const getProProfile = (isUpdated) => {
    setVisibleIndicator(true);
    APIService.getProProfile(user.id).then(
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
          if (isUpdated) {
            setToast({
              message:
                "Votre demande de mofidication de profil a ete prise en compte.",
              type: "success",
              show: true,
            });
          }

          const user_info = response.data.data.data;

          const profile_data = {
            firstname: user_info.first_name ? user_info.first_name : "",
            lastname: user_info.last_name ? user_info.last_name : "",
            email: user_info.email ? user_info.email : "",
            address: user_info.address ? user_info.address : "",
            phone_number: user_info.phone_number ? user_info.phone_number : "",
            formation: user_info.formation ? user_info.formation : "",
            website: user_info.website ? user_info.website : "",
            linkedin: user_info.linkedin ? user_info.linkedin : "",
            facebook: user_info.facebook ? user_info.facebook : "",
            description: user_info.description ? user_info.description : "",
            updateStatus: user_info.update_status
              ? user_info.update_status
              : "",
            school: user_info.school ? user_info.school : "",
          };

          let special_data = {
            domicile: false,
            child: false,
            pregnancy: false,
            individual: false,
            adult: false,
            sport: false,
            grp: false,
            teenager: false,
            enterprise: false,
          };

          if (user_info?.specialities.length > 0) {
            special_data = {
              domicile: user_info?.specialities[0].domicile.data[0],
              child: user_info?.specialities[0].children.data[0],
              pregnancy: user_info?.specialities[0].pregnancy.data[0],
              individual: user_info?.specialities[0].individual.data[0],
              adult: user_info?.specialities[0].adult.data[0],
              sport: user_info?.specialities[0].sport.data[0],
              grp: user_info?.specialities[0].grp.data[0],
              teenager: user_info?.specialities[0].teenager.data[0],
              enterprise: user_info?.specialities[0].enterprise.data[0],
            };
          }

          const media_data = [];
          user_info.medias.map((item, index) => {
            item.file_path = PRO_URL + "/public/professional/" + item.file_path;
            item.new = false;
            media_data.push(item);
          });

          const certificate_data = [];
          user_info.degree_file.map((item, index) => {
            item.uri = PRO_URL + "/public/professional/" + item.file_path;
            item.new = false;
            certificate_data.push(item);
          });

          if (user_info.profile_picture) {
            setProfileImage({
              uri:
                PRO_URL + "/public/professional/" + user_info.profile_picture,
              new: false,
            });
          }

          setProfileValue(profile_data);
          setSpecial(special_data);
          setPrices(user_info.prices);
          setEvents(user_info.events);
          setMediaFiles(media_data);
          setDegreeFiles(certificate_data);
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
    if (!profileValue.address) {
      setToast({
        message: "Veuillez saisir l'adresse.",
        type: "info",
        show: true,
      });
      return;
    }
    if (!profileValue.phone_number) {
      setToast({
        message: "Veuillez saisir le numero de telephone.",
        type: "info",
        show: true,
      });
      return;
    }

    let list_special = {};

    list_special.domicile = special.domicile ? 1 : 0;
    list_special.children = special.child ? 1 : 0;
    list_special.pregnancy = special.pregnancy ? 1 : 0;
    list_special.individual = special.individual ? 1 : 0;
    list_special.adult = special.adult ? 1 : 0;
    list_special.sport = special.sport ? 1 : 0;
    list_special.grp = special.grp ? 1 : 0;
    list_special.teenager = special.teenager ? 1 : 0;
    list_special.enterprise = special.enterprise ? 1 : 0;

    let list_events = [...events];
    let new_event = [];

    for (var i = 0; i < list_events.length; i++) {
      var element = list_events[i];
      var list_string = element.date.split("/");
      var new_date = null;
      if (list_string.length > 1) {
        new_date =
          list_string[2] +
          "-" +
          list_string[1] +
          "-" +
          list_string[0] +
          " 00:00:00";
      } else {
        new_date = element.date;
      }

      element.date = new_date;
      new_event.push(element);
    }

    const update_info = new FormData();
    update_info.append("id", user.id);
    update_info.append("first_name", profileValue.firstname);
    update_info.append("last_name", profileValue.lastname);
    update_info.append("email", profileValue.email);
    update_info.append("address", profileValue.address);
    update_info.append("phone_number", profileValue.phone_number);
    update_info.append("formation", profileValue.formation);
    update_info.append("website", profileValue.website);
    update_info.append("linkedin", profileValue.linkedin);
    update_info.append("facebook", profileValue.facebook);
    update_info.append("description", profileValue.description);
    update_info.append("school", profileValue.school);
    update_info.append("speciality", JSON.stringify(list_special));
    update_info.append("prices", JSON.stringify(prices));
    update_info.append("events", JSON.stringify(new_event));
    update_info.append("remove_media_files", JSON.stringify(removeMediaFiles));
    update_info.append(
      "remove_degree_files",
      JSON.stringify(removeDegreeFiles)
    );

    if (profileImage && profileImage.new) {
      update_info.append("profile_picture", profileImage.uri);
    } else {
      update_info.append("profile_picture", null);
    }

    for (var i = 0; i < mediaFiles.length; i++) {
      if (mediaFiles[i].new) {
        update_info.append("media_files", mediaFiles[i].file_path);
      }
    }

    for (var i = 0; i < degreeFiles.length; i++) {
      if (degreeFiles[i].new) {
        update_info.append("degree_files", degreeFiles[i].uri);
      }
    }

    setVisibleIndicator(true);
    APIService.requestUpdateprofessional(update_info).then(
      (response) => {
        if (response.data.code !== 200) {
          setVisibleIndicator(false);
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
          // user.email = profileValue.email;
          // localStorage.setItem('user', JSON.stringify(user));

          getProProfile(true);

          setRemoveDegreeFiles([]);
          setRemoveMediaFiles([]);
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
      <div
        className={showCalendar ? classes.div_back_show : classes.div_back_hide}
        onClick={() => {
          setShowCalendar(false);
        }}
      />
      <div className={classes.header}>
        <div className={classes.header_title}>Mon Profil</div>
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
          <div
            className={classes.menu_item}
            onClick={() => handleClickMenu("proprofile")}
          >
            Mon profil
          </div>
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
        <div className={classes.information_area}>
          <div className={classes.title}>Informations</div>
          <div className={classes.div_profile}>
            <div className={classes.div_left}>
              <div className={classes.div_input_part}>
                <div className={classes.text_description}>
                  état de mise à jour
                </div>
                <input
                  className={classes.input}
                  disabled={true}
                  value={profileValue.updateStatus}
                />
              </div>
              <div className={classes.div_name}>
                <div className={classes.div_input_part}>
                  <div className={classes.text_description}>Prénom *</div>
                  <input
                    className={classes.input}
                    value={profileValue.firstname}
                    onChange={(event) => handleChangeText(event, "firstname")}
                  />
                </div>
                <div className={classes.div_input_part_lastname}>
                  <div className={classes.text_description}>Nom *</div>
                  <input
                    className={classes.input}
                    value={profileValue.lastname}
                    onChange={(event) => handleChangeText(event, "lastname")}
                  />
                </div>
              </div>
              <div className={classes.div_input_part}>
                <div className={classes.text_description}>Email *</div>
                <input
                  className={classes.input}
                  value={profileValue.email}
                  onChange={(event) => handleChangeText(event, "email")}
                />
              </div>
              <div className={classes.div_input_part}>
                <div className={classes.text_description}>Adresse *</div>
                <Autocomplete
                  id="combo-box-demo"
                  className={classes.autocomplete}
                  options={listAddress}
                  getOptionLabel={(option) => option.description}
                  onChange={(event, values) =>
                    handleSelectAutoComplete(values, "user")
                  }
                  renderInput={(params) => (
                    <div
                      ref={params.InputProps.ref}
                      className={classes.autocomplete}
                    >
                      <input
                        {...params.inputProps}
                        className={classes.input}
                        value={profileValue.address}
                        onChange={(event) => handleChangeText(event, "address")}
                      />
                    </div>
                  )}
                />
              </div>
              <div className={classes.div_input_part}>
                <div className={classes.text_description}>Téléphone *</div>
                <input
                  className={classes.input}
                  value={profileValue.phone_number}
                  onChange={(event) => handleChangeText(event, "phone")}
                />
              </div>
              <div className={classes.div_input_part}>
                <div className={classes.text_description}>Formation</div>
                <Autocomplete
                  id="combo-box-demo"
                  className={classes.autocomplete}
                  options={listFormation}
                  getOptionLabel={(option) => option}
                  onChange={(event, values) =>
                    handleSelectAutoComplete(values, "formation")
                  }
                  renderInput={(params) => (
                    <div
                      ref={params.InputProps.ref}
                      className={classes.autocomplete}
                    >
                      <input
                        {...params.inputProps}
                        className={classes.input}
                        value={profileValue.formation}
                        onChange={(event) =>
                          handleChangeText(event, "formation")
                        }
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <div className={classes.div_right}>
              <div className={classes.div_input_part}>
                <div className={classes.text_description}>Site web</div>
                <input
                  className={classes.input}
                  value={profileValue.website}
                  onChange={(event) => handleChangeText(event, "website")}
                />
              </div>
              <div className={classes.div_input_part}>
                <div className={classes.text_description}>Linkedin</div>
                <input
                  className={classes.input}
                  value={profileValue.linkedin}
                  onChange={(event) => handleChangeText(event, "linkedin")}
                />
              </div>
              <div className={classes.div_input_part}>
                <div className={classes.text_description}>Facebook</div>
                <input
                  className={classes.input}
                  value={profileValue.facebook}
                  onChange={(event) => handleChangeText(event, "facebook")}
                />
              </div>
              <div className={classes.speciality_area}>
                <div className={classes.text_description}>Spécialités</div>
                <div className={classes.speciality_context}>
                  <div>
                    <div
                      className={classes.div_check}
                      onClick={() => handleCheckboxChange("domicile")}
                    >
                      <CustomCheckBox checked={special.domicile} />
                      <div className={classes.text_check}>Domicile</div>
                    </div>
                    <div
                      className={classes.div_check}
                      onClick={() => handleCheckboxChange("child")}
                    >
                      <CustomCheckBox checked={special.child} />
                      <div className={classes.text_check}>Enfant</div>
                    </div>
                    <div
                      className={classes.div_check}
                      onClick={() => handleCheckboxChange("pregnancy")}
                    >
                      <CustomCheckBox checked={special.pregnancy} />
                      <div className={classes.text_check}>Grossesse</div>
                    </div>
                  </div>
                  <div>
                    <div
                      className={classes.div_check}
                      onClick={() => handleCheckboxChange("individual")}
                    >
                      <CustomCheckBox checked={special.individual} />
                      <div className={classes.text_check}>Individuel</div>
                    </div>
                    <div
                      className={classes.div_check}
                      onClick={() => handleCheckboxChange("adult")}
                    >
                      <CustomCheckBox checked={special.adult} />
                      <div className={classes.text_check}>Adulte</div>
                    </div>
                    <div
                      className={classes.div_check}
                      onClick={() => handleCheckboxChange("sport")}
                    >
                      <CustomCheckBox checked={special.sport} />
                      <div className={classes.text_check}>Sportif</div>
                    </div>
                  </div>
                  <div>
                    <div
                      className={classes.div_check}
                      onClick={() => handleCheckboxChange("grp")}
                    >
                      <CustomCheckBox checked={special.grp} />
                      <div className={classes.text_check}>Groupe</div>
                    </div>
                    <div
                      className={classes.div_check}
                      onClick={() => handleCheckboxChange("teenager")}
                    >
                      <CustomCheckBox checked={special.teenager} />
                      <div className={classes.text_check}>Adolescent</div>
                    </div>
                    <div
                      className={classes.div_check}
                      onClick={() => handleCheckboxChange("enterprise")}
                    >
                      <CustomCheckBox checked={special.enterprise} />
                      <div className={classes.text_check}>Entreprise</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.profile_area}>
          <div className={classes.title}>Profil</div>
          <div className={classes.picture_area}>
            <div className={classes.div_picture}>
              {profileImage ? (
                <img
                  src={
                    profileImage.new
                      ? URL.createObjectURL(profileImage.uri)
                      : profileImage.uri
                  }
                  className={classes.user_image}
                />
              ) : (
                <img src="/images/user_large.png" />
              )}
            </div>
            <input
              className={classes.input_file}
              type="file"
              id="profile_img"
              onChange={(event) => handleOpenImage(event, "user")}
              accept="image/*"
            />
            <label htmlFor="profile_img">
              <div className={classes.change_picture}>Modifier</div>
            </label>
          </div>
          <div className={classes.description_area}>
            <div className={classes.text_description}>Description</div>
            <textarea
              className={classes.textarea}
              value={profileValue.description}
              onChange={(event) => handleChangeText(event, "description")}
            />
          </div>
        </div>
        <div className={classes.profile_area}>
          <div className={classes.title}>Tarifs</div>
          <div className={classes.price_title}>
            <div className={classes.price_label}>Intitulé *</div>
            <div className={classes.price_price}>Prix (€) *</div>
            <div className={classes.div_btn} />
          </div>
          {prices &&
            prices.map((item, index) => (
              <div key={`pricess-${index}`} className={classes.price_part}>
                <div className={classes.price_label}>
                  <input
                    className={classes.input}
                    readOnly
                    value={item.label}
                  />
                </div>
                <div className={classes.price_price}>
                  <input
                    className={classes.input}
                    readOnly
                    value={item.price}
                  />
                </div>
                <div className={classes.div_btn}>
                  <div className={classes.circle_btn}>
                    <RemoveIcon
                      className={classes.circle_btn_icon}
                      onClick={() => handleRemovePrice(index)}
                    />
                  </div>
                </div>
              </div>
            ))}
          <div className={classes.price_part}>
            <div className={classes.price_label}>
              <input
                className={classes.input}
                value={newPrice.label}
                onChange={(event) => {
                  setNewPrice({ ...newPrice, label: event.target.value });
                }}
              />
            </div>
            <div className={classes.price_price}>
              <input
                type="number"
                className={classes.input}
                value={newPrice.price}
                onChange={(event) => {
                  setNewPrice({ ...newPrice, price: event.target.value });
                }}
              />
            </div>
            <div className={classes.div_btn}>
              <div className={classes.circle_btn} onClick={handleAddPrice}>
                <AddIcon className={classes.circle_btn_icon} />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.profile_area}>
          <div className={classes.title}>Diplômes</div>
          {degreeFiles &&
            degreeFiles.map((item, index) => (
              <div key={`degree-${index}`} className={classes.list_degeree}>
                <img
                  src="/images/document.png"
                  className={classes.degree_icon}
                  onClick={() => {
                    window.open(
                      item.new ? URL.createObjectURL(item.uri) : item.uri
                    );
                  }}
                />
                <div className={classes.degree_name}>{item.file_path}</div>
                <div
                  className={classes.degree_remove}
                  onClick={() => handleRemoveDegree(index)}
                >
                  Supprimer
                </div>
              </div>
            ))}
          <div className={classes.bowser_input_part}>
            <div className={classes.text_description}>Ajouter</div>
            <input
              className={classes.input_file}
              type="file"
              id="certificate"
              onChange={(event) => handleOpenImage(event, "certificate")}
              accept="image/*,.pdf"
            />
            <label htmlFor="certificate">
              <div className={classes.input_type_div}>
                <div className={classes.text_browser}>Parcourir</div>
              </div>
            </label>
          </div>
          <div className={classes.bowser_input_part}>
            <div className={classes.text_description}>Ecole</div>
            <input
              className={classes.input}
              value={profileValue.school}
              onChange={(event) => handleChangeText(event, "school")}
            />
          </div>
        </div>
      </div>
      <div className={classes.div_events_area}>
        <div className={classes.title}>Médias</div>
        <div className={classes.div_input_part}>
          <div className={classes.media_list}>
            {mediaFiles.map((item, index) => (
              <div key={`media-${index}`} className={classes.div_media}>
                <img
                  src={
                    item.new
                      ? URL.createObjectURL(item.file_path)
                      : item.file_path
                  }
                  className={classes.media_file}
                />
                <div
                  className={classes.media_remove}
                  onClick={() => handleRemoveMedia(index)}
                >
                  Supprimer
                </div>
              </div>
            ))}
          </div>
          <div className={classes.text_description}>
            Ajouter une photo ou une vidéo
          </div>
          <input
            className={classes.input_file}
            type="file"
            id="media_file"
            onChange={(event) => handleOpenImage(event, "media")}
            accept="image/*,video/*"
          />
          <div className={classes.bowser_input_part}>
            <label htmlFor="media_file">
              <div className={classes.input_type_div}>
                <div className={classes.text_browser}>Parcourir</div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className={classes.div_events_area}>
        <div className={classes.title}>Events</div>
        <div className={classes.event_title}>
          <div className={classes.event_date}>Date *</div>
          <div className={classes.event_address}>Adresse *</div>
          <div className={classes.event_description}>Description *</div>
          <div className={classes.event_price}>Prix (€) *</div>
          <div className={classes.div_btn} />
        </div>
        {events.map((item, index) => (
          <div key={`event-${index}`} className={classes.event_list}>
            <div className={classes.event_date}>
              <div className={classes.event_title_small}>Date *</div>
              <input
                className={classes.input}
                readOnly
                value={getCustomDateString(item.date)}
              />
            </div>
            <div className={classes.event_address}>
              <div className={classes.event_title_small}>Adresse *</div>
              <input className={classes.input} readOnly value={item.address} />
            </div>
            <div className={classes.event_description}>
              <div className={classes.event_title_small}>Description *</div>
              <input
                className={classes.input}
                readOnly
                value={item.description}
              />
            </div>
            <div className={classes.event_price}>
              <div className={classes.event_title_small}>Prix (€) *</div>
              <input className={classes.input} readOnly value={item.price} />
            </div>
            <div className={classes.div_btn_event}>
              <div className={classes.circle_btn_event}>
                <RemoveIcon
                  className={classes.circle_btn_icon}
                  onClick={() => handleRemoveEvent(index)}
                />
              </div>
            </div>
          </div>
        ))}
        <div className={classes.event_list}>
          <div className={classes.event_date}>
            <div className={classes.event_title_small}>Date *</div>
            <Calendar
              className={
                showCalendar ? classes.show_calendar : classes.hide_calendar
              }
              onChange={handleChangeCalendar}
              value={selectedData}
              calendarType="US"
              locale="fr"
            />
            <input
              className={classes.input}
              readOnly
              value={newEvent.date}
              onFocus={() => {
                setShowCalendar(true);
              }}
            />
          </div>
          <div className={classes.event_address}>
            <div className={classes.event_title_small}>Adresse *</div>
            <Autocomplete
              id="combo-box-demo"
              className={classes.autocomplete}
              options={listEventAddress}
              getOptionLabel={(option) => option.description}
              onChange={(event, values) =>
                handleSelectAutoComplete(values, "event")
              }
              renderInput={(params) => (
                <div
                  ref={params.InputProps.ref}
                  className={classes.autocomplete}
                >
                  <input
                    {...params.inputProps}
                    className={classes.input}
                    value={newEvent.address}
                    onChange={handleChangeEventAddress}
                  />
                </div>
              )}
            />
          </div>
          <div className={classes.event_description}>
            <div className={classes.event_title_small}>Description *</div>
            <input
              className={classes.input}
              value={newEvent.description}
              onChange={(event) => {
                setNewEvent({ ...newEvent, description: event.target.value });
              }}
            />
          </div>
          <div className={classes.event_price}>
            <div className={classes.event_title_small}>Prix (€) *</div>
            <input
              type="number"
              className={classes.input}
              value={newEvent.price}
              onChange={(event) => {
                setNewEvent({ ...newEvent, price: event.target.value });
              }}
            />
          </div>
          <div className={classes.div_btn_event}>
            <div className={classes.circle_btn_event} onClick={handleAddEvent}>
              <AddIcon className={classes.circle_btn_icon} />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.btn_area}>
        <div className={classes.btn} onClick={handleClickUpdate}>
          Enregistrer
        </div>
      </div>
    </div>
  );
};

ProProfile.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ProProfile);
