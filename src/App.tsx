import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./features/Home";
import LoginPage from "./features/Login";
import './App.css'

function App()  {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;