/**
 * Helper function to validate an object
 * @param {any} obj Data object to validate
 */
export const validator = (data) => {
  let hasError = false;
  let obj = {};
  
  try {
    obj = JSON.parse(data);
  } catch (error) {
    console.log(error);
    hasError = true;
  }

  // Check for favourites
  if (!obj.favourites && !hasError) hasError = true;
  if (!obj.poplular && !hasError) hasError = true;
  if (!obj.categories && !hasError) hasError = true;
  if (!obj.bookmarks && !hasError) hasError = true;

  return hasError;
};
