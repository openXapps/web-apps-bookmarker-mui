/**
 * Bookmarks reducer function to mutate store state
 * @param {any} state Current state
 * @param {any} action Reducer action type and payload
 */
const StoreReducer = (state, action) => {
  // console.log('reducer: action type......', action.type);
  // console.log('reducer: action payload...', action.payload);
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
        isEmpty: false
      };
    case 'LOADED':
      return {
        ...state,
        isLoading: false,
        isEmpty: false
      };
    case 'EMPTY':
      return {
        ...state,
        isLoading: false,
        isEmpty: true
      };
    case 'SAVE':
      return {
        ...state,
        isLoading: false,
        isEmpty: false,
        bookmarks: action.payload
      };
    case 'THEME':
      return {
        ...state,
        theme: action.payload
      };
    case 'VIEW':
      return {
        ...state,
        currentView: action.payload
      };
    default:
      throw new Error(`Reducer action type not defined: ${action.type}`);
  }
};

export default StoreReducer;