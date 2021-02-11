import {
  isLocalStorage,
  // getLocalStorage,
  getMockStorage
} from '../utilities/localstorage';

/**
 * Helper function to fetch initial bookmark list
 * from local storage
 */
export const getBookmarks = () => {
  let bookmarks = [];
  let storedData = {};
  if (isLocalStorage) {
    // storedData = getLocalStorage('gd-bm-bookmarks');
    storedData = getMockStorage('gd-bm-bookmarks');
    if (storedData.statusOK) {
      bookmarks = storedData.data;
    }
  }
  return bookmarks;
};

/**
 * Helper function to fetch stored theme
 */
export const getTheme = () => {
  let theme = {
    isDark: false,
    template: 'light'
  };
  let storedData = theme.template;
  if (isLocalStorage) {
    storedData = JSON.parse(localStorage.getItem('gd-bm-theme'));
    if (storedData) {
      if (storedData === 'dark') {
        theme = {isDark: true, template: storedData};
      } else {
        theme = {isDark: false, template: storedData};
      }
    }
  }
  return theme;
};

