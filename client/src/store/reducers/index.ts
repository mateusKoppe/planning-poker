import { combineReducers } from '@reduxjs/toolkit'

import game from './game'

const rootReducer = combineReducers({
  game
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
