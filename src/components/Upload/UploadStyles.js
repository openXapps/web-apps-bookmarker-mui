import { makeStyles } from '@material-ui/styles';

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