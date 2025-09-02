import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./features/Home";
import LoginPage from "./features/Login";
import { ThemeToggle } from "./shared/components";
import './App.css'

function App()  {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header con toggle de tema */}
      <header className="border-b p-4" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Inventory System</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto p-4">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;