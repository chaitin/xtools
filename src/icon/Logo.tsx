import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const Logo = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 66 39.19545">
      <linearGradient
        id="linear-gradient"
        x1="32.99998"
        y1="14.74156"
        x2="32.99998"
        y2="0.08797"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#79be4b" />
        <stop offset="1" stopColor="#40b044" />
      </linearGradient>
      <linearGradient
        id="linear-gradient-2"
        x1="33"
        y1="38.09321"
        x2="33"
        y2="19.35482"
        xlinkHref="#linear-gradient"
      />
      <path
        fill="url(#linear-gradient)"
        d="M43.85153 9.40052S34.40937 7.99544 33.00037.03477c-1.409 7.96067-10.85193 9.36575-10.85193 9.36575A14.55347 14.55347 0 0 1 7.92917 3.99375C12.48451 15.999 20.46438 15.57448 20.46438 15.57448h25.0712s7.97987.42454 12.53521-11.58073A14.55345 14.55345 0 0 1 43.85153 9.40052Z"
      />
      <path
        fill="url(#linear-gradient-2)"
        d="M46.8764 31.26366S34.802 29.467 33.00037 19.28679C31.198 29.467 19.1228 31.26366 19.1228 31.26366 6.87439 33.16887.94061 24.35.94061 24.35 6.76544 39.70134 16.97009 39.15831 16.97009 39.15831H49.02985s10.20465.543 16.02954-14.80835C65.05939 24.35 59.12555 33.16893 46.8764 31.26366Z"
      />
    </SvgIcon>
  );
};
