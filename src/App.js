import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
// import {
//   createMuiTheme,
  // Fixes forward Ref issue - NOT FOR PRODUCTION USE
  // https://material-ui.com/customization/theming/#unstable-createmuistrictmodetheme-options-args-theme
  // unstable_createMuiStrictModeTheme as createMuiTheme,
// } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

// App assets
import { context } from './context/StoreProvider';
import dark from './themes/dark';
import light from './themes/light';

// App components
import HeaderComponent from './components/Header/HeaderComponent';
// import FooterComponent from './components/Footer/FooterComponent';
import ContentComponent from './components/Content/ContentComponent';
import EditorComponent from './components/Editor/EditorComponent';
import CategoryComponent from './components/Category/CategoryComponent';
import CategoryEditComponent from './components/Category/CategoryEditComponent';
import DownloadComponent from './components/Download/DownloadComponent';
import UploadComponent from './components/Upload/UploadComponent';
import SettingsComponent from './components/Settings/SettingsComponent';
import Error404Component from './components/Error/Error404Component';

const App = () => {
  const [state] = React.useContext(context);
  const appTheme = createTheme(state.theme.isDark ? dark : light);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {/* https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1 */}
      <BrowserRouter basename={'/apps/bookmarker'}>
        {/* <BrowserRouter basename={'/'}> */}
        <HeaderComponent />
        <Toolbar />
        <Switch>
          {/* root shows popular bookamrks */}
          <Route path="/" exact component={ContentComponent} />
          <Route path="/favourites" component={ContentComponent} />
          <Route path="/category/:id" component={ContentComponent} />
          <Route path="/search/:name" exact component={ContentComponent} />
          <Route path="/new" component={EditorComponent} />
          <Route path="/edit/:id" component={EditorComponent} />
          <Route path="/categories" component={CategoryComponent} />
          <Route path="/categoryedit/:id" component={CategoryEditComponent} />
          <Route path="/download" component={DownloadComponent} />
          <Route path="/upload" component={UploadComponent} />
          <Route path="/settings" component={SettingsComponent} />
          <Route component={Error404Component} />
        </Switch>
        {/* <Toolbar /> */}
        {/* <FooterComponent /> */}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

/*
This new structure does NOT work for me. Keeping to the old structure.
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