import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AddData from "./components/AddData";
import ManageData from "./components/ManageData";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/add" element={<AddData />} />
      <Route path="/manage" element={<ManageData />} />
    </Routes>
     
    </BrowserRouter>
  );
}

export default App;
