import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const Check = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        fillRule="nonzero"
        d="m19.32 7.32-.08-.09a.912.912 0 0 0-.6-.23c-.22 0-.43.1-.58.26l-7.59 8.09-4.05-4a.845.845 0 0 0-1.18 0c-.32.33-.32.85 0 1.18l4.66 4.59.02.02c.06.05.11.08.17.11l.09.05a.803.803 0 0 0 .63-.01l.11-.07s.08-.05.13-.09l.1-.05v-.05l8.12-8.62c.15-.16.23-.37.23-.59 0-.18-.07-.35-.18-.49v-.01Z"
      />
    </SvgIcon>
  );
};
