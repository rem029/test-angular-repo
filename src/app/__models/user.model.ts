import { AppModel } from './app.model';

export interface UserModel {
  id: number;
  email: string;
  apps?: AppModel[];
}
