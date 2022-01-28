/**
 * Reducer function to mutate store state
 * @param {any} state Current state
 * @param {any} action Reducer action type and payload
 */
const StoreReducer = (state, action) => {
  // console.log('reducer: action type......', action.type);
  // console.log('reducer: action payload...', action.payload);
  switch (action.type) {
    case 'THEME':
      return {
        ...state,
        theme: action.payload
      };
    case 'NAV':
      return {
        ...state,
        navState: action.payload
        // activeNav: action.payload
      };
    default:
      throw new Error(`Reducer action type not defined: ${action.type}`);
  }
};

export default StoreReducer;