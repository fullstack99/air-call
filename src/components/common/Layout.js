import React from "react";
import { Stack } from "@mui/material";

import Header from "./Header";

const AppLayout = ({ children, goBack }) => {
  return (
    <Stack
      position={"relative"}
      sx={{
        width: "376px",
        height: "666px",
        background: "#ffffff",
        borderRadius: "3px",
        boxShadow: "0 0 5px 0 rgba(0, 0, 0, .9)",
      }}
    >
      <Header goBack={goBack} />
      <Stack
        flex={1}
        sx={{ width: "100%", typography: "body1", overflowY: "auto" }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default AppLayout;
