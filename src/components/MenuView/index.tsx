import dot_black from "@/asset/tools/dot_black.png";
import dot_yellow from "@/asset/tools/dot_yellow.png";
import { defaultTextClick } from "@/constant";
import { usePath } from "@/hooks";
import ErrorIcon from "@mui/icons-material/Error";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Box,
  Grid,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Container, Main, MenuPage, SideMenu } from "./components";

export interface MenuProps {
  children: React.ReactElement;
}

const ifChecked = (currentPath: string, itemPath: string) => {
  return currentPath === itemPath;
};
const routesMenu = [
  // { icon: dot_blue, label: '网络', children: [] },
  {
    icon: dot_yellow,
    label: "编码转码",
    children: [
      {
        label: "URL 编解码",
        path: "/urlencoder",
        subTitle: "URL 编码解码小工具。",
      },
      {
        label: "Base64 编解码",
        path: "/base64",
        subTitle: "Base64 编码解码小工具。",
      },
      {
        label: "图片转 Base64",
        path: "/img2base64",
        subTitle:
          "图片的 BASE64 编码就是将图片数据编码成字符串，使用该字符串代替图片地址，从而不需要使用图片的 URL 地址。",
      },
      {
        label: "进制转换",
        path: "/radix_convert",
        subTitle:
          "进制转换小工具，支持二进制、八进制、十进制、十六进制等之间的互相转换。",
      },
    ],
  },
  {
    icon: dot_black,
    label: "文字处理",
    children: [
      {
        label: "字数统计",
        path: "/word_count",
        subTitle:
          "字数统计小工具，支持中文、英文、数字、标点符号等的统计。",
      },
      {
        label: "大小写转换",
        path: "/case_convert",
        subTitle:
          "大小写转换小工具，支持大写、小写、首字母大写、大小写互转等。",
      },
    ],
  },
  {
    icon: dot_black,
    label: "开发",
    children: [
      {
        label: "Unix 时间戳转换",
        path: "/unix",
        subTitle:
          "Unix 时间戳是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数，不考虑闰秒。",
      },
      {
        label: "ASCII 码表",
        path: "/ascii",
        subTitle: "ASCII 码查询表。",
      }
    ]
  },
  {
    icon: dot_black,
    label: "密码学",
    children: [
      {
        label: "密码哈希",
        path: "/hash",
        subTitle: "在线 MD5，SHA256 哈希算法计算小工具。",
      },
      {
        label: "AES 加解密",
        path: "/aes",
        subTitle: "在线 AES 算法加解密工具。",
      }
    ],
  },
  {
    icon: dot_black,
    label: "JSON",
    children: [
      {
        label: "JSON 转 CSV",
        path: "/jsontocsv",
        subTitle: "JSON 转 CSV 和 EXCEL 小工具。",
      },
    ],
  },
  {
    icon: dot_black,
    label: "杂项",
    children: [
      {
        label: "随机数/密码生成",
        path: "/random",
        subTitle: "该功能由浏览器在本地完成，您的任何输入都不会提交到服务端。",
      },
      {
        label: "图片去色",
        path: "/uncolor",
        subTitle:
          "将彩色图片转换为黑白图片",
      },
    ],
  },
];
const MenuView: React.FC<MenuProps> = ({ children }) => {
  const { path } = usePath();
  const [openStaus, setOpenStatus] = React.useState(
    routesMenu.map((item) => true)
  );
  const router = useRouter();
  const handleClick = (index: number) => {
    const _value = [...openStaus];
    _value[index] = !openStaus[index];
    setOpenStatus(_value);
  };
  const toPath = (path: string) => {
    router.push(path);
  };
  const currentItem = useMemo(() => {
    for (const section of routesMenu) {
      const _item = section.children.find((item) => item.path === path);
      if (_item) return _item;
    }
  }, [path]);

  return (
    <>
      <Head>
        <title>
          {currentItem?.label + " - 长亭百川云工具库"}
        </title>
      </Head>
      <MenuPage>
        <SideMenu>
          <Box
            sx={{
              width: "220px",
              maxWidth: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                height: "100%",
                bgcolor: "background.paper",
                borderRadius: "4px",
                overflowY: "scroll",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {routesMenu.map((section, index) => [
                <ListItemButton
                  key={section.label}
                  onClick={() => handleClick(index)}
                >
                  <ListItemIcon sx={{ minWidth: "18px" }}>
                    {openStaus[index] ? (
                      <Image
                        style={{ width: "8px", height: "8px" }}
                        src={section.icon}
                        alt="decorate_icon"
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background: "rgba(0, 0, 0, 0.30)",
                        }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={section.label} />
                  {openStaus[index] ? (
                    <ExpandLess fontSize="small" />
                  ) : (
                    <ExpandMore fontSize="small" />
                  )}
                </ListItemButton>,
                <Collapse
                  key={section.label + "collapse"}
                  in={openStaus[index]}
                  timeout="auto"
                  unmountOnExit
                >
                  {section?.children.map((item) => (
                    <List component="div" disablePadding key={item.label}>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => toPath(item.path)}
                        selected={ifChecked(currentItem?.path || "", item.path)}
                      >
                        <ListItemText
                          primaryTypographyProps={{
                            fontSize: "12px",
                            fontWeight: ifChecked(
                              currentItem?.path || "",
                              item.path
                            )
                              ? "500"
                              : "400",
                          }}
                          primary={item.label}
                        />
                      </ListItemButton>
                    </List>
                  ))}
                </Collapse>,
              ])}
            </List>
          </Box>
        </SideMenu>
        <Main
          sx={{
            pt: 2,
            pl: 0,
            pr: 0,
            pb: 0,
          }}
        >
          <Container sx={{ p: 3 }}>
            <Grid container sx={{ width: "838px", mx: "auto" }} spacing={2}>
              <Grid item xs sm container sx={{ pl: '0 !important' }}>
                <Grid item xs container direction="column" spacing={1}>
                  <Grid item>
                    <Typography
                      sx={{
                        mb: "0px",
                        fontWeight: 600,
                        color: defaultTextClick,
                      }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {currentItem?.label}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs
                    sx={{ pt: "6px!important", alignSelf: "start" }}
                  >
                    {currentItem?.subTitle ? (
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0 12px",
                          lineHeight: "20px",
                          background: "rgba(30,111,255,0.1)",
                          color: "#1E6FFF",
                          flexGrow: 0,
                          borderRadius: "4px",
                          minWidth: "300px",
                        }}
                        gutterBottom
                        variant="caption"
                        component="div"
                      >
                        <ErrorIcon
                          sx={{
                            width: "15px",
                            transform: "rotate(180deg)",
                            mr: "8px",
                            position: "relative",
                          }}
                        />
                        {currentItem?.subTitle}
                      </Typography>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {children}
          </Container>
        </Main>
      </MenuPage>
    </>
  );
};

export default MenuView;
