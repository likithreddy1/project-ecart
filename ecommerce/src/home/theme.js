import { createTheme } from "@material-ui/core";
import {grey } from "@material-ui/core/colors";

const theme =createTheme({
    palette:{
        primary:{
            main:grey[500]
        }
    },
    
    myNav:{
        backgroundColor:'#1B224A',
        color:'white',
        fontFamily: 'Rosarivo',
        display:'flex',
        justifyContent:'space-between'
    },
    mybutton:{
        backgroundColor:'#C7DFC1',
        color:'#1B224A',
        margin:'10px',
        textAlign:'center',
        border:'none'
    },
    textarea:{
        marginTop:'10px',
        marginBottom:'10px',
        width:'300px',
        padding:'1vh',
        outline:'none',
        fontSize:'2.5vh'

    }
})
export default theme