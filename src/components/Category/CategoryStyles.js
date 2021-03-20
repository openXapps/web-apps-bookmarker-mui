import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  hGutter: {
    marginTop: theme.spacing(2),
  },
  vGutter: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0),
    },
  },
}));

export default useStyles;