// Utility module to manage HTML5 localStorage

import { storageObject, getDefaultData } from './defaultdata';

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
    saveLocalStorage(storageObject.bookmark, newBookmarks);
  }

  // Bump version if it exists and is not the latest
  if (settings.data.version && settings.data.version !== getDefaultData().settings.version) {
    saveLocalStorage(storageObject.setting, { ...settings, version: getDefaultData().settings.version });
  }

  // No settings exist
  if (!settings.statusOK) {
    saveLocalStorage(storageObject.setting, getDefaultData().settings);
  }

  // No categories exist
  if (!categories.statusOK) {
    saveLocalStorage(storageObject.category, getDefaultData().categories);
  }

  // No bookamrks exist
  if (!bookmarks.statusOK) {
    saveLocalStorage(storageObject.bookmark, getDefaultData().bookmarks);
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
};

/**
 * Helper function to update a bookmark's last used date
 * @param {string} siteId Site ID to look for
 */
export const updateLastClicked = (siteId) => {
  const bookmarks = getBookmarks();

  if (bookmarks.statusOK) {
    const newBookmarks = bookmarks.data.map((v, i) => {
      return (v.siteId === siteId ?
        (
          { ...v, lastUsed: new Date() }
        ) : (v)
      );
    });
    saveLocalStorage(storageObject.bookmark, newBookmarks);
  }
};

/**
 * Helper function to update a single bookmark object
 * @param {any} bookmark Bookmark object to update
 */
export const updateBookmark = (bookmark) => {
  const bookmarks = getBookmarks();

  if (bookmarks.statusOK) {
    const newBookmarks = bookmarks.data.map((v, i) => {
      return (v.siteId === bookmark.siteId ? (bookmark) : (v));
    });
    // console.log('updateBookmark: newBookmarks...', newBookmarks);
    saveLocalStorage(storageObject.bookmark, newBookmarks);
  }
};

/**
 * Helper function to add a new bookmark object
 * @param {any} bookmark Bookmark object to add
 */
export const addBookmark = (bookmark) => {
  let bookmarks = getBookmarks();

  if (bookmarks.statusOK) {
    bookmarks.data.push(bookmark);
    // console.log('addBookmark: bookmarks.data...', bookmarks.data);
    saveLocalStorage(storageObject.bookmark, bookmarks.data);
  }
};

/**
 * Helper function to delete a single bookmark object
 * @param {string} id Bookmark Id to delete
 */
export const deleteBookmark = (id) => {
  const bookmarks = getBookmarks();
  let splicePoint = -1;

  if (bookmarks.statusOK) {
    const newBookmarks = bookmarks.data;
    bookmarks.data.forEach((v, i, a) => {
      if (v.siteId === id) splicePoint = i;
      return;
    });
    newBookmarks.splice(splicePoint, 1);
    // console.log('deleteBookmark: splicePoint....', splicePoint);
    // console.log('deleteBookmark: newBookmarks...', newBookmarks);
    saveLocalStorage(storageObject.bookmark, newBookmarks);
  }
};

/**
 * Helper function to add a new category object
 * @param {any} category Category object to add
 */
export const addCategory = (category) => {
  let categories = getCategories();

  if (categories.statusOK) {
    categories.data.push(category);
    // console.log('addCategory: categories.data...', categories.data);
    saveLocalStorage(storageObject.category, categories.data);
  }
};

/**
 * Get SETTINGS from local storage
 * @returns Returns an object {statusOk: boolean, data: any}
 */
export const getSettings = () => {
  let response = {
    statusOK: false,
    data: getDefaultData().settings,
  };
  try {
    const settings = JSON.parse(localStorage.getItem(storageObject.setting));
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
 * @returns Returns an object {statusOk: boolean, data: any}
 */
export const getFavourites = () => {
  let response = {
    statusOK: false,
    data: []
  };
  try {
    const bookmarks = JSON.parse(localStorage.getItem(storageObject.bookmark));
    if (bookmarks) {
      const favourites = bookmarks.filter((v) => v.favourite);
      if (favourites.length > 0) {
        const newBookmarks = favourites.map((v) => {
          return { ...v, category: getCategoryById(v.categoryId).data[0].category };
        });
        response = {
          statusOK: true,
          data: newBookmarks.sort((a, b) => (a.siteName > b.siteName) ? 1 : -1)
        };
      }
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
 * @returns Returns an object {statusOk: boolean, data: any}
 */
export const getPopular = () => {
  let response = {
    statusOK: false,
    data: []
  };
  try {
    const bookmarks = JSON.parse(localStorage.getItem(storageObject.bookmark));
    if (bookmarks) {
      const newBookmarks = bookmarks.map((v) => {
        return { ...v, category: getCategoryById(v.categoryId).data[0].category };
      });
      response = {
        statusOK: true,
        data: newBookmarks.sort((a, b) => (a.lastUsed < b.lastUsed) ? 1 : -1)
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
 * @param {string} categoryId Category Id to search for
 * @returns Returns an object {statusOk: boolean, data: any}
 */
export const getByCategory = (categoryId) => {
  let response = {
    statusOK: false,
    data: []
  };
  let byCategory = [];
  try {
    const bookmarks = JSON.parse(localStorage.getItem(storageObject.bookmark));
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
 * @returns Returns an object {statusOk: boolean, data: any}
 */
export const getCategories = () => {
  let response = {
    statusOK: false,
    data: []
  };
  try {
    const categories = JSON.parse(localStorage.getItem(storageObject.category));
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
 * Get CATEGORY by NAME from local storage
 * @param {string} value Category name to search for
 * @returns Returns an object {statusOk: boolean, data: any}
 */
export const getCategoryByName = (value) => {
  let response = {
    statusOK: false,
    data: []
  };
  try {
    const categories = JSON.parse(localStorage.getItem(storageObject.category));
    if (categories) {
      response = {
        statusOK: true,
        data: categories.filter((v) => v.category === value)
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
 * Get CATEGORY by ID from local storage
 * @param {string} id Category Id to search for
 * @returns Returns an object {statusOk: boolean, data: any}
 */
export const getCategoryById = (id) => {
  let response = {
    statusOK: false,
    data: []
  };
  try {
    const categories = JSON.parse(localStorage.getItem(storageObject.category));
    if (categories) {
      response = {
        statusOK: true,
        data: categories.filter((v) => v.categoryId === id)
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
 * @returns Returns an object {statusOk: boolean, data: any}
 */
export const getBookmarks = () => {
  let response = {
    statusOK: false,
    data: []
  };
  try {
    const bookmarks = JSON.parse(localStorage.getItem(storageObject.bookmark));
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
 * Get BOOKMARK by ID from local storage
 * @param {string} id Bookmark Id to search for
 * @returns Returns an object {statusOk: boolean, data: any}
 */
export const getBookmarkById = (id) => {
  let response = {
    statusOK: false,
    data: [],
  };
  try {
    const bookmarks = JSON.parse(localStorage.getItem(storageObject.bookmark));
    if (bookmarks) {
      response = {
        statusOK: true,
        data: bookmarks.filter((v) => v.siteId === id)
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

