import { createSlice } from '@reduxjs/toolkit'

const gameSlice = createSlice({
  name: 'counter',
  initialState: {
    name: null,
    type: null
  },
  reducers: {
    createGame: (state, action) => {
      state.name = action.payload.name
      state.type = action.payload.type
    }
  }
})

export const { createGame } = gameSlice.actions

export default gameSlice.reducer
