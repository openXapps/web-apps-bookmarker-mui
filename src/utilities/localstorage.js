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
  const settings = getSettings();
  // const favourites = getFavourites();
  // const poplular = getPopular();
  const categories = getCategories();
  const bookmarks = getBookmarks();

  // Convert old bookmarks to new version (0.3.0)
  if (!settings.statusOK && bookmarks.data.length > 0) {
    const newBookmarks = bookmarks.data.map((v, i) => {
      return (
        {
          categoryId: '017cf222-887b-11e9-bc42-526af7764f64',
          siteId: v.siteId,
          siteName: v.siteName,
          siteURL: v.siteURL,
          favourite: false,
          lastUsed: new Date()
        }
      );
    });
    saveLocalStorage('gd-bm-bookmarks', newBookmarks);
  }

  // Bump version if it exists and is not the latest
  if (settings.data.version && settings.data.version !== getDefaultData().settings.version) {
    saveLocalStorage('gd-bm-settings', { ...settings, version: getDefaultData().settings.version });
  }

  // No settings exist
  if (!settings.statusOK) {
    saveLocalStorage('gd-bm-settings', getDefaultData().settings);
  }

  // No favourites exist
  // if (!favourites.statusOK) {
  //   saveLocalStorage('gd-bm-favourites', getDefaultData().favourites);
  // }

  // No popular exist
  // if (!poplular.statusOK) {
  //   saveLocalStorage('gd-bm-poplular', getDefaultData().poplular);
  // }

  // No categories exist
  if (!categories.statusOK) {
    saveLocalStorage('gd-bm-categories', getDefaultData().categories);
  }

  // No bookamrks exist
  if (!bookmarks.statusOK) {
    saveLocalStorage('gd-bm-bookmarks', getDefaultData().bookmarks);
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
  let favourites = [];
  try {
    const bookmarks = JSON.parse(localStorage.getItem('gd-bm-bookmarks'));
    if (bookmarks) {
      favourites = bookmarks.filter((v) => v.favourite)
      response = {
        statusOK: true,
        data: favourites.sort((a, b) => (a.siteName > b.siteName) ? 1 : -1)
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
    const bookmarks = JSON.parse(localStorage.getItem('gd-bm-bookmarks'));
    if (bookmarks) {
      response = {
        statusOK: true,
        data: bookmarks.sort((a, b) => (a.lastUsed < b.lastUsed) ? 1 : -1)
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
 * Get by CATEGORY from local storage
 */
export const getByCategory = (categoryId) => {
  let response = {
    statusOK: false,
    data: []
  }
  let byCategory = [];
  try {
    const bookmarks = JSON.parse(localStorage.getItem('gd-bm-bookmarks'));
    if (bookmarks) {
      byCategory = bookmarks.filter((v) => v.categoryId === categoryId);
      response = {
        statusOK: true,
        data: byCategory.sort((a, b) => (a.siteName > b.siteName) ? 1 : -1)
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
    const categories = JSON.parse(localStorage.getItem('gd-bm-categories'));
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
    const bookmarks = JSON.parse(localStorage.getItem('gd-bm-bookmarks'));
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

/**
 * Get DOWNLOADABLE data from storage
 */
export const getDownloadableData = () => {
  let data = '{\n"categories":\n';
  data += stringPop(JSON.stringify(getCategories().data));
  // data += ',\n"popular":\n';
  // data += stringPop(JSON.stringify(getPopular().data));
  // data += ',\n"favourites":\n';
  // data += stringPop(JSON.stringify(getFavourites().data));
  data += ',\n"bookmarks":\n';
  data += stringPop(JSON.stringify(getBookmarks().data));
  data += '\n}';
  return data;
};

/**
 * Helper function to prettify JSON object
 * @param {string} data String to prettify
 */
function stringPop(data) {
  let result = data;
  result = result.replace('[', '[\n');
  result = result.replace(']', '\n]');
  result = result.replace(/},{/g, '},\n{');
  return result;
}

