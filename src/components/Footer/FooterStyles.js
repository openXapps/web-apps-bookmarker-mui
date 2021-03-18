import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footerBar: {
    top: 'auto',
    bottom: 0,
    // backgroundColor: theme.palette.grey[400],
  },
  toolboxPadding: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    // [theme.breakpoints.down('xs')]: {
    //   paddingLeft: theme.spacing(0),
    //   paddingRight: theme.spacing(0),
    // },
  },
}));

export default useStyles;