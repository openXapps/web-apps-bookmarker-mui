import { v1 as uuidv1 } from 'uuid';
import {
  updateBookmark,
  addBookmark,
  addCategory,
} from '../../utilities/localstorage';

/**
 * Editor helper function to validate form fields
 * @param {any} fields Form fields object to validate
 * @returns Validation result object
 */
export const validateForm = (fields) => {
  let validation = {
    status: true,
    message: '',
  };

  // Validate category
  if (!fields.categoryInputValue) validation = { status: false, message: 'Missing category' };

  // Continue if still valid
  if (validation.status) {
    // Validate site name
    if (!fields.siteName) validation = { status: false, message: 'Missing site name' };
  }

  // Continue if still valid
  if (validation.status) {
    // Validate site URL
    const rx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i;
    if (!fields.siteURL) validation = { status: false, message: 'Missing site URL' };
    if (fields.siteURL && !rx.test(fields.siteURL)) validation = { status: false, message: 'Site URL invalid' };
  }

  return validation;
};

/**
 * Helper function to save bookmark data from form fields
 * @param {any} fields Form fields to ave as a bookmark
 * @returns The bookmark site Id
 */
export const saveBookmark = (fields) => {
  const siteId = fields.siteId ? fields.siteId : uuidv1();
  const cat = fields.categoryInputValue;
  let catId = fields.categoryValue.categoryId ? fields.categoryValue.categoryId : 'err';

  if (cat.indexOf(fields.categoryValue.category) === -1 || catId === 'err') {
    catId = uuidv1();
    addCategory({
      categoryId: catId,
      category: cat.trim(),
    });
  }

  console.log('saveBookmark: cat.....', cat);
  console.log('saveBookmark: catId...', catId);

  const bookmark = {
    categoryId: catId,
    siteId: siteId,
    siteName: fields.siteName,
    siteURL: fields.siteURL,
    favourite: fields.favourite,
    lastUsed: new Date(),
  };
  // Update existing
  // if (fields.siteId) updateBookmark(bookmark);
  // Create new
  // if (!fields.siteId) addBookmark(bookmark);

  return siteId;
};
