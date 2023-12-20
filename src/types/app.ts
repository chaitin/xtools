import { SortType } from "./general";

export type QueryInfo = {
  page?: number;
  size?: number;
  role?: string;
  permission?: string;
  nickname?: string;
  mail?: string;
  name?: string;
};

export type GetApplications = {
  org_id: number;
  query?: { order_by_latest?: SortType; order_by_hot?: SortType };
};

export type ApplicationInfo = {
  id: number;
  category: string;
  scope: string;
  purchase_type: string;
  url_prefix: string;
  name: string;
  description: string;
  latest_news: string[];
  screenshots: string[];
  expired_at: string;
  logo_url: string;
  landing_page: string;
  slogan: string;
  labels: string[];
  status: number; //0:下架，1: 已上线 ，2: 未上线
  url?: string;
  cnt?: number;
  modules: AppModuleProps[];
  doc_url: string;
};
export type AppModuleProps = {
  module_id: number;
  temp_id: 1 | 2 | 3 | 4;
  module_name: string;
  urls: string[];
  categories: AppModuleCategoriyProps[];
};

export type AppModuleCategoriyProps = {
  category_id: number;
  category_name: string;
  description: string;
  promotional_urls: string[];
  detail_url: string;
};

export type SubscriptionInfo = {
  id: number; // app id
  org_id: number;
  package_id: number;
};

export type ApplicationShareInfo = {
  app_id: number;
  code?: string;
  app_name: string;
  logo_url: string;
  hit_count: number;
  register_count: number;
  hit_count_history: number;
  register_count_history: number;
  url: string;
  remark: string;
};

export type GenerateShareCodeInfo = {
  app_id: number;
  remark: string;
};
