import { Avatar, Divider, Stack, styled } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const CustomTypography = styled(Typography)`
    color: #ffffff;
`;

const HeaderMobile = () => {
    const user = useSelector((state) => state.user);
    if(user.length) {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
        >
            <Avatar
                alt="Usuario"
                src={user.imgUrl}
                sx={{ width: 150, height: 150 }}
            />
            <CustomTypography sx={{ fontSize: "2rem" }}>
                {user.fullname}
            </CustomTypography>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <CustomTypography sx={{ fontSize: "1.2rem" }}>
                        xx
                    </CustomTypography>
                    <CustomTypography sx={{ fontSize: "1.2rem" }}>
                        Apps
                    </CustomTypography>
                </Stack>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ bgcolor: "#ffffff" }}
                />
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <CustomTypography sx={{ fontSize: "1.2rem" }}>
                        {user.devices.length}
                    </CustomTypography>
                    <CustomTypography sx={{ fontSize: "1.2rem" }}>
                        Dispositivos
                    </CustomTypography>
                </Stack>
            </Stack>
        </Stack>
    ) }
    else {return(<></>)}
};

export default HeaderMobile;
