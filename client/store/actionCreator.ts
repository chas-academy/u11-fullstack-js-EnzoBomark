import * as userTypes from './actionTypes';

export const addUser = (user: User) => {
  return {
    type: userTypes.ADD_USER,
    user,
  };
};

export const removeUser = (user: User) => {
  return {
    type: userTypes.REMOVE_USER,
    user,
  };
};
