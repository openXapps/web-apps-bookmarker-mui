import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  fieldContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: false,
    // marginTop: theme.spacing(3),
    padding: theme.spacing(2)
  },
}));