import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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