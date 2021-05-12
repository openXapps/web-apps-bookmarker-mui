import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  fieldContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: theme.spacing(3),
    padding: theme.spacing(2)
  },
}));