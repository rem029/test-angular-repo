import { AppModel } from './app.model';

export interface AppsModel {
  apps: AppModel[];
  lastCode: number;
  isLoading: boolean;
  _meta: {
    page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
  };
}
