import { configureStore } from '@reduxjs/toolkit'
import noteSlice from './notes/noteSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        note:noteSlice
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']