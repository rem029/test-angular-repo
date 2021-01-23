import { UserModel } from './user.model';

export interface DashboardModel {
  currentUser: UserModel;
  lastCode: number;
}
