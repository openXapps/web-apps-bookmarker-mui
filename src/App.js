import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles'; import {
  // createMuiTheme,
  // Fixes forward Ref issue
  unstable_createMuiStrictModeTheme as createMuiTheme
} from '@material-ui/core/styles';
import { context } from './context/StoreProvider';
import dark from './themes/dark';
import light from './themes/light';

// Components, assets & utils
import Header from './components/Header';
import Content from './components/Content';
import Editor from './components/Editor';
import Delete from './components/Delete';
import Download from './components/Download';
import Upload from './components/Upload';
import Settings from './components/Settings';
import PageNotFound from './components/PageNotFound';

const App = () => {
  // https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1
  const root = '/apps/bookmarker';
  const [state] = React.useContext(context);
  const appTheme = createMuiTheme(state.theme.isDark ? dark : light);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter basename={root}>
        <Header home={root} />
        <Switch>
          <Route path="/" exact component={Content} />
          <Route path="/filter/:id" component={Content} />
          <Route path="/edit/:id" component={Editor} />
          <Route path="/copy/:id" component={Editor} />
          <Route path="/new" component={Editor} />
          <Route path="/delete/:id" component={Delete} />
          <Route path="/download" component={Download} />
          <Route path="/upload" component={Upload} />
          <Route path="/settings" component={Settings} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

/*
<Route path="/" exact     ><Content /></Route>
<Route path="/filter/:id" ><Content /></Route>
<Route path="/edit/:id"   ><Editor /></Route>
<Route path="/copy/:id"   ><Editor /></Route>
<Route path="/new"        ><Editor /></Route>
<Route path="/delete/:id" ><Delete /></Route>
<Route path="/download"   ><Download /></Route>
<Route path="/upload"     ><Upload /></Route>
<Route path="/settings"   ><Settings /></Route>
<Route                    ><PageNotFound /></Route>
*/