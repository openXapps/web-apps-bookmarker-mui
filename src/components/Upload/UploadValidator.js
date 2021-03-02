/**
 * Helper function to validate an object
 * @param {any} obj Data object to validate
 */
export const validator = (data) => {
  let hasError = false;
  let obj = {};

  try {
    obj = JSON.parse(data);
    // Check for favourites
    if (!obj.favourites) throw new Error('Missing favourites');
    if (!obj.popular) throw new Error('Missing popular');
    if (!obj.categories) throw new Error('Missing categories');
    if (!obj.bookmarks) throw new Error('Missing bookmarks');
  } catch (error) {
    console.log(error);
    hasError = true;
  }

  return hasError;
};
