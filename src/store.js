import { configureStore } from '@reduxjs/toolkit'
// import todosReducer from '../features/todos/todosSlice'
// import filtersReducer from '../features/filters/filtersSlice'
import pastesReducer from './redux/pasteSlice'
export const store = configureStore({
  reducer: {
    paste:pastesReducer,
  },
})