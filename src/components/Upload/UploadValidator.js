/**
 * Helper function to validate an object
 * @param {any} obj Data object to validate
 */
export const validator = (data) => {
  let results = { hasError: false, message: '' };
  let obj = {};

  try {
    obj = JSON.parse(data);
    if (!obj.categories) throw new Error('Missing categories');
    if (!Array.isArray(obj.categories)) throw new Error('Categories not an array');
    if (!obj.bookmarks) throw new Error('Missing bookmarks');
    if (!Array.isArray(obj.bookmarks)) throw new Error('Bookmarks not an array');
  } catch (error) {
    console.log(error);
    results = { hasError: true, message: error };
  }

  return results;
};
