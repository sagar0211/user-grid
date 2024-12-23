import React from "react";
import { User } from "../types";
import "tailwindcss/tailwind.css";

interface UserGridProps {
  users: User[];
}

const UserGrid: React.FC<UserGridProps> = ({ users }) => {
  const defaultImage = `${process.env.PUBLIC_URL}/logo192.png`;
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = defaultImage;
  };

  return (
    <div className="grid grid-cols-3 gap-6 m-6">
      {users.map((user) => (
        <div key={user?.id} className="bg-red-100 shadow-md rounded-lg p-4">
          <img
            src={user?.avatar || defaultImage}
            alt={user?.first_name}
            className="rounded-full h-24 w-24 mx-auto mb-2"
            onError={handleImageError}
          />
          <h3 className="text-lg text-center font-medium">{`${user?.first_name} ${user?.last_name}`}</h3>
          <p className="text-red-500 text-center">{user?.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserGrid;
