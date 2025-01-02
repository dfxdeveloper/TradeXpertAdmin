import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UpdateData from "./components/UpdateData";
import AddData from "./components/AddData";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/add" element={<AddData />} />
      <Route path="/manage" element={<UpdateData />} />
    </Routes>
     
    </BrowserRouter>
  );
}

export default App;
