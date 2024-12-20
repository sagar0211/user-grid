import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSelector, useDispatch } from "react-redux";
import App from "./App";
import { fetchUsers } from "./store/userActions";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("./store/userActions", () => ({
  fetchUsers: jest.fn().mockImplementation(() => async (dispatch: any) => {
    dispatch({
      type: "FETCH_USERS_SUCCESS",
      payload: { users: [], currentPage: 1, totalPages: 1 },
    });
  }),
}));

const mockUseSelector = useSelector as jest.Mock;
const mockUseDispatch = useDispatch as jest.Mock;

describe("App Component", () => {
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    mockUseDispatch.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", () => {
    mockUseSelector.mockReturnValue({
      users: {},
      loading: true,
      error: null,
      currentPage: 1,
      totalPages: 1,
    });

    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error message if there is an error", () => {
    mockUseSelector.mockReturnValue({
      users: {},
      loading: false,
      error: "Failed to fetch users",
      currentPage: 1,
      totalPages: 1,
    });

    render(<App />);

    expect(
      screen.getByText("Error: Failed to fetch users")
    ).toBeInTheDocument();
  });

  test("renders user grid and pagination when data is loaded", () => {
    mockUseSelector.mockReturnValue({
      users: {
        1: [
          {
            id: 1,
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com",
            avatar: "",
          },
        ],
      },
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    });

    render(<App />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // Pagination page number
  });

  test("calls fetchUsers action on page change", () => {
    mockUseSelector.mockReturnValue({
      users: {},
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    });

    render(<App />);

    fireEvent.click(screen.getByText("1")); // Clicking on the pagination button

    expect(fetchUsers).toHaveBeenCalledWith(1);
  });
});
