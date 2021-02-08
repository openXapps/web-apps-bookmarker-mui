import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';import {
  // createMuiTheme,
  unstable_createMuiStrictModeTheme as createMuiTheme
} from '@material-ui/core/styles';
import { context } from './context/store';
import dark from './themes/dark';
import light from './themes/light';
// import getTheme from './themes/themer';
import Header from './components/Header';
import Content from './components/Content';

const App = () => {
  const [state] = React.useContext(context);
  const appTheme = createMuiTheme(state.theme.isDark ? dark : light);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header />
      <Content />
    </ThemeProvider>
  );
};

export default App;