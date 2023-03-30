import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loadingMsg: null,
  isLoggedIn: false,
  userId: null,
  username: null
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoadingMessage: (state, action) => {
      state.loadingMsg = action.payload
    },
    loggedIn: (state, action) => {
      state.isLoggedIn = true
      state.userId = action.payload.userId
      state.username = action.payload.username
    },
    registered: (state, action) => {
      state.isLoggedIn = true
      state.userId = action.payload.userId
      state.username = action.payload.username
    },
    loggedOut: state => {
      state.isLoggedIn = false
      state.userId = null,
      state.username = null
    },
  },
})

export const authActions = auth.actions

export default auth.reducer
