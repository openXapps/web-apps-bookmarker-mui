import { saveLocalStorage } from '../../utilities/localstorage';

// NOT IMPLEMENTED
// export const mergeData = (data) => {
//   let objs = {};
//   try {
//     objs = JSON.parse(data);
//     console.log('mergeData: objs...', objs);
//     saveLocalStorage('gd-bm-categories', objs.categories);
//     saveLocalStorage('gd-bm-bookmarks', objs.bookmarks);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

/**
 * Helper function to overwrite site data
 * @param {any} data Data object to write
 */
export const overwriteData = (data) => {
  console.log('overwriteData: data...', data);
  // saveLocalStorage('gd-bm-categories', objs.categories);
  // saveLocalStorage('gd-bm-bookmarks', objs.bookmarks);

  // let objs = {};
  // try {
    // objs = JSON.parse(data);
  //   return true;
  // } catch (error) {
  //   return false;
  // }
};
