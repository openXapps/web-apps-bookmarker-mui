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
 * Get data from local storage
 * @param {string} obj Local storage identifier
 */
const getLocalStorage = (obj) => {
  let response = {
    statusOK: false,
    data: []
  }
  try {
    let storedData = JSON.parse(localStorage.getItem(obj));
    // console.log(storedData);
    if (storedData) {
      response = {
        statusOK: true,
        data: storedData.sort((a, b) => (a.siteName > b.siteName) ? 1 : -1)
      };
    } else {
      // console.warn('No favorites found in local storage');
      throw new Error('No items found in localStorage');
    }
  } catch (err) {
    // console.log(err);
    // Life goes on ...
  }
  // console.log(response);
  return response;
}

/**
 * Overwrite item to local storage
 * @param {string} obj Local storage identifier
 * @param {any} data Data object to store
 */
const saveLocalStorage = (obj, data) => {
  localStorage.setItem(obj, JSON.stringify(data));
  return true;
}

/**
 * Get mock sample data
 * @param {string} obj Dummy local storage identifier
 */
const getMockStorage = (obj) => {
  // https://github.com/kelektiv/node-uuid
  const response = {
    statusOK: true,
    // statusOK: false,
    settings: {
      version: '2.1.0',
      darkMode: false,
      confirmDelete: true,
    },
    favourites: [
      '347cf222-887b-11e9-bc42-526af7764f01',
      '347cf222-887b-11e9-bc42-526af7764f04',
      '347cf222-887b-11e9-bc42-526af7764f07',
    ],
    categories: [
      {
        categoryId: '017cf222-887b-11e9-bc42-526af7764f64',
        category: '',
      },
      {
        categoryId: '027cf222-887b-11e9-bc42-526af7764f64',
        category: '',
      },
      {
        categoryId: '037cf222-887b-11e9-bc42-526af7764f64',
        category: '',
      },
    ],
    bookmarks: [
      {
        categoryId: '017cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cf222-887b-11e9-bc42-526af7764f01',
        siteName: 'Google',
        siteURL: 'https://www.google.co.za',
      },
      {
        categoryId: '017cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cf4ca-887b-11e9-bc42-526af7764f02',
        siteName: 'Standard Bank',
        siteURL: 'https://www.google.co.za',
      },
      {
        categoryId: '017cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cf632-887b-11e9-bc42-526af7764f03',
        siteName: 'Banana Tree',
        siteURL: 'https://www.google.co.za',
      },
      {
        categoryId: '027cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cf786-887b-11e9-bc42-526af7764f04',
        siteName: 'First National Bank',
        siteURL: 'https://www.google.co.za',
      },
      {
        categoryId: '027cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cf9ac-887b-11e9-bc42-526af7764f05',
        siteName: 'Apple Trees',
        siteURL: 'https://www.google.co.za',
      },
      {
        categoryId: '037cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cfb0a-887b-11e9-bc42-526af7764f06',
        siteName: 'Hello World',
        siteURL: 'https://www.google.co.za',
      },
      {
        categoryId: '037cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cfc54-887b-11e9-bc42-526af7764f07',
        siteName: 'Batman',
        siteURL: 'https://www.batman.com',
      },
      {
        categoryId: '037cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cfc54-887b-11e9-bc42-526af7764f08',
        siteName: 'Very long bookmark name growing beyond the limits of its container',
        siteURL: 'https://www.google.com',
      },
    ],
  };
  return response;
}

// Export module methods
module.exports.isLocalStorage = isLocalStorage;
module.exports.getLocalStorage = getLocalStorage;
module.exports.getMockStorage = getMockStorage;
module.exports.saveLocalStorage = saveLocalStorage;