import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    users: [],
    isLoading: false,
    error: null
  },
  reducers: {
    setUsersStart(state) {
        state.isLoading = true;
        state.error = null;
    },
    setUsersSuccess(state, action) {
        state.isLoading = false;
        state.users = action.payload;
    },
    setUsersSuccessById(state, action) {
        state.isLoading = false;
        state.user = action.payload;
    },
    setUsersFailure(state, action) {
        state.isLoading = false;
        state.error = action.payload;
    },
  }
})

export const { setUsersStart, setUsersSuccess, setUsersFailure, setUsersSuccessById } = usersSlice.actions
export default usersSlice.reducer