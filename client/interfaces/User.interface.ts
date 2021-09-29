export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPaginatedUsers {
  data: IUser[];
  objectsFound: number;
}

export interface UsersResponse {
  error?: string;
  success?: IPaginatedUsers;
}
