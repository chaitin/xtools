import React, { useState, useEffect, useCallback, useContext } from "react";
import Image, { StaticImageData } from "next/image";
import { styled } from "@mui/material/styles";
import { NavMenuProps } from "@/types";
import { useRouter } from "next/router";
import { useDebounce } from "@/hooks";
import MenuItem from "./item";
import { Drawer, TextField } from "@mui/material";
import { Side_Margin, grayLight, primary } from "@/styles/colors";
import search_icon from "@/asset/img/search_icon.webp";
import ClearIcon from "@mui/icons-material/Clear";
import { ApplicationInfo } from "@/types";
import { NavPanelProps } from "./panel";

const PanelContent = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: `${parseInt(Side_Margin) / 2}% ${Side_Margin}`,
  justifyContent: "flex-start",
  gap: 20,
}));

const Content = styled("div")(() => ({
  display: "flex",
  gap: 40,
}));

const Header = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
}));

const ContentCol = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "flex-start",
  alignItems: "stretch",
  gap: 20,
}));

export const Icon = ({
  style,
  src,
}: {
  style?: React.CSSProperties;
  src: string | StaticImageData;
}) => {
  return (
    <Image
      src={src}
      alt="search"
      style={{
        objectFit: "contain",
        ...style,
      }}
      loading="lazy"
    />
  );
};

const ContentCard = styled("div")(() => ({
  padding: "12px 24px",
  transition: "background-color 0.2s linear",
  "&:hover": {
    backgroundColor: grayLight,
    transition: "background-color 0.2s linear",
  },
}));

const NavPanel: React.FC<NavPanelProps> = (props) => {
  const { open, onClose, apps } = props;
  const [menuContent, setMenuContent] = useState<ApplicationInfo[]>([]);
  const [input, setInput] = useState<string>("");
  const debounceInput = useDebounce(input, 500);
  const router = useRouter();

  const handleSearch = useCallback(
    (search: string) => {
      if (apps && search.length > 0) {
        const data = JSON.parse(JSON.stringify(apps)) as ApplicationInfo[];
        const searchResult = data?.filter((item) => item.name.includes(search));
        setMenuContent([...searchResult]);
      } else {
        setMenuContent(apps);
      }
    },
    [apps]
  );

  const toWorkbench = useCallback(
    (app: ApplicationInfo) => () => {
      if (app?.scope) {
        router.push(`/landing/${app?.scope}`);
      } else {
        router.push("/workbench");
      }
      onClose?.();
    },
    [onClose, router]
  );

  const handleSetInput = useCallback((event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const input = target?.value?.trim();
    setInput(input ?? "");
  }, []);

  useEffect(() => {
    handleSearch(debounceInput);
  }, [debounceInput, handleSearch]);

  return (
    <Drawer
      PaperProps={{ sx: { boxShadow: "none", width: "100%" } }}
      componentsProps={{
        backdrop: { style: { backgroundColor: "rgba(0,0,0,0.2)" } },
      }}
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <PanelContent>
        <Header>
          <ClearIcon
            sx={{ cursor: "pointer", color: primary }}
            onClick={onClose}
          />
        </Header>
        <TextField
          sx={{ fontSize: "16px" }}
          placeholder="搜索产品名称"
          fullWidth={true}
          onChange={handleSetInput}
          InputProps={{
            style: { fontSize: "16px" },
            startAdornment: (
              <Icon
                src={search_icon}
                style={{ width: "16px", margin: "0 12px" }}
              />
            ),
          }}
        />
        <Content>
          <ContentCol>
            {menuContent?.map((contentItem, index) => (
              <ContentCard key={`nav-content-${index}`}>
                <MenuItem
                  highlight={true}
                  title={contentItem?.name}
                  subTitle={contentItem?.slogan}
                  sx={{ fontSize: 16 }}
                  onClick={toWorkbench(contentItem)}
                />
              </ContentCard>
            ))}
          </ContentCol>
        </Content>
      </PanelContent>
    </Drawer>
  );
};

export default NavPanel;
