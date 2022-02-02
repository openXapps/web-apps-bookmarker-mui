import { makeStyles } from '@mui/styles';

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
  searchField: {
    flexGrow: 1,
  },
  favIcon: {
    marginRight: theme.spacing(1),
  },
}));