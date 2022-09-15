import { Box, Stack } from "@mui/material";
import ContentDesktop from "../components/Desktop/ContentDesktop";
import ContentMobile from "../components/Mobile/ContentMobile";
import Sidebar from "../components/Desktop/Sidebar";
import UserDesktop from "../components/Desktop/UserDesktop";
import UserSidebar from "../components/Desktop/UserSidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserRequest } from "../store/reducers/user.reducer";
import UserMobile from "../components/Mobile/UserMobile";
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
    <Stack direction="row" sx={{ height: "100vh" }}>
      <Box sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}>
        {user.roles?.some((a) => a === "admin") ? (
          <>
            <Sidebar />
            <ContentDesktop />
          </>
        ) : (
          <>
            <UserSidebar />
            <UserDesktop />
          </>
        )}
      </Box>

      <Box sx={{ display: { xs: "flex", sm: "none" }, width: "100%" }}>
        {user.roles?.some((a) => a === "admin") ? (
          <ContentMobile />
        ) : (
          <UserMobile />
        )}
      </Box>
    </Stack>
  );
}
}

export default Profile;
