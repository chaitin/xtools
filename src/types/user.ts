export type UserInfo = {
  id: number;
  nickname: string;
  password: string;
  mail: string;
  passport: string;
  created_at: string;
  updated_at: string;
  wechat_nickname: string;
  head_img_url: string;
  is_partner: boolean;
  is_certified: number; // 1：已认证， 2:认证中，3:未认证
  phone_number: string;
  org_id: number;
};

export type UpdateUserInfo = {
  mail?: string;
  old_password?: string;
  new_password?: string;
  confirm_password?: string;
};

export type UserVerification = {
  cert_type: IdentificationType | '';
  cert_no: string;
  cert_name: string;
};

export type UserVerificationInfo = UserVerification & {
  create_at: string;
  certify_status: number; // 1：已认证， 2:认证中，3:未认证
};

export enum IdentificationType {
  'IDENTITY_CARD' = '中华人民共和国居民身份证',
  'HOME_VISIT_PERMIT_HK_MC' = '港澳通行证',
  'HOME_VISIT_PERMIT_TAIWAN' = '台湾通行证',
  'RESIDENCE_PERMIT_HK_MC' = '港澳居住证',
  'RESIDENCE_PERMIT_TAIWAN' = '台湾居住证',
}
