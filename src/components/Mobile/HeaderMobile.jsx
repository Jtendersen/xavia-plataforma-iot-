import { Avatar, Divider, Stack, styled } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const CustomTypography = styled(Typography)`
    color: #ffffff;
`;

const HeaderMobile = () => {
    const user = useSelector((state) => state.user);
    if(user.email) {
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
                sx={{ width: 100, height: 100, backgroundColor: 'white' }}
            />
            <CustomTypography sx={{ fontSize: "1.5rem" }}>
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
                    <CustomTypography sx={{ fontSize: "0.9rem" }}>
                        xx
                    </CustomTypography>
                    <CustomTypography sx={{ fontSize: "0.9rem" }}>
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
                    <CustomTypography sx={{ fontSize: "0.9rem" }}>
                        {user.devices.length}
                    </CustomTypography>
                    <CustomTypography sx={{ fontSize: "0.9rem" }}>
                        Dispositivos
                    </CustomTypography>
                </Stack>
            </Stack>
        </Stack>
    ) }
    else {return(<></>)}
};

export default HeaderMobile;
