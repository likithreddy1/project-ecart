import React from "react";
import { Button, Container, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Card,
  CardActionArea,
  CardMedia,
  makeStyles,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  button: { ...theme.mybutton },
  nav: { ...theme.myNav },
  small: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  large: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  textarea: {
    ...theme.textarea,
  },
}));
export default function Navbar(props) {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.nav}>
          <Typography variant="h6" className={classes.small}>
            E-CART
          </Typography>
          <Typography variant="h6" className={classes.large}>
            E-CART
          </Typography>
          <div>
            <Button
              onClick={()=>props.changelog(true)}
              variant="contained"
              color="success"
              className={classes.button}
            >
              Log in
            </Button>
            <Button
              onClick={()=>props.changelog(false)}
              variant="contained"
              color="success"
              className={classes.button}
            >
              Sign up
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
