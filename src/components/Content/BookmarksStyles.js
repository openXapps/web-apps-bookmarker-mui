import { darken, lighten, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // marginLeft: theme.spacing(2),
    // marginTop: theme.spacing(1),
    // [theme.breakpoints.up('md')]: {
    //   marginLeft: theme.spacing(0),
    // },
    // [theme.breakpoints.down('xs')]: {
    //   marginLeft: theme.spacing(0.5),
    // },
  },
  bookmarkContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
  },
  bookmarkText: {
    paddingLeft: theme.spacing(1),
  },
  favIcon: {
    color: lighten(theme.palette.primary.main, 0.5),
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));