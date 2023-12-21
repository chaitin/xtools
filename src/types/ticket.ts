export type TicketQueryInfo = {
  page?: number;
  size?: number;
  title?: string;
  state?: string;
};

export type TicketType = '完成' | '等待处理' | '正在处理' | '关闭';

export type TicketInfo = {
  title: string;
  id: number;
  state: TicketType;
  type: string;
  app_name: string;
  created_at: string;
  updated_at: string;
};

export type TicketStatus = {
  title: string;
  actions: { action: string; created_at: string }[];
};

export type DialogType = 'query' | 'reply'; //query 用户，reply 客服

export type DialogInfo = {
  content: string;
  created_at: string;
  creator: number; // creator id
  images: string[];
  type: DialogType;
};

export type DialogReplyInfo = {
  id: number; // dialog id
  content: string;
  type: DialogType;
  images: string[];
};

export type CreateTicket = {
  title: string;
  content: string;
  ticket_type: 1 | 2 | 3; //1:故障；2:建议；3:其他
  app_id: number;
  images: string[];
};
