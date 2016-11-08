//visibilityFilterReducer
const visibilityFilterReducer = (filter = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return filter;
  }
};
export default visibilityFilterReducer;