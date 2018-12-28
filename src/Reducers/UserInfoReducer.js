const defaultState = {
  user: null,
  userFetching: false,
  userLoaded: false
};

const UserInfoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "REQUEST_USER_VALIDATION":
      return {
        ...state,
        userFetching: true
      };
    case "USER_VALIDATED":
      return {
        ...state,
        user: action.user,
        userLoaded: true,
        userFetching: false
      };
    case "REQUEST_USER_VALIDATION_FAILED":
      return {
        ...state,
        user: null,
        userLoaded: false,
        userFetching: false
      };
    case "LOG_OUT":
      return defaultState;
    case "USER_ADD_KID":
      return {
        ...state,
        user: {
          ...state.user,
          kids: state.user.kids.concat([action.kid])
        }
      };
    case "USER_EDIT_KID":
      return {
        ...state,
        user: {
          ...state.user,
          kids: state.user.kids.map((el, idx) =>
            idx === action.kidIdx ? action.kid : el
          )
        }
      };
    case "USER_DELETE_KID":
      return {
        ...state,
        user: {
          ...state.user,
          kids: state.user.kids.filter((el, idx) => idx !== action.kidIdx)
        }
      };
    case "CHANGE_USER_PASSWORD":
      return {
        ...state,
        user: {
          ...state.user,
          password: action.newPassword
        }
      };
    case "CHANGE_USER_DATA":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user
        }
      };
    case "ADD_USER_NOTIFICATION":
      return {
        ...state,
        user: {
          ...state.user,
          notifications: state.user.notifications.concat([action.notification])
        }
      };
    case "DELETE_USER_NOTIFICATION":
      return {
        ...state,
        user: {
          ...state.user,
          notifications: state.user.notifications.filter(
            (el, idx) => idx !== action.notificationIdx
          )
        }
      };
    case "ADD_META_NOTIFICATION":
      return {
        ...state,
        user: {
          ...state.user,
          metaNotification: true
        }
      };
    case "DELETE_META_NOTIFICATION":
      return {
        ...state,
        user: {
          ...state.user,
          metaNotification: false
        }
      };
    case "USER_UPDATE_KID_LIST":
      return {
        ...state,
        user: {
          ...state.user,
          kids: action.kidList
        }
      };
    case "USER_UPDATE_NOTIFICATION_LIST":
      return {
        ...state,
        user: {
          ...state.user,
          notifications: action.notificationList
        }
      };
    default:
      return state;
  }
};
export default UserInfoReducer;
