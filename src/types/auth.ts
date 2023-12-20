export type UserLogin = {
  nickname: string;
  password: string;
  mail: string;
  code: number;
};

export type WeChatAuth = {
  code: string;
  state: string;
};

export type WeChatInfo = {
  appId: string;
  redirectUrl: string;
  state: string;
};
