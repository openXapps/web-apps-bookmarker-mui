import { saveLocalStorage } from '../../utilities/localstorage';

/**
 * Helper function to merge site data
 * @param {any} data Data object to merge
 * @returns Boolean true if success or false if failed
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
 * @param {any} data Data object to write
 * @returns Boolean true if success or false if failed
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
