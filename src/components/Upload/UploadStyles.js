export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  hGutter: {
    marginTop: theme.spacing(2),
  },
  vGutter: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0),
    },
  },
  validator: {
    display: 'flex',
    alignItems: 'center'
  },
  grow: {
    flexGrow: 1,
  },
}));