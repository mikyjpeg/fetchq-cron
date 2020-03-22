import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SecretAlert from '../containers/SecretAlert';
import Logo from '../components/Logo';

const useStyles = makeStyles(theme => ({
  logo: {
    marginRight: theme.spacing(1),
  },
  content: {
    margin: theme.spacing(3),
  },
}));

const AppLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Logo className={classes.logo} />
          <Typography>Fetchq CRON</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>{children}</div>
      <SecretAlert />
    </>
  );
};

export default AppLayout;
