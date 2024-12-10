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
    console.log("code here");
    dispatch(fetchUsers(currentPage));
  }, []);

  const handlePageChange = (page: number) => {
    // dispatch(fetchUsers(page));
  };

  return (
    <div className="container mx-auto py-8">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <UserGrid users={users} />
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
