import { Stack } from "@mui/material";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";


function App() {
    return (
        <Stack direction="row" sx={{height: "100vh"}}>
            <Sidebar />
            <Content />
        </Stack>
    );
}

export default App;
