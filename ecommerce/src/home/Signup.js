import React,{useState} from "react";
import {createUserWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
import {
  Card,
  makeStyles,
  CardContent,
  Typography,
} from "@material-ui/core";
import {auth} from '../firebase'
import theme from "./theme";
const useStyles = makeStyles((theme) => ({
  button: { ...theme.mybutton },
  nav: { ...theme.myNav },
  small: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
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
    textAlign:'center'
  },
  root: {
    maxWidth: 445,
    textAlign: "center",
  },
}));
export default function Signup(props) {
  const classes = useStyles();
const[error,setError]=useState('');
const[loading,setLoading]=useState(false);
const [email,setRegisterEmail]=useState('');
const [password,setRegisterPassword]=useState('');
const [confirmPassword,setCofirmRegisterPassword]=useState('');

const [user, setUser] = useState({});

onAuthStateChanged(auth, (currentUser) => {
  setUser(currentUser);
});

async function handleSubmit(e) {
  e.preventDefault()
  if (password!== confirmPassword) {
    return setError("Passwords do not match")
  }
  try {
    setError("")
    setLoading(true)
   const user= await createUserWithEmailAndPassword(
     auth,
     email,
     password
   )
   window.location.href ='/product'
  } catch {
    setError("Failed to create an account")
  }

  setLoading(false)
}
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
          <form onSubmit={handleSubmit} className={classes.root}>
          <Typography>{error}</Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ textAlign: "center", fontFamily: "Rosarivo" }}
            >
              New User 
            </Typography>
            <input required placeholder="Email Address" className={classes.textarea} type='text' onChange={(event)=>{setRegisterEmail(event.target.value)}}/><br/>
            <input required placeholder="Password"  className={classes.textarea} type='password'  onChange={(event)=>{setRegisterPassword(event.target.value)}}/>
            <br />
            <input required placeholder="Confirm Password"  className={classes.textarea} type='password'  onChange={(event)=>{setCofirmRegisterPassword(event.target.value)}}/>
            <br />
            <button
            disabled={loading}
              type="submit"
              className={classes.button}
              style={{width: "150px",padding:'1vh'}}
            >Sign Up</button>
          </form>
          
        </CardContent>
      </Card>
      <Typography className={classes.text1}  onClick={()=>props.changelog(true)} style={{cursor:'pointer'}}>
              Already have an account? Log In
          </Typography>
    </div>
  );
}
