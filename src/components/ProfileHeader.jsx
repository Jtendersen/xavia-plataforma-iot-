import { Avatar, Divider, Stack, styled } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const CustomTypography = styled(Typography)`
    color: "black";
`;

const ProfileHeader = () => {
    const user = useSelector((state) => state.user);
    if (user.email) {
   
        return (
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                maxHeight={120}
                spacing={3}
                marginBottom={3}
                marginTop={2}
            >
                <Avatar
                    alt="Usuario"
                    src={user.imgUrl}
                    sx={{ width: 100, height: 100, border: "solid 1px" }}
                />
                <Stack direction="column">
                    <CustomTypography sx={{ fontSize: "1.5rem" }}>
                        {user.empresa}
                    </CustomTypography>
                    <CustomTypography sx={{ fontSize: "1rem" }}>
                        {user.fullname}
                    </CustomTypography>
                    <CustomTypography sx={{ fontSize: "1rem" }}>
                        {user.email}
                    </CustomTypography>
                </Stack>

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                   
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ bgcolor: "black" }}
                    />
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <CustomTypography sx={{ fontSize: "0.9rem" }}>
                            {user.devices?.length}
                        </CustomTypography>
                        <CustomTypography sx={{ fontSize: "0.9rem" }}>
                            Dispositivos
                        </CustomTypography>
                    </Stack>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ bgcolor: "black" }}
                    />
                    
                </Stack>
            </Stack>
        );
    } else {
        return <></>;
    }
};

export default ProfileHeader;
