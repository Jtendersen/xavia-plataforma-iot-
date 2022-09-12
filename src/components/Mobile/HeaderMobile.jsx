import { Avatar, Box, Stack } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const HeaderMobile = () => {
  const user = useSelector((state) => state.user);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Avatar
        alt="Usuario"
        src={user.imgUrl}
        sx={{ width: 150, height: 150 }}
      />
      <Typography>{user.fullname}</Typography>
      <Stack direction="row">
        <Box>Apps</Box>
        <Box>Dispositivos activos</Box>
      </Stack>
    </Stack>
  );
};

export default HeaderMobile;
