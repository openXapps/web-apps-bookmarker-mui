import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  // createMuiTheme,
  // Fixes forward Ref issue
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

// App assets
import { context } from './context/StoreProvider';
import dark from './themes/dark';
import light from './themes/light';

// App components
import HeaderComponent from './components/Header/HeaderComponent';
import ContentComponent from './components/Content/ContentComponent';
import EditorComponent from './components/Editor/EditorComponent';
import DeleteComponent from './components/Delete/DeleteComponent';
import DownloadComponent from './components/Download/DownloadComponent';
import UploadComponent from './components/Upload/UploadComponent';
import SettingsComponent from './components/Settings/SettingsComponent';
import Error404Component from './components/Error/Error404Component';

// App container styling
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
}));

const App = () => {
  // https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1
  // const root = '/apps/bookmarker';
  const root = '/';
  const [state] = React.useContext(context);
  const appTheme = createMuiTheme(state.theme.isDark ? dark : light);
  const classes = useStyles();

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter basename={root}>
        <Container className={classes.root} maxWidth="md" disableGutters={true}>
          <HeaderComponent home={root} />
          <Switch>
            <Route path="/" exact component={ContentComponent} />
            <Route path="/filter/:id" component={ContentComponent} />
            <Route path="/edit/:id" component={EditorComponent} />
            <Route path="/copy/:id" component={EditorComponent} />
            <Route path="/new" component={EditorComponent} />
            <Route path="/delete/:id" component={DeleteComponent} />
            <Route path="/download" component={DownloadComponent} />
            <Route path="/upload" component={UploadComponent} />
            <Route path="/settings" component={SettingsComponent} />
            <Route component={Error404Component} />
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

/*
<Route path="/" exact     ><ContentComponent /></Route>
<Route path="/filter/:id" ><ContentComponent /></Route>
<Route path="/edit/:id"   ><EditorComponent /></Route>
<Route path="/copy/:id"   ><EditorComponent /></Route>
<Route path="/new"        ><EditorComponent /></Route>
<Route path="/delete/:id" ><DeleteComponent /></Route>
<Route path="/download"   ><DownloadComponent /></Route>
<Route path="/upload"     ><UploadComponent /></Route>
<Route path="/settings"   ><SettingsComponent /></Route>
<Route                    ><Error404Component /></Route>
*/