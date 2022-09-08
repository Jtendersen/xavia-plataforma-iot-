import { Box, Stack } from "@mui/material";
import ContentDesktop from "../components/Desktop/ContentDesktop";
import ContentMobile from "../components/Mobile/ContentMobile";
import Sidebar from "../components/Desktop/Sidebar";

function Profile() {
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