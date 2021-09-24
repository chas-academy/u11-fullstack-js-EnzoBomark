import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '@/store/index';

export type UserState = {
  user: { id: string; name: string; email: string };
};

type UserAction = {
  id: string;
  name: string;
  email: string;
};

const userInitialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'count',
  initialState: userInitialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserAction>) => {
      const user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
      return {
        user,
      };
    },
    removeUser: () => {
      return {
        user: null,
      };
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
