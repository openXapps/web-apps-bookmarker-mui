import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginLeft: theme.spacing(2),
    // marginTop: theme.spacing(1),
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(0),
    },
  },
  bookmarkContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    // marginLeft: theme.spacing(1),
  },
  bookmarkText: {
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
  },
}));