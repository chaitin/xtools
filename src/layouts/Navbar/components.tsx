import React from "react";
import { styled } from "@mui/material/styles";

export interface BarProps {
  children: React.ReactNode;
  view?: "default" | "login";
  id?: string;
}

const BarBase = styled("div", {
  shouldForwardProp: (prop) => prop !== "view",
})<{ view?: "default" | "login" }>(({ theme, view = "default" }) => ({
  width: "100%",
  position: "fixed",
  top: "0px",
  zIndex: theme.zIndex.drawer + 3,
  // boxShadow: theme.shadows[4],
  backgroundColor: view === "default" ? "rgba(255,255,255,0.6)" : "transparent",
  backdropFilter: "blur(4px)",
  [theme.breakpoints.down("sm")]: {
    zIndex: theme.zIndex.drawer - 1,
  },
}));
const BarContent = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "64px",
  justifyContent: "flex-start",
  margin: `0 28px`,
  marginRight: "0",
  [theme.breakpoints.down("sm")]: { marginLeft: "12px" },
}));

const Bar: React.FC<BarProps> = (props) => {
  const { children, view, id } = props;
  return (
    <BarBase view={view} id={id}>
      <BarContent>{children}</BarContent>
    </BarBase>
  );
};

export default Bar;
