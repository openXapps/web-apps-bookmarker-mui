import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  bookmarkContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  bookmarkText: {
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
  },
  searchContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
  },
  searchField: {
    flexGrow: 1,
  },
  searchButton: {
    paddingRight: theme.spacing(2),
  },
}));