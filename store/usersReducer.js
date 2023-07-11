import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
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
    setUsersFailure(state, action) {
        state.isLoading = false;
        state.error = action.payload;
    },
  }
})

export const { setUsersStart, setUsersSuccess, setUsersFailure } = usersSlice.actions
export default usersSlice.reducer