import React,{useState} from 'react'
import { Grid } from "@material-ui/core";
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
export default function HomeApp({user}) {
    const [log, setlog] = useState(false);
    function hangleLog() {
        setlog((prev) => !prev);
      }
    return (
        <>
              <Navbar changelog={setlog} />
        <Grid
          container
          direction="row"
          justifyContent="center"
        >
          <Grid item sm={6}>
            <Home />
          </Grid>
          <Grid item sm={6}>
          {log?<Login user={user} changelog={setlog}/>:<Signup  user={user} changelog={setlog}/>} 
          </Grid>
        </Grid>
        </>
    )
}
