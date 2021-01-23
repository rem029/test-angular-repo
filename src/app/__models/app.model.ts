import { UserModel } from './user.model';

export interface AppModel {
  id: number;
  name: string;
  url: string;
  scope: string;
  include?: boolean;
  users?: UserModel[];
}
