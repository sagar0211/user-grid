import { User } from "../types";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UserActionTypes,
} from "./userActions";

interface UserState {
  users: { [key: number]: User[] };
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: UserState = {
  users: {},
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0,
};

const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.page]: action.payload.data,
        },
        loading: false,
        currentPage: action.payload.page,
        totalPages: action.payload.total_pages,
      };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
