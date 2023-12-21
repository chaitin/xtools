import { QueryInfo } from './index';

export type CreateOrg = {
  name: string;
  description?: string | undefined;
};

export type Organizationinfo = {
  id: number;
  description: string;
  name: string;
  user_count: number;
  app_count: number;
  order_count: number;
  api_token_count: number;
  unpaid_count: number;
};

export type MemberInfo = {
  id: string | number;
  u_id: string;
  name: string;
  nickname: string;
  roles: { id: number; name: string }[];
  created_at: string;
  last_logined_at: string;
  confirm_state: string;
  description: string;
  mail: string;
  head_img_url?: string;
  subscribe_oa?: boolean;
};

export type GetOrgMembers = {
  id: number;
  query: QueryInfo;
};

export type DeleteOrgMember = {
  id: number; //org id
  query: { id: string };
};

export type InvitationInfo = {
  mail?: string;
  user_id: string;
  role_ids: number[];
};

export type InviteMembers = {
  id: number; // org id
  users: InvitationInfo[];
};

export type RoleType = 'builtin' | 'manual';

export type RoleInfo = {
  id: number;
  name: string;
  desc: string;
  create_user: string;
  update_at: string;
  perms: {
    id: number;
    name: string;
  }[];
  type: RoleType;
};

export type RoleCreateInfo = {
  name: string;
  perms: number[];
};

export type GetRoles = {
  id: number; //org id
  query: QueryInfo;
};

export type DeleteRole = {
  id: number; // org id
  role_ids: number[];
};

export type UpdateUserRole = {
  id: number; // org id
  user_id: number; // user id
  query: Pick<InvitationInfo, 'role_ids'>;
};

export type PermissionInfo = {
  id: number;
  name: string;
  scope: string;
  description: string;
};

export type UpdateRolePermission = {
  id: number; // org id
  role_id: number;
  perms: number[];
};

export type CreateRoles = {
  id: number; // org id
  roles: RoleCreateInfo[];
};

export type APITokenInfo = {
  id: number;
  name: string;
  token: string;
  perms: string[];
  creator_name: string;
  creator_mail: string;
  expired_at: string;
};

export type CrateAPITokenInfo = {
  name: string;
  perms: number[];
  expired_at: string;
};

export type UpdateOrganizationinfo = {
  id: number; //组织id
  info: { name: string; description: string };
};
