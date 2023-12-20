import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import dashed_arrow from "@/asset/svgs/onboarding_arrow.svg";

export const DashedArrow = (props: SvgIconProps) => {
  return <SvgIcon {...props} component={dashed_arrow} inheritViewBox />;
};
