import { BasicPaginationParams } from "./index";
export type OrderDetails = {
  order_code: string;
  app_name: string;
  logo_url?: string;
  total_amount: number;
  real_amount: number;
  discount_amount: number;
  goods_detail: string;
  expire_time: string;
  expire_time_seconds: number;
  gmt_create: string;
  status: number; // 1:未支付；2:已支付；3:已退款；4:已取消 5:超时关闭
  pay_type: number; // 1:支付宝
  creator: number;
  creator_name: string;
  orgId: number;
  url?: string; //付款地址
  created_at: string;
  updated_at: string;
  deleted_at: string;
  redeem_code: string;
};

export enum PayTypeEnum {
  default = 0,
  alipay = 1,
  wechat = 2,
  voucher = 3,
}

export enum PaymentStatusEnum {
  unpaid = 1,
  paid = 2,
  refunded = 3,
  canceled = 4,
  expaired = 5,
}

export type OrderGoodsDetail = {
  package_name: string;
  duration: number;
  purchase_duration_unit: "D" | "M" | "Y";
  items: { name: string; value: string }[];
};

export type GetOrderParams = BasicPaginationParams & {
  order_code?: string;
  status?: number;
  org_id: number;
};
