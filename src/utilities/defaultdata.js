/**
 * Local storage object types
 */
export const storageObject = {
  bookmark: 'gd-bm-bookmarks',
  category: 'gd-bm-categories',
  setting: 'gd-bm-settings',
};

/**
 * Default category that CANNOT be deleted
 */
export const defaultCategory = [
  {
    categoryId: '017cf222-887b-11e9-bc42-526af7764f64',
    category: 'Uncategorized',
  },
];

/**
 * Default popular markers
 */
export const defaultPopularMarkers = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
  { value: 30, label: '30' },
];

/**
 * Navigation state enumeration
 */
export const navState = Object.freeze({
  POPULAR: -1,
  FAVOURITES: -2,
})

/**
 * DEFAULT DATA FOR INITIAL APP LOAD
 * https://github.com/kelektiv/node-uuid
 */
export const getDefaultData = () => {
  const response = {
    // gd-bm-settings
    settings: {
      // Remember to update package.json too
      version: '0.4.3',
      // version: '0.4.2',
      // version: '0.4.1',
      // version: '0.4.0',
      // version: '0.3.2',
      theme: {
        isDark: false,
        template: 'light'
      },
      confirmOnDelete: true,
      listLimit: 10,
      // hideEmptyCategories: false,
    },

    // Navigator bar defaults
    navState: {
      activeNav: navState.POPULAR,
      categoryId: ''
    },

    // gd-bm-categories
    categories: [
      {
        categoryId: defaultCategory[0].categoryId,
        category: defaultCategory[0].category,
      },
      {
        categoryId: '027cf222-887b-11e9-bc42-526af7764f64',
        category: 'Social Media',
      },
      {
        categoryId: '037cf222-887b-11e9-bc42-526af7764f64',
        category: 'Messaging',
      },
    ],

    // gd-bm-bookmarks
    bookmarks: [
      {
        categoryId: '017cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cf222-887b-11e9-bc42-526af7764f01',
        siteName: 'Google',
        siteURL: 'https://www.google.com',
        favourite: true,
        lastUsed: '2020-03-23T06:07:30.407Z'
      },
      {
        categoryId: '027cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cf4ca-887b-11e9-bc42-526af7764f02',
        siteName: 'Facebook',
        siteURL: 'https://www.facebook.com',
        favourite: false,
        lastUsed: '2020-05-23T06:07:30.407Z'
      },
      {
        categoryId: '027cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cfc54-887b-11e9-bc42-526af7764f03',
        siteName: 'Instagram',
        siteURL: 'https://www.instagram.com',
        favourite: false,
        lastUsed: '2020-01-23T06:07:30.407Z'
      },
      {
        categoryId: '037cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cfc54-887b-11e9-bc42-526af7764f04',
        siteName: 'WhatsApp',
        siteURL: 'https://web.whatsapp.com',
        favourite: true,
        lastUsed: '2020-01-23T06:07:30.407Z'
      },
      {
        categoryId: '037cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cfc54-887b-11e9-bc42-526af7764f05',
        siteName: 'GMail',
        siteURL: 'https://mail.google.com/mail',
        favourite: false,
        lastUsed: '2020-01-23T06:07:30.407Z'
      },
      {
        categoryId: '017cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cfc54-887b-11e9-bc42-526af7764f06',
        siteName: 'YouTube',
        siteURL: 'https://www.youtube.com',
        favourite: false,
        lastUsed: '2020-01-23T06:07:30.407Z'
      },
      {
        categoryId: '017cf222-887b-11e9-bc42-526af7764f64',
        siteId: '347cfc54-887b-11e9-bc42-526af7764f07',
        siteName: 'Microsoft',
        siteURL: 'https://www.microsoft.com',
        favourite: false,
        lastUsed: '2020-01-23T06:07:30.407Z'
      },
    ],
  };
  return response;
};

