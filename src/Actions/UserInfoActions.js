export const requestUserValidation = () => ({
  type: "REQUEST_USER_VALIDATION"
});

export const userValidated = user => ({
  type: "USER_VALIDATED",
  user
});

export const requestUserValidationFailed = () => ({
  type: "REQUEST_USER_VALIDATION_FAILED"
});

export const changeUserData = user => ({
  type: "CHANGE_USER_DATA",
  user
});

export const changePassword = newPassword => ({
  type: "CHANGE_USER_PASSWORD",
  newPassword
});

export const addUserNotification = notification => ({
  type: "ADD_USER_NOTIFICATION",
  notification
});

export const deleteUserNotification = notificationIdx => ({
  type: "DELETE_USER_NOTIFICATION",
  notificationIdx
});

export const addMetaNotification = notification => ({
  type: "ADD_META_NOTIFICATION",
  notification
});

export const deleteMetaNotification = notificationIdx => ({
  type: "DELETE_META_NOTIFICATION",
  notificationIdx
});

export const logOut = () => ({
  type: "LOG_OUT"
});

export const addKid = kid => ({
  type: "USER_ADD_KID",
  kid
});

export const editKid = (kid, kidIdx) => ({
  type: "USER_EDIT_KID",
  kid,
  kidIdx
});

export const deleteKid = kidIdx => ({
  type: "USER_DELETE_KID",
  kidIdx
});
