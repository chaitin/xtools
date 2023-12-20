import type { SxProps } from "@mui/material/styles";

export type ListResponse<T> = {
  total: number;
  count?: number;
  data: Array<T>;
};

export type AppListResponse<T> = {
  total: number;
  apps: Array<T>;
};

export type OrderListResponse<T> = {
  total_page: number;
  total: number;
  detail: Array<T>;
};

export type SortType = "asc" | "desc";

export type BasicPaginationParams = {
  page: number;
  size: number;
};

export type BaseComponentProps = {
  children: React.ReactNode;
  sx?: SxProps;
  id?: string;
};
