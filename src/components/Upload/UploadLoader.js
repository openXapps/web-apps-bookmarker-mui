import { saveLocalStorage } from '../../utilities/localstorage';

/**
 * Helper function to merge site data
 */
export const mergeData = (data) => {
  let objs = {};
  try {
    objs = JSON.parse(data);
    console.log('mergeData: objs...', objs);
    // saveLocalStorage('gd-bm-categories', objs.categories);
    // saveLocalStorage('gd-bm-bookmarks', objs.bookmarks);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Helper function to overwrite site data
 */
export const overwriteData = (data) => {
  let objs = {};
  try {
    objs = JSON.parse(data);
    saveLocalStorage('gd-bm-categories', objs.categories);
    saveLocalStorage('gd-bm-bookmarks', objs.bookmarks);
    return true;
  } catch (err) {
    return false;
  }
};
