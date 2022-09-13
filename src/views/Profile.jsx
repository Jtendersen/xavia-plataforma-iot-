import { Box, Stack } from "@mui/material";
import ContentDesktop from "../components/Desktop/ContentDesktop";
import ContentMobile from "../components/Mobile/ContentMobile";
import Sidebar from "../components/Desktop/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserRequest } from "../store/reducers/user.reducer";

function Profile() {
    const user = useSelector(state=>state.user)
    const dispatch = useDispatch()

    useEffect (() =>{
        dispatch(getUserRequest(user._id))
    },[dispatch])
    return (
        <Stack direction="row" sx={{ height: "100vh" }}>
            <Box sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}>
                <Sidebar />
                <ContentDesktop />
            </Box>
            <Box sx={{ display: { xs: "flex", sm: "none" }, width: "100%" }}>
                <ContentMobile />
            </Box>
        </Stack>
    );
}

export default Profile;