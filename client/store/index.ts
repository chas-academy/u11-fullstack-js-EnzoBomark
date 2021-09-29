import { Context, createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import { AnyAction, combineReducers, Reducer } from 'redux';

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import user from '../slices/user.slice';

const combinedReducer = combineReducers({ user });

export type RootState = ReturnType<typeof combinedReducer>;

type HydratedReducer = Reducer<RootState, AnyAction>;

const reducer: HydratedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState: RootState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };

    if (state && state.user.user !== null) nextState.user.user = state.user.user; // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = (context: Context) => {
  return configureStore({ reducer });
};

export const wrapper = createWrapper(makeStore);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
