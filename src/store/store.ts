import { createStore, applyMiddleware, Store } from "redux";
import { thunk, ThunkDispatch } from "redux-thunk";
import rootReducer, { RootState } from "./rootReducer";
import { UserActionTypes } from "./userActions";

const store: Store<RootState, UserActionTypes> & {
  dispatch: ThunkDispatch<RootState, void, UserActionTypes>;
} = createStore(rootReducer, applyMiddleware(thunk));

export default store;
