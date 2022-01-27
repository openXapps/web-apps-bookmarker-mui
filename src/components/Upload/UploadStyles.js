import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  hGutter: {
    marginTop: theme.spacing(2),
  },
  validator: {
    display: 'flex',
    alignItems: 'center'
  },
  grow: {
    flexGrow: 1,
  },
}));