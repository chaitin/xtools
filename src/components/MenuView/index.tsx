import { defaultTextClick } from "@/constant";
import { usePath } from "@/hooks";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  ListItemText,
  Paper,
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Container, Main, MenuPage, SideMenu } from "./components";

export interface MenuProps {
  children: React.ReactElement;
}

const ifChecked = (currentPath: string, itemPath: string) => {
  return currentPath === itemPath;
};

enum Tags {
  CODE = 'code',
  TEXT = 'text',
  DEV = 'dev',
  PASSWORD = 'password',
  JSON = 'json',
  OTHER = 'other'
}

const routesMenu = [
  // { icon: dot_blue, label: '网络', children: [] },
  {
    label: "URL 编解码",
    tags: [Tags.CODE],
    path: "/urlencoder",
    subTitle: "URL 编码解码小工具。",
  },
  {
    label: "Base64 编解码",
    tags: [Tags.CODE],
    path: "/base64",
    subTitle: "Base64 编码解码小工具。",
  },
  {
    label: "图片转 Base64",
    tags: [Tags.CODE],
    path: "/img2base64",
    subTitle:
      "图片的 BASE64 编码就是将图片数据编码成字符串，使用该字符串代替图片地址，从而不需要使用图片的 URL 地址。",
  },
  {
    label: "进制转换",
    tags: [Tags.CODE],
    path: "/radix_convert",
    subTitle:
      "进制转换小工具，支持二进制、八进制、十进制、十六进制等之间的互相转换。",
  },
  {
    label: "字数统计",
    tags: [Tags.TEXT],
    path: "/word_count",
    subTitle:
      "字数统计小工具，支持中文、英文、数字、标点符号等的统计。",
  },
  {
    label: "大小写转换",
    tags: [Tags.TEXT],
    path: "/case_convert",
    subTitle:
      "大小写转换小工具，支持大写、小写、首字母大写、大小写互转等。",
  },
  {
    label: "Unix 时间戳转换",
    tags: [Tags.DEV],
    path: "/unix",
    subTitle:
      "Unix 时间戳是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数，不考虑闰秒。",
  },
  {
    label: "ASCII 码表",
    tags: [Tags.DEV],
    path: "/ascii",
    subTitle: "ASCII 码查询表。",
  },
  {
    label: "密码哈希",
    tags: [Tags.PASSWORD],
    path: "/hash",
    subTitle: "在线 MD5，SHA256 哈希算法计算小工具。",
  },
  {
    label: "AES 加解密",
    tags: [Tags.PASSWORD],
    path: "/aes",
    subTitle: "在线 AES 算法加解密工具。",
  },
  {
    label: "JSON 转 CSV",
    tags: [Tags.JSON],
    path: "/jsontocsv",
    subTitle: "JSON 转 CSV 和 EXCEL 小工具。",
  },

  {
    label: "随机数/密码生成",
    tags: [Tags.OTHER],
    path: "/random",
    subTitle: "该功能由浏览器在本地完成，您的任何输入都不会提交到服务端。",
  },
  {
    label: "图片去色",
    tags: [Tags.OTHER],
    path: "/uncolor",
    subTitle:
      "将彩色图片转换为黑白图片",
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
    const _item = routesMenu.find((item) => item.path === path);
    if (_item) return _item;
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
            <Paper sx={{ width: '100%', borderRadius: '4px', mb: 1 }} elevation={0}>
              <IconButton sx={{ padding: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                autoFocus
                // value={query}
                // onChange={(event) => setQuery(event.target.value)}
                placeholder="输入关键词搜索工具"
                inputProps={{ 'aria-label': 'search icons' }}
                sx={{ grow: 1, fontSize: '12px' }}
              />
            </Paper>
            <Paper sx={{ width: '100%', borderBottom: '1px solid grey' }} elevation={0}>
            </Paper>
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
              {routesMenu.map((item, index) =>
                <ListItemButton
                  key={index}
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
                </ListItemButton>)}
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
