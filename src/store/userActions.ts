import { Dispatch } from "redux";
import {  UserResponse } from "../types";
import UserService from "../services/UserService";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

interface FetchUsersRequestAction {
  type: typeof FETCH_USERS_REQUEST;
}

interface FetchUsersSuccessAction {
  type: typeof FETCH_USERS_SUCCESS;
  payload: UserResponse;
}

interface FetchUsersFailureAction {
  type: typeof FETCH_USERS_FAILURE;
  payload: string;
}

export type UserActionTypes =
  | FetchUsersRequestAction
  | FetchUsersSuccessAction
  | FetchUsersFailureAction;

export const fetchUsers = (page: number) => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
      const response: UserResponse = await UserService.fetchUsers(page);
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: (error as Error).message,
      });
    }
  };
};
