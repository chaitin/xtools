import React, { useCallback, useState } from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useMobileView } from "@/hooks";
import DehazeIcon from "@mui/icons-material/Dehaze";
import MenuItem from "./item";
import data from "@/asset/data/data.json";
import { NavMenuProps } from "@/types";
import NavPanel from "./panel";
import MobilPanel from "./mobileView";
import { ApplicationInfo } from "@/types";

const NavMenuComponent = styled("div")(() => ({
  display: "flex",
  gap: "40px",
}));

const menu: NavMenuProps[] = [
  { title: "最新活动", link: "/" },
  { title: "产品", expand: true },
];

const NavMenu: React.FC<{ apps: ApplicationInfo[] }> = ({ apps }) => {
  const isMobile = useMobileView();
  const router = useRouter();
  const [panelContent, setPanelContent] = useState<NavMenuProps[]>();
  const [openMobile, setOpenMobile] = useState<boolean>(false);
  const [openPanel, setOpenPanel] = useState<boolean>(false);

  const handleOpen = useCallback(
    (open: boolean) => () => {
      setOpenMobile(open);
    },
    []
  );

  const handleClickMenu = useCallback(
    (link?: string) => () => {
      if (link) {
        router.push(link);
      }
    },
    [router]
  );

  const handleShowPanel = useCallback(
    (menuContent: NavMenuProps) => () => {
      if (menuContent?.expand) setOpenPanel(true);
    },
    []
  );

  const handleLeavePanel = useCallback(() => {
    setOpenPanel(false);
  }, []);

  return (
    <>
      {isMobile ? (
        <DehazeIcon sx={{ margin: "0 16px" }} onClick={handleOpen(true)} />
      ) : (
        <NavMenuComponent>
          {menu?.map((menuitem, index) => (
            <MenuItem
              key={`nav-menu-${index}`}
              expand={menuitem.expand}
              title={menuitem.title}
              hoverview={"true"}
              // highlight={currentPath === menuitem.link}
              onClick={handleClickMenu(menuitem?.link)}
              onHover={handleShowPanel(menuitem)}
            />
          ))}
        </NavMenuComponent>
      )}
      <NavPanel
        open={openPanel}
        // open={true}
        onClose={handleLeavePanel}
        apps={apps}
      />
      {isMobile && (
        <MobilPanel apps={apps} open={openMobile} onClose={handleOpen(false)} />
      )}
    </>
  );
};

export default NavMenu;
