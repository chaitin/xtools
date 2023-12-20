import React from "react";

import { Stack } from "@mui/material";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Link from "next/link";

export const NotFound = () => {
  return (
    <Stack
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Text size="xl">404 NOT FOUND</Text>
      <Button
        type={"text"}
        sx={{
          "& > a": { color: "inherit", textDecoration: "none" },
          marginBottom: "auto",
        }}
      >
        <Link href={"/"}> 返回 </Link>
      </Button>
    </Stack>
  );
};

export default NotFound;
