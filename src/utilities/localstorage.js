// Utility module to manage HTML5 localStorage

import { getDefaultData } from './defaultdata';

/**
 * Check whether localStorage is available.
 * It sets a dummy key.
 * Validates the dummy key.
 * Then deletes the dummy key.
 */
export const isLocalStorage = () => {
  try {
    localStorage.setItem('test', 'x');
    // console.log(localStorage.getItem('text'));
    if (localStorage.getItem('test') === 'x') {
      localStorage.removeItem('test');
      return true;
    } else {
      throw new Error('localStorage unavailable');
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
* Write initial storage on first time usage
 * @param {boolean} force Force a local storage overwrite
 */
export const initialUse = () => {
  const version = getSettings().data.version;
  console.log('initialUse: version..........', version);
  const numOfBookmarks = getBookmarks().data.length;
  console.log('initialUse: numOfBookmarks...', numOfBookmarks);

  // Nothing exist
  if (!(version && numOfBookmarks > 0) && false) {
    saveLocalStorage('gd-bm-settings', getDefaultData().settings);
    saveLocalStorage('gd-bm-favourites', getDefaultData().favourites);
    saveLocalStorage('gd-bm-poplular', getDefaultData().poplular);
    saveLocalStorage('gd-bm-categories', getDefaultData().categories);
    saveLocalStorage('gd-bm-bookmarks', getDefaultData().bookmarks);
  }

  // No version but bookmarks do exist
  if (!version && numOfBookmarks > 0 && false) {
    saveLocalStorage('gd-bm-settings', getDefaultData().settings);
    saveLocalStorage('gd-bm-favourites', getDefaultData().favourites);
    saveLocalStorage('gd-bm-poplular', getDefaultData().poplular);
    saveLocalStorage('gd-bm-categories', getDefaultData().categories);
    const currentBookmarks = getBookmarks().data;
    const newBookmarks = currentBookmarks.map((v, i) => {
      return (
        {
          categoryId: '017cf222-887b-11e9-bc42-526af7764f64',
          siteId: v.siteId,
          siteName: v.siteName,
          siteURL: v.siteURL,
        }
      );
    });
    saveLocalStorage('gd-bm-bookmarks', newBookmarks);
  }

  // Bump version if it exists and is not the latest
  if (version && version !== getDefaultData().settings.version) {
    const currentSettings = getSettings().data;
    saveLocalStorage('gd-bm-settings', { ...currentSettings, version: getDefaultData().settings.version });
  }
};

/**
 * Overwrite item to local storage
 * @param {string} obj Local storage identifier
 * @param {any} data Data object to store
 */
export const saveLocalStorage = (obj, data) => {
  try {
    localStorage.setItem(obj, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
  return true;
};

/**
 * Get SETTINGS from local storage
 */
export const getSettings = () => {
  let response = {
    statusOK: false,
    data: getDefaultData().settings,
  }
  try {
    const settings = JSON.parse(localStorage.getItem('gd-bm-settings'));
    // const { settings } = getDefaultData();
    if (settings) {
      response = {
        statusOK: true,
        data: settings
      };
    } else {
      throw new Error('No items found in localStorage');
    }
  } catch (err) {
    // Life goes on ...
    console.log(err);
  }
  return response;
};

/**
 * Get FAVOURITES from local storage
 */
export const getFavourites = () => {
  let response = {
    statusOK: false,
    data: []
  }
  try {
    // const favourites = JSON.parse(localStorage.getItem('gd-bm-favourites'));
    const { favourites } = getDefaultData();
    if (favourites) {
      response = {
        statusOK: true,
        data: favourites
      };
    } else {
      throw new Error('No items found in localStorage');
    }
  } catch (err) {
    // Life goes on ...
    console.log(err);
  }
  return response;
};

/**
 * Get POPULAR from local storage
 */
export const getPopular = () => {
  let response = {
    statusOK: false,
    data: []
  }
  try {
    // const poplular = JSON.parse(localStorage.getItem('gd-bm-poplular'));
    const { poplular } = getDefaultData();
    if (poplular) {
      response = {
        statusOK: true,
        data: poplular
      };
    } else {
      throw new Error('No items found in localStorage');
    }
  } catch (err) {
    // Life goes on ...
    console.log(err);
  }
  return response;
};

/**
 * Get CATEGORIES from local storage
 */
export const getCategories = () => {
  let response = {
    statusOK: false,
    data: []
  }
  try {
    // const categories = JSON.parse(localStorage.getItem('gd-bm-categories'));
    const { categories } = getDefaultData();
    if (categories) {
      response = {
        statusOK: true,
        data: categories.sort((a, b) => (a.category > b.category) ? 1 : -1)
      };
    } else {
      throw new Error('No items found in localStorage');
    }
  } catch (err) {
    // Life goes on ...
    console.log(err);
  }
  return response;
};

/**
 * Get BOOKMARKS from local storage
 */
export const getBookmarks = () => {
  let response = {
    statusOK: false,
    data: []
  }
  try {
    // const bookmarks = JSON.parse(localStorage.getItem('gd-bm-bookmarks'));
    const { bookmarks } = getDefaultData();
    if (bookmarks) {
      response = {
        statusOK: true,
        data: bookmarks.sort((a, b) => (a.siteName > b.siteName) ? 1 : -1)
      };
    } else {
      throw new Error('No items found in localStorage');
    }
  } catch (err) {
    // Life goes on ...
    console.log(err);
  }
  return response;
};

// Export module functions
// module.exports.isLocalStorage = isLocalStorage;
// module.exports.initialUse = initialUse;
// module.exports.saveLocalStorage = saveLocalStorage;
// module.exports.getSettings = getSettings;
// module.exports.getCategories = getCategories;
// module.exports.getFavourites = getFavourites;
// module.exports.getPopular = getPopular;
// module.exports.getBookmarks = getBookmarks;
