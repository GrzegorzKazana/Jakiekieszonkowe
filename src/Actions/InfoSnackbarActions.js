export const displaySnackbarMessage = message => ({
  type: "DISPLAY_SNACKBAR_MESSAGE",
  message
});

export const hideSnackbarMessage = () => ({
  type: "HIDE_SNACKBAR_MESSAGE"
});
