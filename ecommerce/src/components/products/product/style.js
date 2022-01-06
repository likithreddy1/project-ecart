import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    maxWidth: "100%", 

  },
  cardbackground: {
    backgroundColor: "#C7DFC1",
  },
  media: {
    height: 0,
    width:'47vh',
    paddingTop: '76.25%', // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  AddShoppingCart:{
    padding: theme.spacing(0.5, 2),
    backgroundColor:'#1B224A',
    borderRadius:theme.shape.borderRadius
  }
}));
