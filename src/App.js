import Login from "./components/Login";
import PassCreate from "./commons/PassCreate";
import { Route, Routes } from "react-router-dom";
import Profile from "./views/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/passCreate" element={<PassCreate />} />
      <Route path="/profile" element={<Profile />} /> 
    </Routes>
  );

}

export default App;
