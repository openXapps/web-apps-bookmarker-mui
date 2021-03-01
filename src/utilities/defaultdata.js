/**
 * DEFAULT DATA FOR INITIAL APP LOAD
 * https://github.com/kelektiv/node-uuid
 */
const getDefaultData = () => {
  const response = {
    // gd-bm-settings
    settings: {
      version: '0.3.0',
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

module.exports.getDefaultData = getDefaultData;