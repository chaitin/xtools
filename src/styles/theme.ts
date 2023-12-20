import { createTheme } from "@mui/material/styles";
import {
  primary,
  primaryHover,
  gray,
  grayText2,
  errorText,
  leastText,
} from "./colors";
import Mono from '@/asset/font/Mono.ttf'

const Din = "https://heap-web.oss-cn-hangzhou.aliyuncs.com/fonts/Din.woff2";
const Gilroy =
  "https://heap-web.oss-cn-hangzhou.aliyuncs.com/fonts/Gilroy.woff2";

const Alibaba_PuHuiTi_35_Thin =
  "https://heap-web.oss-cn-hangzhou.aliyuncs.com/fonts/Alibaba_PuHuiTi_2.0_35_Thin_35_Thin.woff2";
const Alibaba_PuHuiTi_55_Regular =
  "https://heap-web.oss-cn-hangzhou.aliyuncs.com/fonts/Alibaba_PuHuiTi_2.0_55_Regular_55_Regular.woff2";
const Alibaba_PuHuiTi_75_SemiBold =
  "https://heap-web.oss-cn-hangzhou.aliyuncs.com/fonts/Alibaba_PuHuiTi_2.0_75_SemiBold_75_SemiBold.woff2";

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: primaryHover,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family:"Gilroy";
        font-weight:normal;
        src: url(${Gilroy}) format("woff2");
        font-display: swap;
      }
      @font-face {
        font-family:"DIN";
        font-weight:600;
        src: url(${Din}) format("woff2");
        font-display: swap;
      }
      @font-face {
          font-family: "AlibabaPuHuiTiRegular";
          font-weight: 400;
          src: url(${Alibaba_PuHuiTi_55_Regular}) format("woff2"), local("PingFang SC");
          font-display: swap;
      }
      @font-face {
          font-family: "AlibabaPuHuiTiBold";
          font-weight: 600;
          src: url(${Alibaba_PuHuiTi_75_SemiBold}) format("woff2"), local("PingFang SC");
          font-display: swap;
      }
      @font-face {
          font-family: "AlibabaPuHuiTiThin";
          font-weight: 250;
          src: url(${Alibaba_PuHuiTi_35_Thin}) format("woff2"), local("PingFang SC");
          font-display: swap;
      }
      @font-face {
          font-family: "Mono";
          font-weight: 250;
          src: url(${Mono}) format("truetype");
          font-display: swap;
      }
      * {
          box-sizing: border-box;
          margin: 0px;
          padding: 0px;
          font-family: "PingFang SC";
      }
      ::-webkit-scrollbar {
        width: 4px;
        height:4px;
        border-radius: 4px;
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: #bfbfbf;
      }
      ::placeholder {
        color:${leastText};
        fontSize:14px;
        font-family: "PingFang SC";
      }
      body, html, #root {
        width: 100%;
        height: 100%;
        font-size: 16px;
        overflow: hidden;
        font-family: DIN, "PingFang SC";
      }
      .impowerBox .qrcode {
        width: 180px !important;
      }
      .impowerBox .title {
        display: none !important;
      }
      .error:{
        color:"#ccc
      }
      `,
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: primary,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "standard",
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          // "&::after": {
          //   borderBottomColor: primary,
          // },
          fontSize: "0.875rem",
          "&::before": {
            borderBottomColor: gray,
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: `2px solid ${gray}`,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: "#F5F6F7FF",
          "&::before": {
            borderBottom: "none",
          },
          "&::after": {
            borderBottom: "none",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: `none`,
          },
        },
        input: {
          padding: "8px 12px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "AlibabaPuHuiTiRegular",
          color: grayText2,
          "&.Mui-focused": {
            color: grayText2,
          },
        },
        asterisk: {
          color: errorText,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: "AlibabaPuHuiTiRegular",
          color: grayText2,
          "&.Mui-focused": {
            color: grayText2,
          },
        },
        asterisk: {
          color: errorText,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "AlibabaPuHuiTiBold",
          borderRadius: 0,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          color: "#fff",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          color: primary,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: `linear-gradient(180deg, rgba(215,255,208,0.5) 0%, rgba(255,255,255,1) 10%)`,
          boxShadow: "0px 8px 10px 0px rgba(4,27,15,0.06)",
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "#DADCE0",
        },
        text: {
          fill: "#fff",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#D9D9D9FF",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "3px",
          padding: "0px 16px",
          border: "1px solid #d1e1ff",
          backgroundColor: "#f8faff",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.75)",
        },
      },
    },
  },
});

export default theme;
