import axios from "axios";
import { UserResponse } from "../types";

class UserService {
  static async fetchUsers(page: number): Promise<UserResponse> {
    const response = await axios.get<UserResponse>(
      process.env.REACT_APP_API_ENDPOINT + `?page=${page}`
    );
    return response.data;
  }
}

export default UserService;
