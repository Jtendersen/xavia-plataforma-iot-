import { Box, Stack } from "@mui/material";
import ContentDesktop from "../components/Desktop/ContentDesktop";
import ContentMobile from "../components/Mobile/ContentMobile";
import Sidebar from "../components/Desktop/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserRequest } from "../store/reducers/user.reducer";
import LoadingScreen from "../commons/LoadingScreen";

function Profile() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserRequest(user._id));
    }, [dispatch, user._id]);

    if (user.state === "loading") {
        <LoadingScreen />;
    } else {
        return (
            <Stack direction="row" >
                <Box
                    sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
                >
                    <Sidebar />
                    <ContentDesktop />
                </Box>
                <Box
                    sx={{ display: { xs: "flex", sm: "none" }, width: "100%" , height: "100vh"}}
                >
                    <ContentMobile />
                </Box>
            </Stack>
        );
    }
}

export default Profile;
