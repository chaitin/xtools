import React from "react";
import { SvgIcon } from "@mui/material";

import AccountActive from "@/asset/svgs/account_active.svg";
import AccountHover from "@/asset/svgs/account_hover.svg";
import AccountDefault from "@/asset/svgs/account_default.svg";

import ApiActive from "@/asset/svgs/api_active.svg";
import ApiHover from "@/asset/svgs/api_hover.svg";
import ApiDefault from "@/asset/svgs/api_default.svg";

import InfoActive from "@/asset/svgs/info_active.svg";
import InfoHover from "@/asset/svgs/info_hover.svg";
import InfoDefault from "@/asset/svgs/info_default.svg";

import MemberActive from "@/asset/svgs/member_active.svg";
import MemberHover from "@/asset/svgs/member_hover.svg";
import MemberDefault from "@/asset/svgs/member_default.svg";

import NoticeActive from "@/asset/svgs/notice_active.svg";
import NoticeHover from "@/asset/svgs/notice_hover.svg";
import NoticeDefault from "@/asset/svgs/notice_default.svg";

import OrderActive from "@/asset/svgs/order_active.svg";
import OrderHover from "@/asset/svgs/order_hover.svg";
import OrderDefault from "@/asset/svgs/order_default.svg";

import PermActive from "@/asset/svgs/perm_active.svg";
import PermHover from "@/asset/svgs/perm_hover.svg";
import PermDefault from "@/asset/svgs/perm_default.svg";

import RoleActive from "@/asset/svgs/role_active.svg";
import RoleHover from "@/asset/svgs/role_hover.svg";
import RoleDefault from "@/asset/svgs/role_default.svg";

import TicketActive from "@/asset/svgs/ticket_active.svg";
import TicketHover from "@/asset/svgs/ticket_hover.svg";
import TicketDefault from "@/asset/svgs/ticket_default.svg";

import ShareActive from "@/asset/svgs/share_active.svg";
import ShareHover from "@/asset/svgs/share_hover.svg";
import ShareDefault from "@/asset/svgs/share_default.svg";

const shareSvg: MenuIcon = {
  active: ShareActive,
  hover: ShareHover,
  default: ShareDefault,
};

const accountSvg: MenuIcon = {
  active: AccountActive,
  hover: AccountHover,
  default: AccountDefault,
};
const apiSvg: MenuIcon = {
  active: ApiActive,
  hover: ApiHover,
  default: ApiDefault,
};
const infoSvg: MenuIcon = {
  active: InfoActive,
  hover: InfoHover,
  default: InfoDefault,
};
const memberSvg: MenuIcon = {
  active: MemberActive,
  hover: MemberHover,
  default: MemberDefault,
};
const noticeSvg: MenuIcon = {
  active: NoticeActive,
  hover: NoticeHover,
  default: NoticeDefault,
};
const orderSvg: MenuIcon = {
  active: OrderActive,
  hover: OrderHover,
  default: OrderDefault,
};
const permSvg: MenuIcon = {
  active: PermActive,
  hover: PermHover,
  default: PermDefault,
};
const roleSvg: MenuIcon = {
  active: RoleActive,
  hover: RoleHover,
  default: RoleDefault,
};
const ticketSvg: MenuIcon = {
  active: TicketActive,
  hover: TicketHover,
  default: TicketDefault,
};

export type MenuIconType = "default" | "active" | "hover";
export type MenuIcon = {
  [t in MenuIconType]: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const AccountIcon = ({ type }: { type: MenuIconType }) => {
  return (
    <SvgIcon
      className="menu-icon"
      component={accountSvg[type]}
      inheritViewBox
    />
  );
};

export const ApiIcon = ({ type }: { type: MenuIconType }) => {
  return (
    <SvgIcon className="menu-icon" component={apiSvg[type]} inheritViewBox />
  );
};

export const InfoIcon = ({ type }: { type: MenuIconType }) => {
  return (
    <SvgIcon className="menu-icon" component={infoSvg[type]} inheritViewBox />
  );
};

export const MemberIcon = ({ type }: { type: MenuIconType }) => {
  return (
    <SvgIcon className="menu-icon" component={memberSvg[type]} inheritViewBox />
  );
};

export const NoticeIcon = ({ type }: { type: MenuIconType }) => {
  return (
    <SvgIcon className="menu-icon" component={noticeSvg[type]} inheritViewBox />
  );
};

export const OrderIcon = ({ type }: { type: MenuIconType }) => {
  return (
    <SvgIcon className="menu-icon" component={orderSvg[type]} inheritViewBox />
  );
};

export const PermIcon = ({ type }: { type: MenuIconType }) => {
  return (
    <SvgIcon className="menu-icon" component={permSvg[type]} inheritViewBox />
  );
};

export const RoleIcon = ({ type }: { type: MenuIconType }) => {
  return (
    <SvgIcon className="menu-icon" component={roleSvg[type]} inheritViewBox />
  );
};

export const TicketIcon = ({ type }: { type: MenuIconType }) => {
  return (
    <SvgIcon className="menu-icon" component={ticketSvg[type]} inheritViewBox />
  );
};

export const ShareIcon = ({ type }: { type: MenuIconType }) => {
  return (
    <SvgIcon className="menu-icon" component={shareSvg[type]} inheritViewBox />
  );
};
