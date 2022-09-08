import Login from "./components/Login";
import PassCreate from "./commons/PassCreate";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/passCreate" element={<PassCreate />} />
      {/* <Route path="/profile" element={<Dashboard />} /> */}
    </Routes>
  );
}

export default App;
