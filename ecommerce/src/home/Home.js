import { Typography, makeStyles, Button } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  text: {
    fontFamily: "Rosarivo",
    fontSize: "50px",
    padding: theme.spacing(3),
  },
  button: {
    backgroundColor: "#C7DFC1",
    color: "#1B224A ",
    margin: theme.spacing(3),
    padding: "8px",
    width: 150,
  },
}));
function Home() {
  const [view, setview] = useState(false);
  const classes = useStyles();
  return (
    <div
      style={{ backgroundColor: "#1b224a", height: "90vh" }}
      className={classes.toolbar}
    >
      <Typography
        variant="h1"
        container="h5"
        style={{ color: "#c7dfc1", paddingTop: "150px" }}
        className={classes.text}
      >
        Welcome to E-commerce Page
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setview(true);
        }}
        className={classes.button}
      >
        Read more
      </Button>
      {view && (
        <div  style={{
            color: "white",
            fontSize: "3vh",
            marginLeft: "1vh",
            marginTop: "0",
          }}>
          <span style={{lineHeight:'4vh'}} >
            This is a brand new Ecommerce website with great user experience.
            Here you can find the products related to computers,home
            appliances,books etc.... . If you are not a member SIGNUP and enjoy our services.
          </span>
          <span
            onClick={() => {
              setview(false);
            }}
            style={{cursor:'pointer',color:'red'}}
          >
            Read less
          </span>
        </div>
      )}
    </div>
  );
}

export default Home;
