import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string | null;
  email?: string;
  phoneNumber?: string;
  name?: string;
  surname?: string;
}

const initialState: UserState = {
  uid: null,
  email: undefined,
  phoneNumber: undefined,
  name: undefined,
  surname: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
