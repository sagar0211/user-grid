import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/rootReducer";
import { fetchUsers, UserActionTypes } from "./store/userActions";
import UserGrid from "./components/UserGrid";
import Pagination from "./components/Pagination";
import { ThunkDispatch } from "redux-thunk";

const App: React.FC = () => {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, void, UserActionTypes>>();
  const { users, loading, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    // Fetch if data for the page is not present
    if (!users[currentPage]) { 
      dispatch(fetchUsers(currentPage || 1)); // Fetch the first page if currentPage is 0
    }
  }, [dispatch, currentPage, users]);

  const handlePageChange = (page: number) => {
    dispatch(fetchUsers(page));
  };

  // Display users of the current page
  const currentPageUsers = users[currentPage] || [];

  return (
    <div className="container mx-auto py-8">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <UserGrid users={currentPageUsers} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default App;