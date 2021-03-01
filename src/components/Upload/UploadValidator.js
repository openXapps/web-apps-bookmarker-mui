/**
 * Helper function to validate an object
 * @param {any} obj Data object to validate
 */
const validator = (obj) => {
  let response = false;
  if (obj) {
    response = true;
  }
  return response;
};

module.exports.validator = validator;