import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    display:'flex',
    justifyContent: 'space-around',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));