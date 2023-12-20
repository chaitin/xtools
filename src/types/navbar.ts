export interface NavMenuProps {
  title: string;
  subTitle?: string;
  expand?: boolean;
  link?: string;
  items?: NavMenuProps[];
}

export type ButtonActions = "hover" | "click";

export interface ButtonProps {
  text: string;
  link?: string;
  action?: ButtonActions;
  color?: string;
  hoverColor?: string;
  clickColor?: string
}

export interface BannerDataProps {
  title: string;
  subTitle?: string;
  buttons?: ButtonProps[];
  bannerUrl?: string;
  link?: string;
  promotionTitleIcon?: string;
}

export interface KeywordDataProps {
  title: string;
  subTitle: string;
  link?: string;
}

export interface ProductItemProps {
  title: string;
  subTitle: string;
  description?: string;
  keywords?: string;
  buttons?: ButtonProps[];
}

export interface ProductsDataProps {
  title: string;
  subTitle?: string;
  items?: ProductItemProps[];
}

export interface OpenApiDataItemProps extends KeywordDataProps {
  button: ButtonProps;
}

export interface OpenApiDataProps {
  title: string;
  subTitle?: string;
  items?: OpenApiDataItemProps[];
}

export interface FooterDataProps {
  title: string;
  buttons?: ButtonProps[];
  items?: Partial<OpenApiDataItemProps>[];
}
