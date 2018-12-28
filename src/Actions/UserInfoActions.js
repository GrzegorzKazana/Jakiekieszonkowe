export const requestUserValidation = () => ({
  type: "REQUEST_USER_VALIDATION"
});

export const userValidated = (
  userData,
  userKids,
  userNotifications,
  isAdmin,
  userMetaNotification
) => ({
  type: "USER_VALIDATED",
  userData,
  userKids,
  userNotifications,
  isAdmin,
  userMetaNotification
});

export const requestUserValidationFailed = () => ({
  type: "REQUEST_USER_VALIDATION_FAILED"
});

export const requestChangeUserData = () => ({
  type: "REQUEST_CHANGE_USER_DATA"
});

export const changeUserData = userData => ({
  type: "CHANGE_USER_DATA",
  userData
});

export const updateKidList = kidList => ({
  type: "USER_UPDATE_KID_LIST",
  kidList
});

export const requestUpdateKidList = () => ({
  type: "REQUEST_UPDATE_KID_LIST"
});

export const requestUpdateNotificationList = () => ({
  type: "REQUEST_USER_UPDATE_NOTIFICATION_LIST"
});

export const updateNotificationList = notificationList => ({
  type: "USER_UPDATE_NOTIFICATION_LIST",
  notificationList
});

export const changeMetaNotification = isSubscribed => ({
  type: "CHANGE_META_NOTIFICATION",
  isSubscribed
});

export const logOut = () => ({
  type: "LOG_OUT"
});

// export const requestUserValidation = () => ({
//   type: "REQUEST_USER_VALIDATION"
// });

// export const userValidated = user => ({
//   type: "USER_VALIDATED",
//   user
// });

// export const requestUserValidationFailed = () => ({
//   type: "REQUEST_USER_VALIDATION_FAILED"
// });

// export const changeUserData = user => ({
//   type: "CHANGE_USER_DATA",
//   user
// });

// export const changePassword = newPassword => ({
//   type: "CHANGE_USER_PASSWORD",
//   newPassword
// });

// export const addUserNotification = notification => ({
//   type: "ADD_USER_NOTIFICATION",
//   notification
// });

// export const deleteUserNotification = notificationIdx => ({
//   type: "DELETE_USER_NOTIFICATION",
//   notificationIdx
// });

// export const addMetaNotification = notification => ({
//   type: "ADD_META_NOTIFICATION",
//   notification
// });

// export const deleteMetaNotification = notificationIdx => ({
//   type: "DELETE_META_NOTIFICATION",
//   notificationIdx
// });

// export const logOut = () => ({
//   type: "LOG_OUT"
// });

// export const addKid = kid => ({
//   type: "USER_ADD_KID",
//   kid
// });

// export const editKid = (kid, kidIdx) => ({
//   type: "USER_EDIT_KID",
//   kid,
//   kidIdx
// });

// export const deleteKid = kidIdx => ({
//   type: "USER_DELETE_KID",
//   kidIdx
// });

// export const updateKidList = kidList => ({
//   type: "USER_UPDATE_KID_LIST",
//   kidList
// });

// export const updateNotificationList = notificationList => ({
//   type: "USER_UPDATE_NOTIFICATION_LIST",
//   notificationList
// });
