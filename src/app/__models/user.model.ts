import { AppModel } from './app.model';

export interface UserModel {
  id: number;
  email: string;
  passtoken?: string;
  apps?: AppModel[];
  include?: boolean;
}
