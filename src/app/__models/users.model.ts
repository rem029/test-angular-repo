import { UserModel } from './user.model';

export interface UsersModel {
  lastCode: number;
  isLoading: boolean;
  users: UserModel[];
  _meta: {
    page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
  };
}
