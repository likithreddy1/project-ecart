import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Card, makeStyles, CardContent, Typography } from "@material-ui/core";
import { auth } from "../firebase";
import theme from "./theme";
import Products from "../components/products/products";
const useStyles = makeStyles((theme) => ({
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
  text: {
    fontFamily: "Rosarivo",
    fontSize: "50px",
    padding: theme.spacing(3),
    color: "#1B224A",
  },
  text1: {
    fontFamily: "Rosarivo",
    fontSize: "20px",
    padding: theme.spacing(1),
    color: "#1B224A",
    textAlign: "center",
  },
  root: {
    maxWidth: 445,
    textAlign: "center",
  },
}));
export default function Login(props) {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setLoginEmail] = useState("");
  const [password, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const user = await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/product";
    } catch {
      setError("Failed to create an account");
    }
  }
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  return (
    <div style={{ backgroundColor: "#C7DFC1", height: "90vh" }}>
      <Typography variant="h1" className={classes.text}>
        Buy and Ship to Anywhere in the World
      </Typography>
      <Card
        className={classes.root}
        style={{ marginLeft: "120px", marginTop: "10px" }}
      >
        <CardContent>
          <form className={classes.root} onSubmit={handleSubmit}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ textAlign: "center", fontFamily: "Rosarivo" }}
            >
              Login
            </Typography>
            <input
              required
              placeholder="Email Address"
              className={classes.textarea}
              type="text"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
            <br />
            <input
              required
              placeholder="Password"
              className={classes.textarea}
              type="password"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
            <br />
            <button
              type="submit"
              className={classes.button}
              style={{ width: "150px", padding: "1vh" }}
            >
              Log In
            </button>
          </form>
        </CardContent>
      </Card>
      <Typography
        className={classes.text1}
        onClick={() => props.changelog(false)}
        style={{ cursor: "pointer" }}
      >
        Do not have an account? Sign Up.
      </Typography>
      <Typography
        onClick={forgotPassword}
        className={classes.text1}
        style={{ cursor: "pointer" }}
      >
      </Typography>
    </div>
  );
}
