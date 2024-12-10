import axios from "axios";
import { UserResponse } from "../types";

class UserService {
  static async fetchUsers(page: number): Promise<UserResponse> {
    const response = await axios.get<UserResponse>(
      `https://reqres.in/api/users?page=${page}`
    );
    return response.data;
  }
}

export default UserService;
