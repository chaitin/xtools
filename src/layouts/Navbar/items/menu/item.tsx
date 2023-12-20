import React from "react";
import { styled, SxProps } from "@mui/material/styles";
import { primary, defaultText, secondaryText } from "@/styles/colors";
import { ArrowDown } from "@/icon";

export interface MenuItemProps {
  title: string | React.ReactElement;
  subTitle?: string;
  highlight?: string | boolean;
  hoverview?: string | boolean;
  expand?: string | boolean;
  sx?: SxProps;
  icon?: React.ReactElement;
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
}

const MenuItemComponent = styled("div", {
  shouldForwardProp: (prop) => prop !== "hightlight" && prop !== "expand",
})<Pick<MenuItemProps, "highlight" | "expand" | "hoverview">>(
  ({ highlight, hoverview }) => ({
    fontSize: 16,
    fontWeight: "bold",
    color: highlight === "true" ? primary : defaultText,
    lineHeight: "22px",
    ...(hoverview === "true" && {
      transition: "color 0.1s linear",
    }),
    transition: "color 0.1s linear",
    display: "flex",
    alignItems: "center",

    "& > svg": {
      display: "inline-block",
      marginLeft: "8px",
      transformOrigin: "center",
      transition: "transform 0.1s linear",
    },
    "&:hover": {
      ...(hoverview === "true" && {
        color: primary,
        transition: "color 0.1s linear",
      }),
      "& > svg": {
        transform: "rotate(0.5turn)",
        transition: "transform 0.1s linear",
      },
    },
  })
);

const MenuItemContent = styled("div")(() => ({
  fontSize: "inherit",
  color: secondaryText,
}));

const MenuItemWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
}));

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    title,
    subTitle,
    highlight,
    expand,
    sx,
    onClick,
    onHover,
    onLeave,
    hoverview,
    icon,
  } = props;
  return (
    <MenuItemWrapper onClick={onClick}>
      <MenuItemComponent
        hoverview={hoverview}
        sx={sx}
        highlight={highlight?.toString()}
        expand={expand?.toString()}
        onMouseOver={onHover}
        onMouseLeave={onLeave}
      >
        {icon}
        {title}
        {expand && <ArrowDown sx={{ fontSize: 14 }} />}
      </MenuItemComponent>
      {subTitle && <MenuItemContent>{subTitle}</MenuItemContent>}
    </MenuItemWrapper>
  );
};

export default MenuItem;
