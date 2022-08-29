/**
 * Helper function to validate an object
 * @param {any} data Data object to validate
 * @returns Validation response object
 */
export const validator = (data) => {
  let obj = {};
  let response = { ok: true, result: {} };

  try {
    if (!data) throw new Error('Nothing to validate');
    obj = JSON.parse(data);
    if (!obj.categories) throw new Error('Missing categories');
    if (!Array.isArray(obj.categories)) throw new Error('Categories not an array');
    if (!obj.bookmarks) throw new Error('Missing bookmarks');
    if (!Array.isArray(obj.bookmarks)) throw new Error('Bookmarks not an array');
    response = { ...response, result: obj };
  } catch (error) {
    // console.log(error);
    response = { ...response, ok: false };
  }

  // console.log('validator: response...', response);
  return response;
};
