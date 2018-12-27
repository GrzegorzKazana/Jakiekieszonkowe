const defaultState = {
  snackbarOpen: false,
  snackbarMessage: ""
};

const InfoSnackbarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "DISPLAY_SNACKBAR_MESSAGE":
      return {
        ...state,
        snackbarOpen: true,
        snackbarMessage: action.message
      };
    case "HIDE_SNACKBAR_MESSAGE":
      return {
        ...state,
        snackbarOpen: false,
        snackbarMessage: ""
      };
    default:
      return state;
  }
};
export default InfoSnackbarReducer;
