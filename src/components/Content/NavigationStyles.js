import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    // width: 200,
    // marginLeft: theme.spacing(2),
    // marginTop: theme.spacing(1),
    // [theme.breakpoints.up('md')]: {
    //   marginLeft: theme.spacing(0),
    // },
    // [theme.breakpoints.down('xs')]: {
    //   marginLeft: theme.spacing(0.5),
    // },
  },
  searchContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
  },
  searchField: {
    flexGrow: 1,
  },
  searchButton: {
    // padding: 10,
  },
  listItemText: {
    paddingLeft: theme.spacing(1),
  },
}));