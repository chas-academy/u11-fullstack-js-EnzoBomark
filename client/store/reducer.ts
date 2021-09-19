import * as userTypes from './actionTypes';

const initialState: UserState = {
  user: null,
};

const reducer = (state: UserState = initialState, action: UserAction): UserState => {
  if (action.type === 'ADD_USER') {
    const user: User = {
      id: action.user.id,
      name: action.user.name,
      email: action.user.email,
    };
    return {
      user: user,
    };
  }
  if (action.type === 'REMOVE_USER') {
    return {
      user: null,
    };
  }

  return state;
};

export default reducer;
