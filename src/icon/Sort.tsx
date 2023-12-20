import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const Sort = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        fillRule="nonzero"
        d="M13.282 19.498a.537.537 0 0 1-.539-.538v-8.076c0-.133.05-.263.14-.361l3.513-3.946h-9.47l3.52 3.948a.543.543 0 0 1 .135.36v4.859l.857.692a.541.541 0 0 1 .081.758.54.54 0 0 1-.758.081l-1.057-.86a.537.537 0 0 1-.2-.42v-4.908L5.322 6.395a.538.538 0 0 1 .402-.897H17.61a.538.538 0 0 1 .4.9L13.82 11.09v7.87c0 .298-.24.538-.538.538Z"
      />
    </SvgIcon>
  );
};
