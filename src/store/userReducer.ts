import { User } from "../types";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UserActionTypes,
} from "./userActions";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: UserState = {
  users: [],
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
        users: [...state.users, ...action.payload],
        loading: false,
        currentPage: state.currentPage + 1,
        totalPages:
          action.payload.length > 0
            ? Math.ceil(action.payload[0].total / action.payload[0].per_page)
            : 0,
      };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
