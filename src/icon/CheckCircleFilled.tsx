import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const CheckCircleFilled = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        fillRule="nonzero"
        d="M12 5c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7Zm3.378 5.845-4.021 4.065-.004.003-.003.004c-.033.032-.072.05-.11.072-.018.01-.033.026-.053.034a.506.506 0 0 1-.377-.001c-.02-.009-.036-.026-.056-.036-.037-.021-.075-.04-.108-.072l-.002-.004-.004-.003-1.978-2.032a.502.502 0 1 1 .72-.7l1.621 1.665 3.661-3.701a.502.502 0 1 1 .714.706Z"
      />
    </SvgIcon>
  );
};
