export interface User {
  total_pages: number;
  per_page: any;
  total: any;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}
