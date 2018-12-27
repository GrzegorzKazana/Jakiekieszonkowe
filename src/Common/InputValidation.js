export const validateUser = (email, password) =>
  email === "admin" && password === "admin";

export const validateEmail = email => email.length > 0;

export const validatePassword = password => password.length > 5;

export const validateInputEmail = email => email.length > 0;

export const validateInputPassword = password => password.length > 0;

export const validateNewEmail = email => email.length > 0;

export const validateNewPassword = password => password.length > 5;

// export const validatePasswords = (password, passwordRepeat) =>
//     password === passwordRepeat && password.length > 5;
