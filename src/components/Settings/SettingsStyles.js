import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
  },
  hGutter: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: theme.spacing(3),
    padding: theme.spacing(2)
  },
}));