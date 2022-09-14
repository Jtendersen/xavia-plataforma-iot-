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
            spacing={1}
            maxHeight="30vh"
        >
            <Avatar
                alt="Usuario"
                src={user.imgUrl}
                sx={{ width: 70, height: 70, backgroundColor: 'white' }}
            />
            <CustomTypography sx={{ fontSize: "1rem" }}>
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
                    <CustomTypography sx={{ fontSize: "0.7rem" }}>
                        xx
                    </CustomTypography>
                    <CustomTypography sx={{ fontSize: "0.7rem" }}>
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
                    <CustomTypography sx={{ fontSize: "0.7rem" }}>
                        {user.devices?.length}
                    </CustomTypography>
                    <CustomTypography sx={{ fontSize: "0.7rem" }}>
                        Dispositivos
                    </CustomTypography>
                </Stack>
            </Stack>
        </Stack>
    ) }
    else {return(<></>)}
};

export default HeaderMobile;
