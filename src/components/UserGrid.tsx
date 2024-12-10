import React from "react";
import { User } from "../types";
import "tailwindcss/tailwind.css";

interface UserGridProps {
  users: User[];
}

const UserGrid: React.FC<UserGridProps> = ({ users }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {users.map((user) => (
        <div key={user.id} className="bg-white shadow-md rounded-lg p-4">
          <img
            src={user.avatar}
            alt={user.first_name}
            className="rounded-full h-24 w-24 mx-auto mb-2"
          />
          <h3 className="text-lg text-center font-medium">{`${user.first_name} ${user.last_name}`}</h3>
          <p className="text-gray-500 text-center">{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserGrid;
