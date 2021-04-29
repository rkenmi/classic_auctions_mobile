import {applyMiddleware, createStore} from 'redux'
import rootReducer, {RootReducerState} from './reducers/rootReducer'
import thunk from "redux-thunk";

const store = createStore<RootReducerState, any, {}, {}>(rootReducer, applyMiddleware(thunk))

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store