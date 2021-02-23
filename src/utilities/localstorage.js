// Utility module to manage HTML5 localStorage

/**
 * Check whether localStorage is available.
 * It sets a dummy key.
 * Validates the dummy key.
 * Then deletes the dummy key.
 */
const isLocalStorage = () => {
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
const initialUse = (force) => {
  const version = getSettings().data.version;
  const numOfBookmarks = getBookmarks().data.length;
  if (!(version && numOfBookmarks > 0) || force) {
    saveLocalStorage('gd-bm-settings', getMockStorage().settings);
    saveLocalStorage('gd-bm-favourites', getMockStorage().favourites);
    saveLocalStorage('gd-bm-poplular', getMockStorage().poplular);
    saveLocalStorage('gd-bm-categories', getMockStorage().categories);
    saveLocalStorage('gd-bm-bookmarks', getMockStorage().bookmarks);
  }
  if (!version && numOfBookmarks > 0 && !force) {
    saveLocalStorage('gd-bm-settings', getMockStorage().settings);
    saveLocalStorage('gd-bm-favourites', getMockStorage().favourites);
    saveLocalStorage('gd-bm-poplular', getMockStorage().poplular);
    saveLocalStorage('gd-bm-categories', getMockStorage().categories);
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
};

/**
 * Overwrite item to local storage
 * @param {string} obj Local storage identifier
 * @param {any} data Data object to store
 */
const saveLocalStorage = (obj, data) => {
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
const getSettings = () => {
  let response = {
    statusOK: false,
    data: {
      version: '2.1.0',
      theme: {
        isDark: false,
        template: 'light'
      },
      confirmDelete: true,
    }
  }
  try {
    const settings = JSON.parse(localStorage.getItem('gd-bm-settings'));
    // const { settings } = getMockStorage();
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
const getFavourites = () => {
  let response = {
    statusOK: false,
    data: []
  }
  try {
    // const favourites = JSON.parse(localStorage.getItem('gd-bm-favourites'));
    const { favourites } = getMockStorage();
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
const getPopular = () => {
  let response = {
    statusOK: false,
    data: []
  }
  try {
    // const poplular = JSON.parse(localStorage.getItem('gd-bm-poplular'));
    const { poplular } = getMockStorage();
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
const getCategories = () => {
  let response = {
    statusOK: false,
    data: []
  }
  try {
    // const categories = JSON.parse(localStorage.getItem('gd-bm-categories'));
    const { categories } = getMockStorage();
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
const getBookmarks = () => {
  let response = {
    statusOK: false,
    data: []
  }
  try {
    // const bookmarks = JSON.parse(localStorage.getItem('gd-bm-bookmarks'));
    const { bookmarks } = getMockStorage();
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
 * MOCK DATA FOR TESTING
 * https://github.com/kelektiv/node-uuid
 */
const getMockStorage = () => {
  const response = {
    // gd-bm-settings
    settings: {
      version: '2.1.0',
      theme: {
        isDark: false,
        template: 'light'
      },
      confirmDelete: true,
    },

    // gd-bm-favourites
    favourites: [
      '347cf222-887b-11e9-bc42-526af7764f01',
      '347cf222-887b-11e9-bc42-526af7764f03',
    ],

    // gd-bm-poplular
    poplular: [
      '347cf222-887b-11e9-bc42-526af7764f02',
      '347cf222-887b-11e9-bc42-526af7764f03',
    ],

    // gd-bm-categories
    categories: [
      {
        categoryId: '017cf222-887b-11e9-bc42-526af7764f64',
        category: 'Default',
      },
      {
        categoryId: '027cf222-887b-11e9-bc42-526af7764f64',
        category: 'Development Tools',
      },
      {
        categoryId: '037cf222-887b-11e9-bc42-526af7764f64',
        category: 'Other',
      },
    ],

    // gd-bm-bookmarks
    bookmarks: [
      {
        categoryId: '017cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cf222-887b-11e9-bc42-526af7764f01',
        siteName: 'Google',
        siteURL: 'https://www.google.com',
      },
      {
        categoryId: '027cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cf4ca-887b-11e9-bc42-526af7764f02',
        siteName: 'Material-UI',
        siteURL: 'https://material-ui.com/',
      },
      {
        categoryId: '037cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cfc54-887b-11e9-bc42-526af7764f03',
        siteName: 'Very long bookmark name growing beyond the limits of its container',
        siteURL: 'https://www.google.com',
      },
    ],
  };
  return response;
};

// Export module methods
module.exports.isLocalStorage = isLocalStorage;
module.exports.initialUse = initialUse;
module.exports.saveLocalStorage = saveLocalStorage;
module.exports.getSettings = getSettings;
module.exports.getCategories = getCategories;
module.exports.getFavourites = getFavourites;
module.exports.getPopular = getPopular;
module.exports.getBookmarks = getBookmarks;
module.exports.getMockStorage = getMockStorage;