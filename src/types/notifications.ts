import { BasicPaginationParams } from './general';
export type NotificationLevel = 'high' | 'medium' | 'low';

export type NotificationType = 'app' | 'platform';

export type NotificationDetail = {
  id: number;
  content_id?: number;
  simple_text: string;
  send_id: number;
  send_name: string;
  tags: { id: number; name: string }[];
  level: NotificationLevel;
  created_at: string;
  read_status: number; // 1未读 2已读 3已删除
  full_text?: string;
  org_name?: string;
  org_id?: number;
  logo_url?: string;
};

export type NotificationsParams = BasicPaginationParams & {
  origin?: NotificationType;
  read_status?: number; // 1未读 2已读 3已删除
  level?: NotificationLevel;
  org_id?: number | string;
  send_id?: number | string;
  is_recently?: boolean;
  keywords?: string;
};

export type NotificationListResponse<T> = {
  total: number;
  count?: number;
  detail: Array<T>;
};

export type WebhookProps = {
  id?: string;
  address: string;
  sign?: string;
};

export type MessageChannelTypes = 'email' | 'dingtalk' | 'lark' | 'wecom';

// 1:邮箱；2:钉钉；3:企业微信；4:飞书
export enum MessageChannelEnum {
  email = 'email',
  dingtalk = 'dingtalk',
  wecom = 'wecom',
  lark = 'lark',
  wechat = 5,
}

export enum MessageLevelsEnum {
  low = '低',
  medium = '中',
  high = '高',
}

export type ForwardingConfigDetails = {
  id?: number;
  type?: ForwardingConfigType;
  desc: string;
  enabled?: 1 | 0; //0:off 1:on
  channels: ForwardingConfigChannelProps[];
  created_at?: string;
  updated_at?: string;
};

export type ForwardingConfigType = 'wechat' | 'normal';

export type ForwardingConfigChannelProps = {
  channel: string;
  addresses: WebhookProps[];
};

export type UnReadNotify = {
  total_number: number;
  app_total_number: number;
  plat_total_number: number;
};

export type SocketMesageType = 'unread' | 'invite' | 'remove';

export type SocketMessage<T extends SocketMesageType> = {
  type: SocketMesageType;
  content: SocketMessageContent<T>;
};

export type SocketMessageContent<T extends SocketMesageType> =
  T extends 'unread'
    ? UnReadNotify
    : NotificationDetail & { sender_id: number };

export type SocketMessageData = UnReadNotify & { connected: boolean };
