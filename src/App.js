import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Material UI
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

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
  const [state] = useContext(context);
  const appTheme = createTheme(state.theme.isDark ? dark : light);
  // const home = '/';
  const home = '/apps/bookmarker';

  /**
   * Check this video: https://www.youtube.com/watch?v=0cSVuySEB0A
   */
  
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {/* https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1 */}
      <BrowserRouter basename={home}>
        <HeaderComponent />
        <Routes>
          {/* root shows popular bookamrks */}
          <Route path="/" exact element={<ContentComponent />} />
          {/* Perhaps add an editor route here and wrap it around the next two routes */}
          <Route path="/new" element={<EditorComponent />} />
          <Route path="/edit/:id" element={<EditorComponent />} />
          {/* Perhaps wrap the category route with a parent */}
          <Route path="/categories" element={<CategoryComponent />} />
          <Route path="/categoryedit/:id" element={<CategoryEditComponent />} />
          <Route path="/download" element={<DownloadComponent />} />
          <Route path="/upload" element={<UploadComponent />} />
          <Route path="/settings" element={<SettingsComponent />} />
          {/* See if I can auto redirect the user to / on a 404 route */}
          <Route path="*" element={<Error404Component />} />
        </Routes>
        {/* <Toolbar /> */}
        {/* <FooterComponent /> */}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;